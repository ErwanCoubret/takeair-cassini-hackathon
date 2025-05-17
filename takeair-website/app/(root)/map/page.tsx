"use client";

import { useState } from "react";
import { BsThermometerHalf } from "react-icons/bs";
import { FaSliders } from "react-icons/fa6";
import { FiWind } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";

export default function Map() {
  const [map, setMap] = useState<"map1" | "map2" | "map3" | "map4">("map1");
  const [isFilterWindowOpen, setIsFilterWindowOpen] = useState(false);

  return (
    <div className="relative h-screen bg-gray-1 p-6 overflow-hidden">
      <div className="flex flex-col h-full gap-5">
        <div className="absolute flex items-center justify-between z-20 top-5 left-5">
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-md shadow-md bg-gray-1 focus:border-darkblue focus:outline-none"
          />
        </div>

        <div className="absolute inset-0">
          <img
            src={`/${map}.png`}
            alt="Map"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute bottom-20 right-5 z-20">
          <button
            className="bg-gray-1 p-3 rounded-md shadow-md"
            onClick={() => setIsFilterWindowOpen(!isFilterWindowOpen)}
          >
            <FaSliders className="text-darkblue" />
          </button>
        </div>

        <div
          className={`absolute flex flex-col gap-8 bottom-0 left-0 w-full h-2/5 bg-gray-1 rounded-t-3xl shadow-md z-30 p-6 transform transition-transform duration-300 ${isFilterWindowOpen ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="flex justify-between items-center h-10">
            <h2 className="text-2xl font-semibold">Filter</h2>
            <button
              className="p-2 rounded bg-gray-2"
              onClick={() => setIsFilterWindowOpen(false)}
            >
              <IoCloseSharp className="text-darkblue text-2xl" />
            </button>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => setMap("map1")}
                className={`flex items-center justify-between p-2 px-4 rounded w-full ${
                  map === "map1" ? "bg-darkblue text-gray-1" : "bg-gray-2 text-darkblue"
                }`}
              >
                <FaSliders className="text-2xl" />
                <p className="text-base font-bold">For you</p>
              </button>

              <button
                onClick={() => setMap("map2")}
                className={`flex items-center justify-between p-2 px-4 rounded w-full ${
                  map === "map2" ? "bg-darkblue text-gray-1" : "bg-gray-2 text-darkblue"
                }`}
              >
                <BsThermometerHalf className="text-2xl" />
                <p className="text-base font-bold">Temperature</p>
              </button>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => setMap("map3")}
                className={`flex items-center justify-between p-2 px-4 rounded w-full ${
                  map === "map3" ? "bg-darkblue text-gray-1" : "bg-gray-2 text-darkblue"
                }`}
              >
                <FiWind className="text-2xl" />
                <p className="text-base font-bold">Air Quality</p>
              </button>

              <button
                onClick={() => setMap("map4")}
                className={`flex items-center justify-between p-2 px-4 rounded w-full ${
                  map === "map4" ? "bg-darkblue text-gray-1" : "bg-gray-2 text-darkblue"
                }`}
              >
                <MdOutlineWbSunny className="text-2xl" />
                <p className="text-base font-bold">UV</p>
              </button>
            </div>
          </div>

            <button className="mx-auto w-fit flex items-center gap-2 bg-gray-2 text-darkblue p-2 rounded">
              
              <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
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
      </div>
    </div>
  );
}
