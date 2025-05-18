AER_AI='''
//VERSION=3
var minVal = -1.0;
var maxVal = 5.0;

function setup() {
  return {
    input: ["AER_AI_340_380", "dataMask"],
    output: [
      {
        id: "default",
      	bands: 4,
      },
      {
        id: "index",
        bands: 1,
        sampleType: "FLOAT32" 
      },
      {
        id: "eobrowserStats",
        bands: 1,
      },
      {
        id: "dataMask",
        bands: 1
      },
    ],
  };
}

var viz = ColorRampVisualizer.createBlueRed(minVal, maxVal);

function evaluatePixel(samples) {
  const [r, g, b] = viz.process(samples.AER_AI_340_380);
  
  const statsVal = isFinite(samples.AER_AI_340_380) ? samples.AER_AI_340_380 : NaN;
  return {
    default: [r, g, b, samples.dataMask],
    index: [samples.AER_AI_340_380],
    eobrowserStats: [statsVal],
    dataMask: [samples.dataMask],
  };
}
'''

METHANE='''
//VERSION=3
var minVal = 1600.0;
var maxVal = 2000.0;

function setup() {
  return {
    input: ["CH4", "dataMask"],
    output: [
      {
        id: "default",
          bands: 4,
      },
      {
        id: "index",
        bands: 1,
        sampleType: "FLOAT32" 
      },
      {
        id: "eobrowserStats",
        bands: 1,
      },
      {
        id: "dataMask",
        bands: 1
      },
    ],
  };
}

var viz = ColorRampVisualizer.createBlueRed(minVal, maxVal);

function evaluatePixel(samples) {
  const [r, g, b] = viz.process(samples.CH4);
  
  const statsVal = isFinite(samples.CH4) ? samples.CH4 : NaN;
  return {
    default: [r, g, b, samples.dataMask],
    index: [samples.CH4],
    eobrowserStats: [statsVal],
    dataMask: [samples.dataMask],
  };
}
'''

CLOUD_HEIGHT='''
//VERSION=3
var minVal = 0.0;
var maxVal = 20000.0;

function setup() {
  return {
    input: ["CLOUD_BASE_HEIGHT", "dataMask"],
    output: [
      {
        id: "default",
      	bands: 4,
      },
      {
        id: "index",
        bands: 1,
        sampleType: "FLOAT32" 
      },
      {
        id: "eobrowserStats",
        bands: 1,
      },
      {
        id: "dataMask",
        bands: 1
      },
    ],
  };
}

var viz = ColorRampVisualizer.createBlueRed(minVal, maxVal);

function evaluatePixel(samples) {
  let [r, g, b] = viz.process(samples.CLOUD_BASE_HEIGHT);

  const statsVal = isFinite(samples.CLOUD_BASE_HEIGHT) ? samples.CLOUD_BASE_HEIGHT : NaN;
  return {
    default: [r, g, b, samples.dataMask],
    index: [samples.CLOUD_BASE_HEIGHT],
    eobrowserStats: [statsVal],
    dataMask: [samples.dataMask],
  };
}
'''

CLOUD_PRESSURE='''
//VERSION=3
var minVal = 10000.0;
var maxVal = 110000.0;

function setup() {
  return {
    input: ["CLOUD_BASE_PRESSURE", "dataMask"],
    output: [
      {
        id: "default",
      	bands: 4,
      },
      {
        id: "index",
        bands: 1,
        sampleType: "FLOAT32" 
      },
      {
        id: "eobrowserStats",
        bands: 1,
      },
      {
        id: "dataMask",
        bands: 1
      },
    ],
  };
}

var viz = ColorRampVisualizer.createBlueRed(minVal, maxVal);

function evaluatePixel(samples) {
  const [r, g, b] = viz.process(samples.CLOUD_BASE_PRESSURE);
  
  const statsVal = isFinite(samples.CLOUD_BASE_PRESSURE) ? samples.CLOUD_BASE_PRESSURE : NaN;
  return {
    default: [r, g, b, samples.dataMask],
    index: [samples.CLOUD_BASE_PRESSURE],
    eobrowserStats: [statsVal],
    dataMask: [samples.dataMask],
  };
}
'''

CLOUD_EFFECTIVE_RADIOMETRIC_FRACTION='''
//VERSION=3
var minVal = 0.0;
var maxVal = 1.0;

function setup() {
  return {
    input: ["CLOUD_FRACTION", "dataMask"],
    output: [
      {
        id: "default",
      	bands: 4,
      },
      {
        id: "index",
        bands: 1,
        sampleType: "FLOAT32" 
      },
      {
        id: "eobrowserStats",
        bands: 1,
      },
      {
        id: "dataMask",
        bands: 1
      },
    ],
  };
}

var viz = ColorRampVisualizer.createBlueRed(minVal, maxVal);

function evaluatePixel(samples) {
  const [r, g, b] = viz.process(samples.CLOUD_FRACTION);
  
  const statsVal = isFinite(samples.CLOUD_FRACTION) ? samples.CLOUD_FRACTION : NaN;
  return {
    default: [r, g, b, samples.dataMask],
    index: [samples.CLOUD_FRACTION],
    eobrowserStats: [statsVal],
    dataMask: [samples.dataMask],
  };
}
'''

CLOUD_OPTICAL_THICKNESS= '''
//VERSION=3
const band = "CLOUD_OPTICAL_THICKNESS";
var minVal = 0.0;
var maxVal = 250.0;

function setup() {
  return {
    input: ["CLOUD_OPTICAL_THICKNESS", "dataMask"],
    output: [
      {
        id: "default",
      	bands: 4,
      },
      {
        id: "index",
        bands: 1,
        sampleType: "FLOAT32" 
      },
      {
        id: "eobrowserStats",
        bands: 1,
      },
      {
        id: "dataMask",
        bands: 1
      },
    ],
  };
}

var viz = ColorRampVisualizer.createBlueRed(minVal, maxVal);

function evaluatePixel(samples) {
  const [r, g, b] = viz.process(samples.CLOUD_OPTICAL_THICKNESS);
  
  const statsVal = isFinite(samples.CLOUD_OPTICAL_THICKNESS) ? samples.CLOUD_OPTICAL_THICKNESS : NaN;
  return {
    default: [r, g, b, samples.dataMask],
    index: [samples.CLOUD_OPTICAL_THICKNESS],
    eobrowserStats: [statsVal],
    dataMask: [samples.dataMask],
  };
}
'''

CARBON_MONOXIDE='''
//VERSION=3
var minVal = 0.0;
var maxVal = 0.1;

function setup() {
  return {
    input: ["CO", "dataMask"],
    output: [
      {
        id: "default",
      	bands: 4,
      },
      {
        id: "index",
        bands: 1,
        sampleType: "FLOAT32" 
      },
      {
        id: "eobrowserStats",
        bands: 1,
      },
      {
        id: "dataMask",
        bands: 1
      },
    ],
  };
}

var viz = ColorRampVisualizer.createBlueRed(minVal, maxVal);

function evaluatePixel(samples) {
  const [r, g, b] = viz.process(samples.CO);
  
  const statsVal = isFinite(samples.CO) ? samples.CO : NaN;
  return {
    default: [r, g, b, samples.dataMask],
    index: [samples.CO],
    eobrowserStats: [statsVal],
    dataMask: [samples.dataMask],
  };
}
'''

HCHO='''
//VERSION=3
var minVal = 0.0;
var maxVal = 0.001;

function setup() {
  return {
    input: ["HCHO", "dataMask"],
    output: [
      {
        id: "default",
      	bands: 4,
      },
      {
        id: "index",
        bands: 1,
        sampleType: "FLOAT32" 
      },
      {
        id: "eobrowserStats",
        bands: 1,
      },
      {
        id: "dataMask",
        bands: 1
      },
    ],
  };
}

var viz = ColorRampVisualizer.createBlueRed(minVal, maxVal);

function evaluatePixel(samples) {
  const [r, g, b] = viz.process(samples.HCHO);
  
  const statsVal = isFinite(samples.HCHO) ? samples.HCHO : NaN;
  return {
    default: [r, g, b, samples.dataMask],
    index: [samples.HCHO],
    eobrowserStats: [statsVal],
    dataMask: [samples.dataMask],
  };
}
'''

NO2='''
//VERSION=3
var minVal = 0.0;
var maxVal = 0.0001;

function setup() {
  return {
    input: ["NO2", "dataMask"],
    output: [
      {
        id: "default",
      	bands: 4,
      },
      {
        id: "index",
        bands: 1,
        sampleType: "FLOAT32" 
      },
      {
        id: "eobrowserStats",
        bands: 1,
      },
      {
        id: "dataMask",
        bands: 1
      },
    ],
  };
}

var viz = ColorRampVisualizer.createBlueRed(minVal, maxVal);

function evaluatePixel(samples) {
  const [r, g, b] = viz.process(samples.NO2);
  
  const statsVal = isFinite(samples.NO2) ? samples.NO2 : NaN;
  return {
    default: [r, g, b, samples.dataMask],
    index: [samples.NO2],
    eobrowserStats: [statsVal],
    dataMask: [samples.dataMask],
  };
}
'''

O3='''
//VERSION=3
var minVal = 0.0;
var maxVal = 0.36;

function setup() {
  return {
    input: ["O3", "dataMask"],
    output: [
      {
        id: "default",
      	bands: 4,
      },
      {
        id: "index",
        bands: 1,
        sampleType: "FLOAT32" 
      },
      {
        id: "eobrowserStats",
        bands: 1,
      },
      {
        id: "dataMask",
        bands: 1
      },
    ],
  };
}

var viz = ColorRampVisualizer.createBlueRed(minVal, maxVal);

function evaluatePixel(samples) {
  const [r, g, b] = viz.process(samples.O3);
  
  const statsVal = isFinite(samples.O3) ? samples.O3 : NaN;
  return {
    default: [r, g, b, samples.dataMask],
    index: [samples.O3],
    eobrowserStats: [statsVal],
    dataMask: [samples.dataMask],
  };
}
'''

SO2='''
//VERSION=3
var minVal = 0.0;
var maxVal = 0.01;

function setup() {
  return {
    input: ["SO2", "dataMask"],
    output: [
      {
        id: "default",
      	bands: 4,
      },
      {
        id: "index",
        bands: 1,
        sampleType: "FLOAT32" 
      },
      {
        id: "eobrowserStats",
        bands: 1,
      },
      {
        id: "dataMask",
        bands: 1
      },
    ],
  };
}

var viz = ColorRampVisualizer.createBlueRed(minVal, maxVal);

function evaluatePixel(samples) {
  const [r, g, b] = viz.process(samples.SO2);
  
  const statsVal = isFinite(samples.SO2) ? samples.SO2 : NaN;
  return {
    default: [r, g, b, samples.dataMask],
    index: [samples.SO2],
    eobrowserStats: [statsVal],
    dataMask: [samples.dataMask],
  };
}
'''

UV= '''
//VERSION=3
function setup() {
  return {
    input: ["O3", "AER_AI_340_380", "CLOUD_FRACTION", "dataMask"],
    output: [
      { id: "default", bands: 4 },
      { id: "uvrisk", bands: 1, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 }
    ]
  };
}

function evaluatePixel(samples) {
  let o3 = samples.O3;
  let ai = samples.AER_AI_340_380;
  let cloud = samples.CLOUD_FRACTION;

  // Normalize input variables (based on typical observed ranges)
  let normO3 = Math.min(Math.max(o3 / 0.35, 0.1), 2.0); // O3 usually 0.1–0.35
  let normAI = Math.min(Math.max(ai / 5.0, 0.0), 1.0);   // AI range: -1 to 5
  let normCloud = Math.min(Math.max(cloud, 0.0), 1.0);

  // Estimate UV exposure risk proxy
  let uv_risk = (1.0 - normCloud) * (1.0 - normAI) * (1.0 / normO3);

  // Normalize for RGB visualization
  let norm = Math.min(Math.max((uv_risk - 1) / 2, 0.0), 1.0);
  let r = norm;
  let g = 1.0 - norm;
  let b = 0.0;

  return {
    default: [r, g, b, samples.dataMask],
    uvrisk: [uv_risk],
    dataMask: [samples.dataMask]
  };
}
'''

masks = {
    'AER_AI': AER_AI,
    'METHANE': METHANE,
    'CLOUD_HEIGHT': CLOUD_HEIGHT,
    'CLOUD_PRESSURE': CLOUD_PRESSURE,
    'CLOUD_EFFECTIVE_RADIOMETRIC_FRACTION': CLOUD_EFFECTIVE_RADIOMETRIC_FRACTION,
    'CLOUD_OPTICAL_THICKNESS': CLOUD_OPTICAL_THICKNESS,
    'CO': CARBON_MONOXIDE,
    'HCHO': HCHO,
    'NO2': NO2,
    'SO2': SO2,
    'UV': UV
}
