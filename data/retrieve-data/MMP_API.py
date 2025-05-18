from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import numpy as np
import io
import base64
import matplotlib.pyplot as plt
import os
from utils import *
from typing import List, Optional
import matplotlib
matplotlib.use('Agg')

app = FastAPI()

class RequestPayload(BaseModel):
    longitude: float
    latitude: float
    range_km: float
    custom_weights: Optional[List[float]] = None
    features: Optional[List[str]] = None

def image_to_base64(img_array, cmap='RdYlGn_r'):
    plt.figure(figsize=(8, 6), frameon=False)
    plt.axis('off')
    plt.imshow(img_array, origin='upper', cmap=cmap)
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', pad_inches=0)
    plt.close()
    buf.seek(0)
    return base64.b64encode(buf.read()).decode('utf-8')

@app.post("/get_raw_images")
def get_raw_images(payload: RequestPayload):
    center_coordinates = [payload.longitude, payload.latitude]
    bbox, df = calculate_masks(center_coordinates, payload.range_km, resolution=300)
    df = complete_df(df)
    df = calculate_custom_risk_score(df, custom_weights=payload.custom_weights)

    to_return = {}
    features = payload.features if payload.features else df.columns

    nx = len(np.unique(df['x']))
    ny = len(np.unique(df['y']))

    for feature in features:
        if feature not in df.columns:
            continue
        arr = df[feature].values.reshape((ny, nx))
        to_return[feature] = image_to_base64(arr)
    return JSONResponse(content=to_return)
