import React from "react";

export default function CulturalCard({ img }) {
  return (
    <div className="w-full  border-2 border-gray-900 overflow-hidden rounded-2xl">
      <img className="" src={`/CULTURAL/${img}.jpg`} alt={`${img}`} />
    </div>
  );
}
