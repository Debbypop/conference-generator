import React from "react";

const ProgressBar = ({ step, title }) => {
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold tracking-wide text-white">
          {title}
        </h1>

        <p className="text-gray-300">Step {step}/3</p>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-1">
        <div
          className="bg-[#1E515D] h-1 rounded-full transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
