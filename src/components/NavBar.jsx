import React from "react";
import logo from "../assets/logo.png";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const Navbar = () => {
  return (
    <nav className="flex items-center h-[76px]   justify-between px-6 md:px-12 py-2 bg-[#051014] text-white shadow-md fixed right-0 left-0 mx-auto max-w-[90%] md:max-w-[1200px] z-50 rounded-full border-2 border-[#197686] border-solid">
      {/* Logo */}
      <div>
        <img src={logo} alt="logo" />
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-gray-400">
        <li className="hover:text-white transition cursor-pointer">Events</li>
        <li className="hover:text-white transition cursor-pointer">
          My Tickets
        </li>
        <li className="hover:text-white transition cursor-pointer">
          About Project
        </li>
      </ul>

      {/* "MY TICKETS" Button */}
      <button className="px-5 py-2 bg-white text-black rounded-md shadow-md flex items-center gap-2 hover:bg-gray-200 transition">
        MY TICKETS
        <HiOutlineArrowLongRight />
      </button>
    </nav>
  );
};

export default Navbar;
