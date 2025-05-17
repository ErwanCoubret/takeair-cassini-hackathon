"use client";

import { BsBank, BsThermometerHalf } from "react-icons/bs";
import { FaArrowRight, FaRegNewspaper } from "react-icons/fa6";
import { FiGlobe, FiWind } from "react-icons/fi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { MdOutlineWbSunny } from "react-icons/md";


export default function Home() {

  return (
    <div className="relative h-screen bg-gray-1 p-6 overflow-y-auto">
      <div className="flex flex-col h-full gap-5">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold text-darkblue">Home</h1>

          <div className="flex items-center p-2 bg-gray-2 rounded">
            <HiMiniMagnifyingGlass className="text-2xl text-gray-3" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-lg font-bold text-darkblue">General Metrics

              <span className="text-gray-3 text-sm font-normal"> (Strasbourg)</span>
            </h2>

            <button className="text-sm w-fit flex items-center gap-2 bg-gray-2 text-darkblue p-2 rounded">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              See more
            </button>
          </div>

          <div className="flex w-full justify-between bg-gray-2 p-5 items-center rounded">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-darkblue">Temperature</h1>
              <div className="flex items-center gap-2 text-darkblue">
                <BsThermometerHalf className="text-2xl " />
                <p className="font-semibold">23.4 °C</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-darkblue">Air Quality</h1>
              <div className="flex items-center gap-2 text-darkblue">
                <FiWind className="text-2xl " />
                <p className="font-semibold">Bad</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-darkblue">UV index</h1>
              <div className="flex items-center gap-2 text-darkblue">
                <MdOutlineWbSunny className="text-2xl " />
                <p className="font-semibold">6</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-lg font-bold text-darkblue">
              Personnal Health Recommandation
            </h2>
          </div>

          <div className="flex flex-col gap-3 w-full justify-between bg-gray-2 p-3 items-center rounded">
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between gap-2 bg-red-300 p-2 px-4 rounded-t">
                Pollen Alert

                <div className="flex items-center bg-gray-1 text-gray-3 p-1 rounded">
                  <FaArrowRight />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 bg-gray-1 p-2 px-4 rounded-b">
                <p className="text-sm text-gray-3">
                  High pollen density detected in your area. It is recommended to take your medicine.
                </p>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between gap-2 bg-orange-300 p-2 px-4 rounded-t">
                Large temperature ranges

                <div className="flex items-center bg-gray-1 text-gray-3 p-1 rounded">
                  <FaArrowRight />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 bg-gray-1 p-2 px-4 rounded-b">
                <p className="text-sm text-gray-3">
                  Due to high temperatures ranges, it is recommended to limit your travel between 12 p.m. and 4 p.m.
                </p>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between gap-2 bg-yellow-300 p-2 px-4 rounded-t">
                High UV index

                <div className="flex items-center bg-gray-1 text-gray-3 p-1 rounded">
                  <FaArrowRight />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 bg-gray-1 p-2 px-4 rounded-b">
                <p className="text-sm text-gray-3">
                  The UV index in your area has been estimated at 6. To prevent possible problems, it is recommended to cover up.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-lg font-bold text-darkblue">
              What do you want to do ?
            </h2>
          </div>

          <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center justify-between bg-gray-2 p-2 px-4 rounded w-full">
                <FaRegNewspaper className="text-2xl text-darkblue" />
                <p className="text-base font-bold text-darkblue">Today Infos</p>
              </div>

              <div className="flex items-center justify-between bg-gray-2 p-2 px-4 rounded w-full">
                <FiGlobe className="text-2xl text-darkblue" />
                <p className="text-base font-bold text-darkblue">Plan an outing</p>
              </div>

            <div className="flex items-center justify-between bg-gray-2 p-2 px-4 rounded w-full mb-30">
              <BsBank className="text-2xl text-darkblue" />
              <p className="text-base font-bold text-darkblue">Gouvernement Recommandation</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
