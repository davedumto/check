import React from "react";
import { Capsule } from "../types";
import { format } from "date-fns";

interface CapsuleDetailsModalProps {
  capsule: Capsule | null;
  isOpen: boolean;
  onClose: () => void;
}

const CapsuleDetailsModal: React.FC<CapsuleDetailsModalProps> = ({
  capsule,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !capsule) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-3 text-center">
            {capsule.capsule_serial}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            X
          </button>
        </div>
        <div className="text-left text-xl space-y-5">
          <p>
            <span className="font-semibold mr-2">Type:</span> {capsule.type}
          </p>
          <p>
            <span className="font-semibold mr-2">Status:</span> {capsule.status}
          </p>
          <p>
            <span className="font-semibold mr-1">Original Launch:</span>{" "}
            {capsule.original_launch
              ? format(
                  new Date(capsule.original_launch),
                  "do MMMM yyyy: h:mm a"
                )
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold mr-2">Landings:</span>{" "}
            {capsule.landings}
          </p>
          <p>
            <span className="font-semibold mr-2">Details:</span>{" "}
            {capsule.details || "No details available"}
          </p>
          <p>
            <span className="font-semibold mr-2">Missions:</span>{" "}
            {capsule.missions.length > 0
              ? capsule.missions.map((mission, idx) => (
                  <span key={idx} className="inline-block">
                    {mission.name} ({mission.flight})
                    {idx < capsule.missions.length - 1 && ", "}
                  </span>
                ))
              : "No missions available"}
          </p>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xl bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CapsuleDetailsModal;
