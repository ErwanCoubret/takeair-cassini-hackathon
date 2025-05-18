"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa6";

export default function User() {

  const teamMembers = [
    { name: "Marine Angot", role: "Product Manager, Team Leader" },
    { name: "Nathan Wurpillot", role: "Data Scientist" },
    { name: "Antoine Bretzner", role: "Data Scientist" },
    { name: "Erwan Coubret", role: "Designer, Frontend developer" },
  ];

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
      <div className="flex flex-col h-full gap-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold text-darkblue">About us</h1>
        </div>

        <Image
          src="/logo.png"
          width={150}
          height={100}
          alt="Logo"
          className="mx-auto my-5"
        />

        <div className="flex flex-col gap-1">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-lg font-bold text-darkblue">Our Mission</h2>
          </div>
          <p className="text-sm text-gray-3 text-darkblue">
            We are dedicated to providing you with the <b>best quality information</b> on satellites and air data. We aim to be supported by <b>medical professionals and researchers</b>.
          </p>
        </div>

        <Link
          href={"https://github.com/ErwanCoubret/takeair-cassini-hackathon"}
          className="flex items-center gap-2 w-fit bg-gray-2 text-darkblue p-2 rounded mt-5"
        >
          <FaGithub />
          Code of the project
        </Link>

        <div className="flex flex-col gap-1">
          <div className="flex w-full justify-between items-baseline">
            <h2 className="text-lg font-bold text-darkblue">The team</h2>
          </div>
          <p className="text-sm text-gray-3 text-darkblue">
            We are a team of passionate individuals that began this project during the Cassini hackathon. We are a mix of <b>engineers, designers and product managers</b> dedicated to use space data to improve daily life of seniors.
          </p>
        </div>

        <Image
          src="/us.png"
          width={400}
          height={200}
          className="mx-auto my-5 rounded-lg"
          alt="Us"
        />

        <div className=" flex flex-col gap-2">

          <ul>
            {teamMembers.map((member) => (
              <li key={member.name} className="flex flex-col py-1">
                <span className="font-bold text-darkblue">{member.name}</span> <span className="text-gray-3">{member.role}</span>
              </li>
            ))}
          </ul>

          <div className="mb-20" />
        </div>
      </div>
    </div>
  );
}
