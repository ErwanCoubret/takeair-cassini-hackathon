"use client";

export default function User() {

  return (
    <div className="relative h-screen bg-gray-1 p-6">
      <div className="flex flex-col h-full gap-5">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold text-darkblue">User Configuration</h1>
        </div>

        <div className="flex w-full justify-between items-baseline">
          <h2 className="text-lg font-bold text-darkblue">Your Sensitivities
          </h2>
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

          <div className="flex w-full justify-between bg-gray-2 px-5 py-3 items-center rounded">
            <div className="flex flex-col gap-1 w-full">
              <input type="range" min="0" max="100" defaultValue="20" className="accent-darkblue" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
