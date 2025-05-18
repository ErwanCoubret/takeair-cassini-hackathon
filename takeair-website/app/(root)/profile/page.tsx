"use client";

import { useEffect, useState } from "react";

export default function User() {

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  const textsInfos = {
    "Air Quality": [
      "You're not sensitive to air quality.",
      "You're quite sensitive to air quality.",
      "You're very sensitive to air quality.",
      "You're extremely sensitive to air quality.",
    ],
    "Temperature": [
      "You're not sensitive to temperature.",
      "You're quite sensitive to temperature.",
      "You're very sensitive to temperature.",
      "You're extremely sensitive to temperature.",
    ],
    "UV": [
      "You're not sensitive to UV.",
      "You're quite sensitive to UV.",
      "You're very sensitive to UV.",
      "You're extremely sensitive to UV.",
    ],
    "Pollen": [
      "You're not sensitive to pollen.",
      "You're quite sensitive to pollen.",
      "You're very sensitive to pollen.",
      "You're extremely sensitive to pollen.",
    ],
  }

  const [hasAsthma, setHasAsthma] = useState(false);
  const [hasCardiacFragility, setHasCardiacFragility] = useState(false);
  const [hasArthritis, setHasArthritis] = useState(false);

  const [airQuality, setAirQuality] = useState(70);
  const [temperature, setTemperature] = useState(90);
  const [uv, setUv] = useState(30);
  const [pollen, setPollen] = useState(0);

  return (
    <div className="relative h-[calc(var(--vh)*100)] bg-gray-1 p-6 overflow-y-auto">
      <div className="flex flex-col h-full gap-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold text-darkblue">User Configuration</h1>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-lg font-bold text-darkblue">Your Sensitivities
            </h2>
          </div>
          <p className="text-sm text-gray-3 text-darkblue">
            Indicate your sensitivities to the following elements in order to get personnal recommendations.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex w-full gap-3 items-baseline">
            <h2 className="text-base font-bold text-darkblue">
              Air Quality
            </h2>

            <p className={`text-xs ${
              ["text-green-500", "text-yellow-500", "text-orange-500", "text-red-500"][
              Math.min(Math.floor(airQuality / 25), 3)
              ]
            }`}>
              {textsInfos["Air Quality"][Math.min(Math.floor(airQuality / 25), 3)]}
            </p>
          </div>

          <div className="flex w-full justify-between bg-gray-2 px-5 py-3 items-center rounded">
            <div className="flex flex-col gap-1 w-full">
              <input
                type="range"
                min="0"
                max="100"
                value={airQuality}
                className="accent-darkblue"
                onChange={(e) => setAirQuality(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex w-full gap-3 items-baseline">
            <h2 className="text-base font-bold text-darkblue">
              Temperature
            </h2>

            <p className={`text-xs ${
              ["text-green-500", "text-yellow-500", "text-orange-500", "text-red-500"][
              Math.min(Math.floor(temperature / 25), 3)
              ]
            }`}>
              {textsInfos["Temperature"][Math.min(Math.floor(temperature / 25), 3)]}
            </p>
          </div>

          <div className="flex w-full justify-between bg-gray-2 px-5 py-3 items-center rounded">
            <div className="flex flex-col gap-1 w-full">
              <input
                type="range"
                min="0"
                max="100"
                value={temperature}
                className="accent-darkblue"
                onChange={(e) => setTemperature(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex w-full gap-3 items-baseline">
            <h2 className="text-base font-bold text-darkblue">
              UV
            </h2>

            <p className={`text-xs ${
              ["text-green-500", "text-yellow-500", "text-orange-500", "text-red-500"][
              Math.min(Math.floor(uv / 25), 3)
              ]
            }`}>
              {textsInfos["UV"][Math.min(Math.floor(uv / 25), 3)]}
            </p>
          </div>

          <div className="flex w-full justify-between bg-gray-2 px-5 py-3 items-center rounded">
            <div className="flex flex-col gap-1 w-full">
              <input
                type="range"
                min="0"
                max="100"
                value={uv}
                className="accent-darkblue"
                onChange={(e) => setUv(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex w-full gap-3 items-baseline">
            <h2 className="text-base font-bold text-darkblue">
              Pollen
            </h2>

            <p className={`text-xs ${
              ["text-green-500", "text-yellow-500", "text-orange-500", "text-red-500"][
              Math.min(Math.floor(pollen / 25), 3)
              ]
            }`}>
              {textsInfos["Pollen"][Math.min(Math.floor(pollen / 25), 3)]}
            </p>
          </div>

          <div className="flex w-full justify-between bg-gray-2 px-5 py-3 items-center rounded">
            <div className="flex flex-col gap-1 w-full">
              <input
                type="range"
                min="0"
                max="100"
                value={pollen}
                className="accent-darkblue"
                onChange={(e) => setPollen(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-lg font-bold text-darkblue">
              Medical conditions
            </h2>
          </div>

          <p className="text-sm text-gray-3 text-darkblue">
            Indicate your medical conditions based on your doctor's advice. This will help us to provide you with the best recommendations.
          </p>
        </div>

        <div className="flex flex gap-1 w-full justify-between">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-base font-bold text-darkblue">
              Asthma
            </h2>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="asthma-toggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  id="asthma-toggle"
                  type="checkbox"
                  className="sr-only peer"
                  checked={hasAsthma}
                  onChange={(e) => setHasAsthma(e.target.checked)}
                />
                <div className="w-10 h-6 bg-gray-300 rounded-full peer peer-checked:bg-darkblue transition-colors"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4"></div>
              </div>
            </label>
          </div>
        </div>

        <div className="flex flex gap-1 w-full justify-between">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-base font-bold text-darkblue">
              Cardiac fragility
            </h2>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="cardiac-toggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  id="cardiac-toggle"
                  type="checkbox"
                  className="sr-only peer"
                  checked={hasCardiacFragility}
                  onChange={(e) => setHasCardiacFragility(e.target.checked)}
                />
                <div className="w-10 h-6 bg-gray-300 rounded-full peer peer-checked:bg-darkblue transition-colors"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4"></div>
              </div>
            </label>
          </div>
        </div>

        <div className="flex flex gap-1 w-full justify-between">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-base font-bold text-darkblue">
              Arthritis
            </h2>
          </div>
          <div className="flex flex-col gap-1 mb-20">
            <label htmlFor="arthritis-toggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  id="arthritis-toggle"
                  type="checkbox"
                  className="sr-only peer"
                  checked={hasArthritis}
                  onChange={(e) => setHasArthritis(e.target.checked)}
                />
                <div className="w-10 h-6 bg-gray-300 rounded-full peer peer-checked:bg-darkblue transition-colors"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
