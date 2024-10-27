import React, { useState } from "react";
import {
  FaMagnifyingGlass,
  FaHouse,
  FaEnvelope,
  FaRegImages,
  FaCalendarDay,
  FaGear,
} from "react-icons/fa6";
import { MdFlag, MdPieChart } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";

const icons = [
  { component: FaMagnifyingGlass, name: "search" },
  { component: FaHouse, name: "home" },
  { component: MdFlag, name: "flag" },
  { component: MdPieChart, name: "chart" },
  { component: FaEnvelope, name: "envelope" },
  { component: FaRegImages, name: "images" },
  { component: FaCalendarDay, name: "calendar" },
  { component: IoPeopleSharp, name: "people" },
  { component: FaGear, name: "settings" },
];

const SidebarLayout: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState("home");

  return (
    <div className="sticky top-5rem flex flex-col items-center bg-slate-500 text-white  h-full pt-8 gap-[3rem]">
      {icons.map(({ component: Icon, name }) => (
        <div
          key={name}
          onClick={() => setActiveIcon(name)}
          className={`p-3 rounded-md transition-colors duration-200 ${
            activeIcon === name
              ? "bg-white text-slate-500"
              : "hover:bg-slate-400"
          }`}
        >
          <Icon size={24} />
        </div>
      ))}
    </div>
  );
};

export default SidebarLayout;
