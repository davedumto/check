import React, { useMemo } from "react";

interface Capsule {
  capsule_id: string;
  status: string;
}

interface CapsuleProps {
  capsules: Capsule[];
}

const CapsuleInterface: React.FC<CapsuleProps> = ({ capsules }) => {
  const totalCapsules = useMemo(() => capsules.length, [capsules]);

  const totalActiveCapsules = useMemo(
    () => capsules.filter((capsule) => capsule.status === "active").length,
    [capsules]
  );

  const totalDestroyedCapsules = useMemo(
    () => capsules.filter((capsule) => capsule.status === "destroyed").length,
    [capsules]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 lg:gap-12 p-4">
      <div className="border rounded-lg p-6 md:p-8 lg:p-10 flex flex-col justify-center gap-4 md:gap-6 bg-slate-500 text-white shadow-lg transition-transform hover:scale-105">
        <h2 className="text-xl md:text-2xl lg:text-[2rem] font-bold">
          Total Capsules
        </h2>
        <p className="text-xl md:text-2xl lg:text-[2rem]">{totalCapsules}</p>
      </div>

      <div className="border rounded-lg p-6 md:p-8 lg:p-10 flex flex-col justify-center gap-4 md:gap-6 bg-emerald-600 text-white shadow-lg transition-transform hover:scale-105">
        <h2 className="text-xl md:text-2xl lg:text-[2rem] font-bold">
          Total Active Capsules
        </h2>
        <p className="text-xl md:text-2xl lg:text-[2rem]">
          {totalActiveCapsules}
        </p>
      </div>

      <div className="border rounded-lg p-6 md:p-8 lg:p-10 flex flex-col justify-center gap-4 md:gap-6 bg-red-600 text-white shadow-lg transition-transform hover:scale-105">
        <h2 className="text-xl md:text-2xl lg:text-[2rem] font-bold">
          Total Destroyed Capsules
        </h2>
        <p className="text-xl md:text-2xl lg:text-[2rem]">
          {totalDestroyedCapsules}
        </p>
      </div>
    </div>
  );
};

export default CapsuleInterface;
