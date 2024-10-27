import React from "react";
import { FaBars, FaBell } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

const Navbar: React.FC = () => {
  return (
    <nav className="h-[6rem] grid grid-cols-[0.09fr_1fr] md:grid-cols-[0.13fr_2fr] border-b text-gray-500 ">
      {/* Sidebar Toggle */}
      <div className="flex justify-center items-center bg-gray-400">
        <FaBars size={20} color="#FFFFFF" />
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-end gap-16 pr-20">
        <FaBell size={20} />
        <div className="text-xl flex flex-col items-center">
          <h3>Elon Musk</h3>
          <p className="text-base">Admin</p>
        </div>
        <RxAvatar size={30} />
      </div>
    </nav>
  );
};

export default Navbar;
