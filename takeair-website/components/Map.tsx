"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ImageOverlay,
} from "react-leaflet";
import { BsThermometerHalf } from "react-icons/bs";
import { FaSliders } from "react-icons/fa6";
import { FiWind } from "react-icons/fi";
import { IoCloseSharp, IoWaterOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import "leaflet/dist/leaflet.css";
import { IoIosWater, IoMdCloudOutline } from "react-icons/io";

const baseUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const overlays: Record<"map1" | "map2" | "map3" | "map4" | "map5" | "map6", string | null> = {
  map1: "/heatmaps/clouds.png",
  map2: "/heatmaps/temperature.png",
  map3: "/heatmaps/airquality.png",
  map4: "/heatmaps/ndvi.png",
  map5: "/heatmaps/clouds.png",
  map6: "/heatmaps/ndvi.png",
};

const imageBounds: [[number, number], [number, number]] = [
  [47.9246029, 6.8386557],
  [49.1145504, 8.6352863],
];

function SearchLayer({
  query,
  onResult,
}: {
  query: string;
  onResult: (pos: [number, number]) => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (!query) return;
    (async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        if (data.length) {
          const { lat, lon } = data[0];
          const coords: [number, number] = [parseFloat(lat), parseFloat(lon)];
          map.setView(coords, 14);
          onResult(coords);
        } else {
          alert("Location not found");
        }
      } catch (err) {
        console.error(err);
        alert("Search error");
      }
    })();
  }, [query]);

  return null;
}

export default function Map() {
  const [mapFilter, setMapFilter] = useState<
    "map1" | "map2" | "map3" | "map4" | "map5" | "map6"
  >("map1");
  const [isFilterWindowOpen, setIsFilterWindowOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchPos, setSearchPos] = useState<[number, number] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setSearchQuery(query);
  };

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

  const [isMore, setIsMore] = useState(false);

  return (
    <div className="relative  h-[calc(var(--vh)*100)] bg-gray-1 p-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={[48.523071, 7.736971]}
          zoom={10}
          className={`h-full w-full ${isFilterWindowOpen ? "pointer-events-none" : ""
            }`}
          attributionControl={false}
        >
          <TileLayer url={baseUrl} />

          {overlays[mapFilter] && (
            <ImageOverlay
              url={overlays[mapFilter]!}
              bounds={imageBounds}
              opacity={0.6}
            />
          )}

          {searchQuery && (
            <SearchLayer query={searchQuery} onResult={setSearchPos} />
          )}

          {searchPos && (
            <Marker position={searchPos}>
              <Popup>{searchQuery}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <form
        onSubmit={handleSearch}
        className="absolute flex flex-col items-center gap-2 z-50 top-5 right-5"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="p-2 text-gray-3 rounded-md w-40 shadow-md bg-gray-1 focus:border-darkblue focus:outline-none"
          />
          <button
            type="submit"
            className="bg-darkblue text-gray-1 p-2 px-5 rounded-md shadow-md"
          >
            Go
          </button>
        </div>

        <p className="text-sm bg-gray-1 px-1 rounded text-gray-3">
          Data gathered from Copernicus
        </p>
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
        className={`absolute flex flex-col gap-8 bottom-0 left-0 w-full h-90 bg-gray-1 rounded-t-3xl shadow-md z-50 p-6 transform transition-transform duration-300 ${isFilterWindowOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >

      </div>

      <div
        className={`absolute flex flex-col gap-8 bottom-0 left-0 w-full h-90 bg-gray-1 rounded-t-3xl shadow-md z-50 p-6 transform transition-transform duration-300 ${isFilterWindowOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <div className="flex justify-between items-center h-10">
          <h2 className="text-2xl text-darkblue font-semibold">Filter</h2>
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
              onClick={() => setMapFilter("map1")}
              className={`flex items-center justify-between p-2 px-4 rounded w-full ${mapFilter === "map1"
                ? "bg-darkblue text-gray-1"
                : "bg-gray-2 text-darkblue"
                }`}
            >
              <FaSliders className="text-2xl" />
              <p className="text-base font-bold">For you</p>
            </button>

            <button
              onClick={() => setMapFilter("map2")}
              className={`flex items-center justify-between p-2 px-4 rounded w-full ${mapFilter === "map2"
                ? "bg-darkblue text-gray-1"
                : "bg-gray-2 text-darkblue"
                }`}
            >
              <BsThermometerHalf className="text-2xl" />
              <p className="text-base font-bold">Temperature</p>
            </button>
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setMapFilter("map3")}
              className={`flex items-center justify-between p-2 px-4 rounded w-full ${mapFilter === "map3"
                ? "bg-darkblue text-gray-1"
                : "bg-gray-2 text-darkblue"
                }`}
            >
              <FiWind className="text-2xl" />
              <p className="text-base font-bold">Air Quality</p>
            </button>

            <button
              onClick={() => setMapFilter("map4")}
              className={`flex items-center justify-between p-2 px-4 rounded w-full ${mapFilter === "map4"
                ? "bg-darkblue text-gray-1"
                : "bg-gray-2 text-darkblue"
                }`}
            >
              <MdOutlineWbSunny className="text-2xl" />
              <p className="text-base font-bold">UV</p>
            </button>
          </div>

          {isMore && (
            <>
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setMapFilter("map5")}
                  className={`flex items-center justify-between p-2 px-4 rounded w-full ${mapFilter === "map5"
                    ? "bg-darkblue text-gray-1"
                    : "bg-gray-2 text-darkblue"
                    }`}
                >
                  <IoMdCloudOutline className="text-2xl" />
                  <p className="text-base font-bold">Clouds</p>
                </button>

                <button
                  onClick={() => setMapFilter("map6")}
                  className={`flex items-center justify-between p-2 px-4 rounded w-full ${mapFilter === "map6"
                    ? "bg-darkblue text-gray-1"
                    : "bg-gray-2 text-darkblue"
                    }`}
                >
                  <IoWaterOutline className="text-2xl" />
                  <p className="text-base font-bold">Humidity</p>
                </button>
              </div>
            </>
          )}
        </div>

        {!isMore && <button
          onClick={() => setIsMore(true)}
          className="mx-auto w-fit flex items-center gap-2 bg-gray-2 text-darkblue p-2 rounded mb-20">
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
        </button>}
      </div>
    </div>
  );
}
