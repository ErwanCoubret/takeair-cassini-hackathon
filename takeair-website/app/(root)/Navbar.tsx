"use client";

import { IoBook, IoBookOutline, IoHome, IoHomeOutline, IoMap, IoMapOutline, IoPersonCircle, IoPersonCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 z-4000 bg-gray-2 h-15 text-white w-full">
      <div className="flex items-center w-full h-full">
        <Link href="./" className={`flex justify-center items-center w-full h-full ${pathname === "/" ? "bg-darkblue text-gray-2 rounded-tr" : "text-darkblue"}`}>
          {pathname === "/" ? <IoHome className="text-2xl" /> : <IoHomeOutline className="text-2xl" />}
        </Link>

        <Link href="./map" className={`flex justify-center items-center w-full h-full ${pathname === "/map" ? "bg-darkblue text-gray-2 rounded-t" : "text-darkblue"}`}>
          {pathname === "/map" ? <IoMap className="text-2xl" /> : <IoMapOutline className="text-2xl" />}
        </Link>

        <Link href="./ressources" className={`flex justify-center items-center w-full h-full ${pathname === "/ressources" ? "bg-darkblue text-gray-2 rounded-t" : "text-darkblue"}`}>
          {pathname === "/ressources" ? <IoBook className="text-2xl" /> : <IoBookOutline className="text-2xl" />}
        </Link>

        <Link href="./profile" className={`flex justify-center items-center w-full h-full ${pathname === "/profile" ? "bg-darkblue text-gray-2 rounded-tl" : "text-darkblue"}`}>
          {pathname === "/profile" ? <IoPersonCircle className="text-2xl" /> : <IoPersonCircleOutline className="text-2xl" />}
        </Link>
      </div>
    </nav>
  );
}
