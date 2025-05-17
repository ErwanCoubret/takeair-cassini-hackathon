"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { BsThermometerHalf } from "react-icons/bs";
import { FaSliders } from "react-icons/fa6";
import { FiWind } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from 'leaflet';

const baseUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const overlays: Record<
  "map1" | "map2" | "map3" | "map4",
  string | null
> = {
  map1: null,
  map2: "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY",
  map3: "https://tiles.waqi.info/tiles/{z}/{x}/{y}.png?token=YOUR_TOKEN",
  map4: "https://tile.openweathermap.org/map/uvi/{z}/{x}/{y}.png?appid=YOUR_API_KEY",
};

export default function Map() {
  const [map, setMap] = useState<"map1" | "map2" | "map3" | "map4">("map1");
  const [isFilterWindowOpen, setIsFilterWindowOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [leafletMap, setLeafletMap] = useState<LeafletMap | null>(null);
  const [searchPos, setSearchPos] = useState<[number, number] | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || !leafletMap) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const coords: [number, number] = [parseFloat(lat), parseFloat(lon)];
        leafletMap.setView(coords, 14);
        setSearchPos(coords);
      } else {
        alert("Location not found");
      }
    } catch (err) {
      console.error(err);
      alert("Search error");
    }
  };

  return (
    <div className="relative h-screen bg-gray-1 p-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={[48.523071, 7.736971]}
          zoom={14}
          whenReady={() => {
            if (leafletMap) return;
          }}
          className={`h-full w-full ${isFilterWindowOpen ? "pointer-events-none" : ""}`}
          attributionControl={false}
        >
          <TileLayer url={baseUrl} />
          {overlays[map] && <TileLayer url={overlays[map] as string} opacity={0.6} />}
          {searchPos && (
            <Marker position={searchPos}>
              <Popup>{query}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <form
        onSubmit={handleSearch}
        className="absolute flex items-center gap-2 z-50 top-5 right-5"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="p-2 rounded-md shadow-md bg-gray-1 focus:border-darkblue focus:outline-none"
        />
        <button
          type="submit"
          className="bg-darkblue text-gray-1 p-2 rounded-md shadow-md"
        >
          Go
        </button>
      </form>

      <div className="absolute bottom-20 right-5 z-50">
        <button
          className="bg-gray-1 p-3 rounded-md shadow-md"
          onClick={() => setIsFilterWindowOpen(!isFilterWindowOpen)}
        >
          <FaSliders className="text-darkblue" />
        </button>
      </div>

      <div
        className={`absolute flex flex-col gap-8 bottom-0 left-0 w-full h-1/2 bg-gray-1 rounded-t-3xl shadow-md z-50 p-6 transform transition-transform duration-300 ${
          isFilterWindowOpen ? "translate-y-0" : "translate-y-full"
        }`}
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

        <button className="mx-auto w-fit flex items-center gap-2 bg-gray-2 text-darkblue p-2 rounded mb-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          See more
        </button>
      </div>
    </div>
  );
}
