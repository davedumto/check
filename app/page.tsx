"use client";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import SidebarLayout from "./components/SidebarLayout";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-[0.5fr_1fr] md:grid-cols-[0.13fr_2fr]">
        <div>
          <SidebarLayout />
        </div>

        <div className="px-[2rem]">
          <Landing />
        </div>
      </div>
    </div>
  );
}
