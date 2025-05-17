"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function Ressources() {

  return (
    <div className="relative h-screen bg-gray-1 p-6">
      <div className="flex flex-col h-full gap-5">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold text-darkblue">Ressources</h1>
        </div>

        <div className="flex flex-col gap-3 w-full justify-between items-center rounded">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between gap-2 bg-gray-2 p-2 px-4 rounded-t">
              <p className="">
                Air Quality: Sources of Pollution and Health Effects
                <i className="ml-2 text-gray-3 text-sm font-normal">25/02/02</i>
              </p>

              <Link
                href={"https://sante.gouv.fr/sante-et-environnement/air-exterieur/qualite-de-l-air-exterieur-10984/article/qualite-de-l-air-sources-de-pollution-et-effets-sur-la-sante"}
                className="flex items-center bg-gray-1 text-gray-3 p-1 rounded">
                <FaArrowRight />
              </Link>
            </div>

            <div className="flex items-center justify-between gap-2 bg-white p-2 px-4 rounded-b">
              <p className="text-sm text-gray-3">
                Every day, an adult inhales 10,000 to 20,000 liters of air, which is composed of an average of 99% oxygen and nitrogen. However, this air can also contain various pollutants that can cause health effects.
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between gap-2 bg-gray-2 p-2 px-4 rounded-t">
              <p className="">
                UV Radiation: Sources, Exposure, and Health Risks
                <i className="ml-2 text-gray-3 text-sm font-normal">08/04/2025</i>
              </p>

              <Link
                href={"https://sante.gouv.fr/sante-et-environnement/air-exterieur/qualite-de-l-air-exterieur-10984/article/qualite-de-l-air-sources-de-pollution-et-effets-sur-la-sante"}
                className="flex items-center bg-gray-1 text-gray-3 p-1 rounded">
                <FaArrowRight />
              </Link>
            </div>

            <div className="flex items-center justify-between gap-2 bg-white p-2 px-4 rounded-b">
              <p className="text-sm text-gray-3">
                Ultraviolet (UV) radiation, a component of sunlight, is invisible but powerful. Prolonged exposure can lead to skin damage, eye disorders, and increased risk of skin cancer. Understanding UV levels helps protect against overexposure.
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between gap-2 bg-gray-2 p-2 px-4 rounded-t">
              <p className="">
                Air Quality: Sources of Pollution and Health Effects
                <i className="ml-2 text-gray-3 text-sm font-normal">15/03/2025</i>
              </p>

              <Link
                href={"https://sante.gouv.fr/sante-et-environnement/air-exterieur/qualite-de-l-air-exterieur-10984/article/qualite-de-l-air-sources-de-pollution-et-effets-sur-la-sante"}
                className="flex items-center bg-gray-1 text-gray-3 p-1 rounded">
                <FaArrowRight />
              </Link>
            </div>

            <div className="flex items-center justify-between gap-2 bg-white p-2 px-4 rounded-b">
              <p className="text-sm text-gray-3">
                Air is essential to life, but its quality can vary significantly. From vehicle emissions to industrial discharge, multiple sources contribute to air pollution, which can have serious implications for respiratory and cardiovascular health.
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between gap-2 bg-gray-2 p-2 px-4 rounded-t">
              <p className="">
                Temperature Ranges: Environmental Extremes and Human Health
                <i className="ml-2 text-gray-3 text-sm font-normal">16/08/2024</i>
              </p>

              <Link
                href={"https://sante.gouv.fr/sante-et-environnement/air-exterieur/qualite-de-l-air-exterieur-10984/article/qualite-de-l-air-sources-de-pollution-et-effets-sur-la-sante"}
                className="flex items-center bg-gray-1 text-gray-3 p-1 rounded">
                <FaArrowRight />
              </Link>
            </div>

            <div className="flex items-center justify-between gap-2 bg-white p-2 px-4 rounded-b">
              <p className="text-sm text-gray-3">
                Daily temperatures fluctuate with seasons and geography. Extreme heat or cold can stress the human body, aggravate chronic conditions, and even cause life-threatening events. Monitoring temperature trends is key to staying safe.
              </p>
            </div>
          </div>

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


      </div>
    </div>
  );
}
