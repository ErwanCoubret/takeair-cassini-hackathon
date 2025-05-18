"use client";

import { useEffect } from "react";

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

  return (
    <div className="relative h-[calc(var(--vh)*100)] bg-gray-1 p-6 overflow-y-auto">
      <div className="flex flex-col h-full gap-5">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold text-darkblue">User Configuration</h1>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-lg font-bold text-darkblue">Your Sensitivities
            </h2>
          </div>
          <p className="text-base text-gray-3 text-darkblue">
            Indicate your sensitivities to the following elements in order to get personnal recommandations.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-base font-bold text-darkblue">
              Pollen
            </h2>
          </div>

          <div className="flex w-full justify-between bg-gray-2 px-5 py-3 items-center rounded">
            <div className="flex flex-col gap-1 w-full">
              <input type="range" min="0" max="100" defaultValue="90" className="accent-darkblue" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-base font-bold text-darkblue">
              Air Quality
            </h2>
          </div>

          <div className="flex w-full justify-between bg-gray-2 px-5 py-3 items-center rounded">
            <div className="flex flex-col gap-1 w-full">
              <input type="range" min="0" max="100" defaultValue="90" className="accent-darkblue" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-base font-bold text-darkblue">
              Temperature
            </h2>
          </div>

          <div className="flex w-full justify-between bg-gray-2 px-5 py-3 items-center rounded">
            <div className="flex flex-col gap-1 w-full">
              <input type="range" min="0" max="100" defaultValue="70" className="accent-darkblue" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-base font-bold text-darkblue">
              UV
            </h2>
          </div>

          <div className="flex w-full justify-between bg-gray-2 px-5 py-3 items-center rounded mb-20">
            <div className="flex flex-col gap-1 w-full">
              <input type="range" min="0" max="100" defaultValue="20" className="accent-darkblue" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
