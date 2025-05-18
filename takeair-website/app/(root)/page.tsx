"use client";

import Modal from "@/components/Modal";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { BsBank, BsThermometerHalf } from "react-icons/bs";
import { FaArrowRight, FaRegNewspaper } from "react-icons/fa6";
import { FiGlobe, FiWind } from "react-icons/fi";
import { IoCloseSharp, IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
import { MdOutlineInfo, MdOutlineWbSunny } from "react-icons/md";


export default function Home() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false);
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState(false);
  const [isPollenModalOpen, setIsPollenModalOpen] = useState(false);
  const [isTempModalOpen, setIsTempModalOpen] = useState(false);
  const [isUVModalOpen, setIsUVModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
    audioRef.current = new Audio("/recap.mp3");
  }, []);

  // Hack pour homogénéiser 100vh sur mobile/desktop
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

          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={120}
            className=""
          />

          <button
            className={`flex items-center gap-2 ${isAudioPlaying ? "bg-darkblue text-gray-1" : "bg-gray-2 text-darkblue"
              } p-2 rounded`}
            onClick={() => {
              if (!audioRef.current) return;
              if (audioRef.current.paused) {
                audioRef.current.play();
                setIsAudioPlaying(true);
              } else {
                audioRef.current.pause();
                setIsAudioPlaying(false);
              }
            }}
          >
            {isAudioPlaying ? <IoVolumeMute className="text-2xl" /> : <IoVolumeHigh className="text-2xl" />}
            {isAudioPlaying ? "Stop" : "Vocal Recap"}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-lg font-bold text-darkblue">General Metrics

              <span className="text-gray-3 text-sm font-normal"> (Strasbourg)</span>
            </h2>

            <button
              onClick={() => setIsMetricsModalOpen(true)}

              className="text-sm w-fit flex items-center gap-2 bg-gray-2 text-darkblue p-2 rounded">
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

          <Modal
            showState={isMetricsModalOpen}
            setShowState={setIsMetricsModalOpen}
          >
            <div className="flex w-full justify-between items-center">
              <h2 className="text-lg font-bold text-darkblue">General Metrics

                <span className="text-gray-3 text-sm font-normal"> (Strasbourg)</span>
              </h2>

              <button
                className="p-2 rounded bg-gray-2"
                onClick={() => setIsMetricsModalOpen(false)}
              >
                <IoCloseSharp className="text-darkblue text-2xl" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="flex justify-between items-center p-4 bg-gray-2 rounded">
                <span className="font-bold text-darkblue">Temperature</span>
                <div className="flex flex-col text-right">
                  <span className="text-sm text-gray-3">Max: 28 °C</span>
                  <span className="text-sm text-gray-3">Min: 15 °C</span>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-2 rounded">
                <span className="font-bold text-darkblue">UV</span>
                <span className="text-sm text-gray-3">Index: 6</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-2 rounded">
                <span className="font-bold text-darkblue">Pollen</span>
                <span className="text-sm text-gray-3">Level: High</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-2 rounded">
                <span className="font-bold text-darkblue">Air Quality</span>
                <span className="text-sm text-gray-3">Moderate</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-2 rounded">
                <span className="font-bold text-darkblue">Ozone</span>
                <span className="text-sm text-gray-3">O3: 120 ppb</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-2 rounded">
                <span className="font-bold text-darkblue">Methane</span>
                <span className="text-sm text-gray-3">CH4: 1.8 ppm</span>
              </div>
            </div>

          </Modal>

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
              Personnal Health Recommendation
            </h2>
          </div>

          <button
            onClick={() => setIsDisclaimerModalOpen(true)}
            className="flex w-fit text-xs justify-between items-center gap-2 bg-gray-2 px-4 py-2 rounded text-darkblue font-semibold">
            <MdOutlineInfo className="text-base" />
            Legal Disclaimer
          </button>

          <Modal
            showState={isDisclaimerModalOpen}
            setShowState={setIsDisclaimerModalOpen}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-darkblue">Legal Disclaimer</h2>

              <button
                className="p-2 rounded bg-gray-2"
                onClick={() => setIsDisclaimerModalOpen(false)}
              >
                <IoCloseSharp className="text-darkblue text-2xl" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-gray-3 mt-4 max-h-[75vh] overflow-y-auto">
              <p>
                This app (“App”) provides only information for educational purposes. This App is not medical or treatment advice, professional diagnosis, opinion, or services – and may not be treated as such by the user. As such, this App may not be relied upon for the purposes of medical diagnosis or as a recommendation for medical care or treatment. The information provided by this App is not a substitute for professional medical advice, diagnosis or treatment. All content, including text, graphics, images and information, contained on or available through this App is for general information purposes only.
              </p>
              
              <p>
                <strong>This App does not represent a substitute for expert medical attention.</strong> You must not rely on the information on this App as an alternative to medical advice from your doctor or other professional healthcare provider. We strongly recommend that you consult your own physician or another available health professional regarding any diagnosis, findings, interpretation or course of treatment. If you think you or another individual may be suffering from any medical condition, you should seek immediate medical attention. You should never delay seeking medical advice, or discontinue medical treatment because of information in this guide.
              </p>
              
              <p>
                The medical information within this guide is provided “as is” without any representations or warranties, express or implied. TakeAir or any other person or party that contributed to this App makes no representations or warranties in relation to the medical information in this guide. Reliance on any information provided by this App or any linked websites is solely at your own risk.
              </p>
              
              <p>
                None of the individual authors, contributors, developers of this guide nor anyone else connected to TakeAir take any responsibility for the results or consequences of any attempt to use or adopt any of the information presented by this guide.
              </p>
              
              <p>
                Without prejudice to the generality of the foregoing paragraph, TakeAir does not warrant that the medical information in this guide is complete, true, accurate, up-to-date, or non-misleading. Neither does TakeAir assume legal liability or responsibility for the points mentioned above.
              </p>
              
              <p>
                <strong>By downloading and using the App you have acknowledged that:</strong>
              </p>
              <ul className="list-disc ml-5">
                <li>
                  <strong>YOU HAVE READ AND UNDERSTAND THIS DISCLAIMER</strong>
                </li>
                <li>
                  <strong>YOU AGREE WITH THIS DISCLAIMER</strong>
                </li>
                <li>
                  <strong>YOU AGREE TO BE LEGALLY BOUND BY THIS DISCLAIMER, WHICH SHALL TAKE EFFECT IMMEDIATELY WHEN DOWNLOADING OR USING ONE OF SURFING MEDICAL INTERNATIONAL’S APPS</strong>
                </li>
                <li>
                  <strong>IF YOU DO NOT AGREE TO BE LEGALLY BOUND BY THIS DISCLAIMER, YOU MAY NOT DOWNLOAD AND/OR ACCESS THE APP, REGISTER THE APP UNDER YOUR NAME, OR USE THE APP.</strong>
                </li>
              </ul>
            </div>
          </Modal>


          <div className="flex flex-col gap-3 w-full justify-between bg-gray-2 p-3 items-center rounded">
            <div className="flex flex-col w-full">
              <div className="flex text-darkblue items-center justify-between gap-2 bg-red-400 p-2 px-4 rounded-t">
                Pollen Alert

                <button
                  onClick={() => setIsPollenModalOpen(true)}

                  className="flex items-center bg-gray-1 text-gray-3 p-1 rounded">
                  <FaArrowRight />
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 bg-gray-1 p-2 px-4 rounded-b">
                <p className="text-sm text-gray-3">
                  High pollen density detected in your area. It is recommended to take your medicine prescribed by your doctor.
                </p>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex text-darkblue items-center justify-between gap-2 bg-orange-300 p-2 px-4 rounded-t">
                Large temperature ranges

                <button
                  onClick={() => setIsTempModalOpen(true)}
                  className="flex items-center bg-gray-1 text-gray-3 p-1 rounded">
                  <FaArrowRight />
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 bg-gray-1 p-2 px-4 rounded-b">
                <p className="text-sm text-gray-3">
                  Due to high temperatures ranges, it is recommended to limit your travel between 12 p.m. and 4 p.m.
                </p>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex text-darkblue items-center justify-between gap-2 bg-yellow-300 p-2 px-4 rounded-t">
                High UV index

                <button
                  onClick={() => setIsUVModalOpen(true)}
                  className="flex items-center bg-gray-1 text-gray-3 p-1 rounded">
                  <FaArrowRight />
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 bg-gray-1 p-2 px-4 rounded-b">
                <p className="text-sm text-gray-3">
                  The UV index in your area has been estimated at 6. To prevent possible problems, it is recommended to cover up.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Modal showState={isPollenModalOpen} setShowState={setIsPollenModalOpen}>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-darkblue">Pollen Alert Details</h2>
            <button className="p-2 rounded bg-gray-2" onClick={() => setIsPollenModalOpen(false)}>
              <IoCloseSharp className="text-darkblue text-2xl" />
            </button>
          </div>
          <div className="mt-4 text-gray-3 space-y-2">
            <p>Pollen levels are currently very high in Strasbourg.</p>
            <ul className="list-disc ml-5">
              <li>Consider keeping windows closed during peak hours.</li>
              <li>Wear a mask when outdoors, especially in the morning.</li>
              <li>Consult your physician if symptoms worsen.</li>
            </ul>
          </div>
        </Modal>

        <Modal showState={isTempModalOpen} setShowState={setIsTempModalOpen}>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-darkblue">Temperature Advice</h2>
            <button className="p-2 rounded bg-gray-2" onClick={() => setIsTempModalOpen(false)}>
              <IoCloseSharp className="text-darkblue text-2xl" />
            </button>
          </div>
          <div className="mt-4 text-gray-3 space-y-2">
            <p>Wide temperature fluctuations can affect cardiovascular health.</p>
            <ul className="list-disc ml-5">
              <li>Stay hydrated and avoid strenuous activity during midday heat.</li>
              <li>Dress in layers to adapt to cooling evenings.</li>
              <li>Monitor weather updates and plan accordingly.</li>
            </ul>
          </div>
        </Modal>

        <Modal showState={isUVModalOpen} setShowState={setIsUVModalOpen}>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-darkblue">UV Protection Tips</h2>
            <button className="p-2 rounded bg-gray-2" onClick={() => setIsUVModalOpen(false)}>
              <IoCloseSharp className="text-darkblue text-2xl" />
            </button>
          </div>
          <div className="mt-4 text-gray-3 space-y-2">
            <p>UV index of 6 indicates high exposure risk.</p>
            <ul className="list-disc ml-5">
              <li>Apply broad-spectrum sunscreen (SPF 30+).</li>
              <li>Wear protective clothing and sunglasses.</li>
              <li>Seek shade between 11 a.m. and 3 p.m.</li>
            </ul>
          </div>
        </Modal>

        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-lg font-bold text-darkblue">
              What do you want to do ?
            </h2>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Link href="/resources" className="flex items-center justify-between bg-gray-2 p-2 px-4 rounded w-full">
              <FaRegNewspaper className="text-2xl text-darkblue" />
              <p className="text-base font-bold text-darkblue">Today Infos</p>
            </Link>

            <Link href="/map" className="flex items-center justify-between bg-gray-2 p-2 px-4 rounded w-full">
              <FiGlobe className="text-2xl text-darkblue" />
              <p className="text-base font-bold text-darkblue">Plan an outing</p>
            </Link>

            <Link href="/resources" className="flex items-center justify-between bg-gray-2 p-2 px-4 rounded w-full mb-30">
              <BsBank className="text-2xl text-darkblue" />
              <p className="text-base font-bold text-darkblue">Gouvernement Recommendation</p>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
