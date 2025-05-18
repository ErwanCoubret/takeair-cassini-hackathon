import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import getpass
import matplotlib.pyplot as plt
from masks_S5 import masks
from masks_S2 import masks_S2
from masks_S3 import masks_S3
from sentinelhub import SentinelHubRequest, DataCollection, MimeType, CRS, BBox, SHConfig, Geometry

from sentinelhub import (
    SHConfig,
    DataCollection,
    SentinelHubCatalog,
    SentinelHubRequest,
    SentinelHubStatistical,
    BBox,
    bbox_to_dimensions,
    CRS,
    MimeType,
    Geometry,
)
import os
import numpy as np

from shapely.geometry import box
from pyproj import Transformer
from skimage.transform import resize

variables = [
    'TEMPERATURE',# Temperature (SENTINEL-3)
    'NDVI',       # Vegetation Index (SENTINEL-2)
    'CO',         # Carbon Monoxide (SENTINEL-5P)
    'HCHO',       # Formaldehyde (SENTINEL-5P)
    'NO2',        # Nitrogen Dioxide (SENTINEL-5P)
    'O3',         # Ozone (SENTINEL-5P)
    'SO2',        # Sulfur Dioxide (SENTINEL-5P)
    'CH4',        # Methane (SENTINEL-5P)
    'AER_AI'      # Aerosol Index (SENTINEL-5P)
]

DEFAULT_VALUES = {
    "NO2": 2e-5,
    "AER_AI": 0.0,
    "O3": 0.1,
    "CO": 0.01,
    "SO2": 1e-5,
    "HCHO": 2e-4,
    "CH4": 1800.0,
    "NDVI": 0.5,
    "TEMPERATURE": 293.15
}

def request_S2(bbox, mask, config, resolution=(1481, 1538)):
    request = SentinelHubRequest(
        evalscript=mask,
        input_data=[
            SentinelHubRequest.input_data(
                data_collection=DataCollection.SENTINEL2_L2A.define_from(name='s2l2a', service_url='https://sh.dataspace.copernicus.eu'),          
                time_interval=('2025-04-17', '2025-05-17'),          
            ),
        ],
        responses=[
            SentinelHubRequest.output_response('default', MimeType.JPG),
        ],
        bbox=bbox,
        size=resolution,
        config=config
    )
    response = request.get_data()
    return response[0]


def request_SENTINEL3_SLSTR(bbox, mask, config, resolution):
    request = SentinelHubRequest(
        evalscript=mask,
        input_data=[
            SentinelHubRequest.input_data(
                data_collection=DataCollection.SENTINEL3_SLSTR.define_from(name='s3slstr', service_url='https://sh.dataspace.copernicus.eu'),
                time_interval=("2023-05-16", "2025-05-16"),
            ),
        ],
        responses=[
            SentinelHubRequest.output_response('default', MimeType.JPG),
        ],
        bbox=bbox,
        size=resolution,
        config=config
    )
    response = request.get_data()
    return response[0]

def request_S5P(bbox_par, mask, config, resolution):
    data_5p = DataCollection.SENTINEL5P.define_from("s5p", service_url=config.sh_base_url)

    request_raw = SentinelHubRequest(
        evalscript=mask,
        input_data=[
            SentinelHubRequest.input_data(
                data_collection=data_5p,
                time_interval=("2025-03-16", "2025-05-16"),
            )
        ],
        responses=[SentinelHubRequest.output_response("index", MimeType.TIFF)],
        bbox=bbox_par,
        # Resolution is defined in units of the bbox crs! Be careful with WGS84 since this will be in degrees!
        # Since we have defined our bounding box in Web mercator the resolution is in meters.
        resolution=resolution,
        config=config,
        data_folder="./",  # We save the data in a specified folder
    )
    response = request_raw.get_data()
    return response[0]

def create_bbox(coords, transform_to_3857=True):
    bbox = BBox(bbox=coords, crs=CRS.WGS84)
    if transform_to_3857:
        return bbox.transform(CRS(3857))
    return bbox

def calculate_masks(person_coordinates, radius_kilometers, resolution=300):
    lon, lat = person_coordinates
    transformer = Transformer.from_crs("EPSG:4326", "EPSG:3857", always_xy=True)
    x_center, y_center = transformer.transform(lon, lat)

    x_min = x_center - radius_kilometers * 1000
    x_max = x_center + radius_kilometers * 1000
    y_min = y_center - radius_kilometers * 1000
    y_max = y_center + radius_kilometers * 1000

    bbox_3857 = BBox(bbox=[x_min, y_min, x_max, y_max], crs=CRS.POP_WEB)

    data = {}
    coords = []

    for mask_name, mask_script in masks.items():
        if mask_name == "UV":
            continue
        if mask_name not in variables:
            continue
        print(f"Requesting mask: {mask_name}")
        response = request_S5P(
            bbox_par=bbox_3857,
            mask=mask_script,
            resolution=bbox_to_dimensions(bbox_3857, resolution)
        )
        # response is a 2D array, store it in the dict
        data[mask_name] = response
        print(f"Response shape for {mask_name}: {response.shape}")
        # Save coordinates only once
        if not coords:
            # Generate grid of coordinates for each pixel
            x_vals = np.linspace(x_min, x_max, response.shape[1])
            y_vals = np.linspace(y_max, y_min, response.shape[0])  # y decreases from top to bottom
            coords = [(x, y) for y in y_vals for x in x_vals]

    # Flatten each mask's 2D array to 1D for DataFrame columns
    df_dict = {}
    for mask_name, arr in data.items():
        df_dict[mask_name] = arr.flatten()
    df = pd.DataFrame(df_dict)
    df['x'] = [c[0] for c in coords]
    df['y'] = [c[1] for c in coords]
    df = df[['x', 'y'] + [k for k in data.keys()]]  # order columns

    return bbox_3857, df

def complete_df(df):
    # Complete the NaN values in columns using a gradient or default value
    for var in variables:
        if var not in df.columns:
            print(f"{var} missing, filling with default: {DEFAULT_VALUES[var]}")
            df[var] = DEFAULT_VALUES[var]
        else:
            if df[var].isnull().any():
                not_nan = df[var].dropna()
                if not_nan.empty:
                    df[var] = DEFAULT_VALUES[var]
                else:
                    min_val, max_val = not_nan.min(), not_nan.max()
                    # If all values are the same, fill with that value
                    if min_val == max_val:
                        df[var] = df[var].fillna(min_val)
                    else:
                        # Create a gradient for NaNs
                        nan_idx = df[var][df[var].isnull()].index
                        gradient = np.linspace(min_val, max_val, len(nan_idx))
                        df.loc[nan_idx, var] = gradient
    return df

# Seuils "typique maximum" (approximés) pour normalisation
THRESHOLDS = {
    "NO2": 0.0001,         # mol/m²
    "AER_AI": 5.0,         # unitless
    "O3": 0.36,            # mol/m²
    "CO": 0.1,             # mol/m²
    "SO2": 0.01,           # mol/m²
    "HCHO": 0.001,         # mol/m²
    "CH4": 2000.0          # ppb or scaled mol
}

# Poids selon dangerosité
WEIGHTS = {
    "NO2": 0.25,
    "AER_AI": 0.25,
    "O3": 0.20,
    "CO": 0.10,
    "SO2": 0.10,
    "HCHO": 0.05,
    "CH4": 0.05
}

def calculate_risk_score_from_df(df, selected_keys=None, custom_weights=None):
    """
    Calcule une colonne AQI proxy normalisée et pondérée à partir d'un DataFrame.
    
    Args:
        df (pd.DataFrame): DataFrame contenant les colonnes des polluants.
        selected_keys (list): liste des polluants à utiliser.
    
    Returns:
        np.array: colonne AQI proxy
    """
    if selected_keys is None:
        selected_keys = ["NO2", "AER_AI", "O3", "CO", "SO2", "HCHO", "CH4"]

    aqi_proxy = np.zeros(df.shape[0], dtype=np.float32)
    for key in selected_keys:
        if key not in df.columns:
            continue
        threshold = THRESHOLDS.get(key)
        weight = WEIGHTS.get(key)
        if threshold is None or weight is None:
            continue
        normalized = np.clip(df[key].astype(np.float32) / threshold, 0, 1)
        weighted = normalized * weight
        aqi_proxy += weighted
    return aqi_proxy

def plot_variable_grid(df, variable, cmap='RdYlGn_r', save_raw=False, save_path=None):
    import matplotlib.pyplot as plt

    if variable not in df.columns:
        raise ValueError(f"Variable '{variable}' not found in DataFrame columns.")

    nx = len(np.unique(df['x']))
    ny = len(np.unique(df['y']))
    grid = df[variable].values.reshape((ny, nx))

    if save_raw:
        # Create figure with no decorations for raw image saving
        fig = plt.figure(figsize=(8, 6), frameon=False)
        ax = plt.Axes(fig, [0., 0., 1., 1.])
        ax.set_axis_off()
        fig.add_axes(ax)
        im = ax.imshow(grid, origin='upper', cmap=cmap)
        if save_path:
            plt.savefig(save_path, bbox_inches='tight', pad_inches=0)
        plt.close(fig)
    
    # Create regular plot with decorations
    plt.figure(figsize=(8, 6))
    plt.imshow(grid, origin='upper', cmap=cmap)
    plt.colorbar(label=variable)
    plt.title(f'{variable} (Image Representation)')
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.show()

def plot_air_quality_grid(df, variable='Air_Quality', cmap='RdYlGn_r', save_raw=False, save_path=None):
    import matplotlib.pyplot as plt

    if variable not in df.columns:
        raise ValueError(f"Variable '{variable}' not found in DataFrame columns.")

    nx = len(np.unique(df['x']))
    ny = len(np.unique(df['y']))
    grid = df[variable].values.reshape((ny, nx))

    if save_raw:
        # Create figure with no decorations for raw image saving
        fig = plt.figure(figsize=(8, 6), frameon=False)
        ax = plt.Axes(fig, [0., 0., 1., 1.])
        ax.set_axis_off()
        fig.add_axes(ax)
        im = ax.imshow(grid, origin='upper', cmap=cmap, vmin=0, vmax=0.7)
        if save_path:
            plt.savefig(save_path, bbox_inches='tight', pad_inches=0)
        plt.close(fig)
    
    # Create regular plot with decorations
    plt.figure(figsize=(8, 6))
    plt.imshow(grid, origin='upper', cmap=cmap, vmin=0, vmax=0.7)
    plt.colorbar(label=variable)
    plt.title(f'{variable} (Image Representation)')
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.show()

def calculate_custom_risk_score(df, custom_weights=None, custom_metrics=None):
    if custom_weights is None:
        df["ForYou"] = df["Air_Quality"]
    else:
        aqi_custom = custom_weights[0] * df[custom_metrics[0]] + custom_weights[1] * df[custom_metrics[1]] + custom_weights[2] * df[custom_metrics[2]] + custom_weights[3] * df[custom_metrics[3]]
        df["ForYou"] = aqi_custom
    return df
