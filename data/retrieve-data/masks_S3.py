TEMPERATURE='''
//VERSION=3

function setup() {
  return {
    input: ["S8", "S9", "dataMask"],
    output: [
      {
        id: "default",
        bands: 4
      },
      {
        id: "LST",
        bands: 1,
        sampleType: "FLOAT32"
      },
      {
        id: "dataMask",
        bands: 1
      }
    ]
  };
}

function evaluatePixel(samples) {
  let T8 = samples.S8;
  let T9 = samples.S9;

  // Basic split-window algorithm
  // LST = T8 + a*(T8 - T9)
  // Here a = 0.5 (empirical, approximate)

  let LST = T8 + 0.5 * (T8 - T9);

  // Normalize for visualization (optional)
  let minTemp = 250; // K
  let maxTemp = 330; // K
  let norm = (LST - minTemp) / (maxTemp - minTemp);
  norm = Math.min(Math.max(norm, 0), 1);
  
  return {
    default: [norm, 1 - norm, 0, samples.dataMask],
    LST: [LST],
    dataMask: [samples.dataMask]
  };
}
'''

masks_S3 = {
    'TEMPERATURE': TEMPERATURE
}