"use client";

import { IoBook, IoBookOutline, IoHome, IoHomeOutline, IoMap, IoMapOutline, IoPersonCircle, IoPersonCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdInfo, MdOutlineInfo } from "react-icons/md";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="absolute max-w-[600px] bottom-0 z-4000 bg-gray-2 h-15 text-white w-full">
      <div className="flex items-center w-full h-full">
        <Link
          href="./"
          className={`flex flex-col justify-center items-center w-full h-full ${
            pathname === "/" ? "bg-green-2 text-gray-2 rounded-tr" : "text-darkblue"
          }`}
        >
          {pathname === "/" ? (
            <IoHome className="text-2xl" />
          ) : (
            <IoHomeOutline className="text-2xl" />
          )}
          <span className={`text-xs ${pathname === "/" ? "font-bold" : ""}`}>Home</span>
        </Link>

        <Link
          href="./map"
          className={`flex flex-col justify-center items-center w-full h-full ${
            pathname === "/map" ? "bg-green-2 text-gray-2 rounded-t" : "text-darkblue"
          }`}
        >
          {pathname === "/map" ? (
            <IoMap className="text-2xl" />
          ) : (
            <IoMapOutline className="text-2xl" />
          )}
          <span className={`text-xs ${pathname === "/map" ? "font-bold" : ""}`}>Map</span>
        </Link>

        <Link
          href="./resources"
          className={`flex flex-col justify-center items-center w-full h-full ${
            pathname === "/resources" ? "bg-green-2 text-gray-2 rounded-t" : "text-darkblue"
          }`}
        >
          {pathname === "/resources" ? (
            <IoBook className="text-2xl" />
          ) : (
            <IoBookOutline className="text-2xl" />
          )}
          <span className={`text-xs ${pathname === "/resources" ? "font-bold" : ""}`}>Resources</span>
        </Link>

        <Link
          href="./profile"
          className={`flex flex-col justify-center items-center w-full h-full ${
            pathname === "/profile" ? "bg-green-2 text-gray-2 rounded-tl" : "text-darkblue"
          }`}
        >
          {pathname === "/profile" ? (
            <IoPersonCircle className="text-2xl" />
          ) : (
            <IoPersonCircleOutline className="text-2xl" />
          )}
          <span className={`text-xs ${pathname === "/profile" ? "font-bold" : ""}`}>Profile</span>
        </Link>

        <Link
          href="./about"
          className={`flex flex-col justify-center items-center w-full h-full ${
            pathname === "/about" ? "bg-green-2 text-gray-2 rounded-tl" : "text-darkblue"
          }`}
        >
          {pathname === "/about" ? (
            <MdInfo className="text-2xl" />
          ) : (
            <MdOutlineInfo className="text-2xl" />
          )}
          <span className={`text-xs ${pathname === "/about" ? "font-bold" : ""}`}>About</span>
        </Link>
      </div>
    </nav>
  );
}
