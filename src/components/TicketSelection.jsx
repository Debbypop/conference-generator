import React from "react";
import ProgressBar from "./ProgressBar";

const TicketSelection = ({ onNextStep }) => {
  const [selectedType, setSelectedType] = React.useState("REGULAR_ACCESS");
  const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="w-full max-w-md mx-auto bg-[#11262C]/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-1 border-[#0E464F] rounded-[32px]">
      {/* Header with Progress */}
      <div className="mb-8">
        <ProgressBar step={1} title={"Ticket Selection"} />
      </div>

      {/* Event Details */}
      <div className="bg-[#183238]/80 p-6 rounded-[24px] border-[#07373F] border-2 mb-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-3">
          Techember Fest '25
        </h3>
        <p className="text-[#FAFAFA]/90 text-sm mb-4">
          Join us for an unforgettable experience at
          <br />
          [Event Name]! Secure your spot now.
        </p>
        <div className="flex items-center justify-center text-sm text-[#FAFAFA]/80 space-x-2">
          <span>📍 [Event Location]</span>
          <span className="mx-2">||</span>
          <span>March 15, 2025 | 7:00 PM</span>
        </div>
      </div>

      {/* divider */}
      <div className="w-full border border-1 rounded-xl my-8 border-[#07373F] "></div>

      {/* Ticket Type Selection */}
      <div className="mb-8">
        <p className="text-sm text-white mb-4">Select Ticket Type:</p>
        <div className="  border-1 rounded-[24px] border-[#07373F]  p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              type: "REGULAR_ACCESS",
              label: "REGULAR ACCESS",
              price: "Free",
              available: "20/52",
            },
            {
              type: "VIP_ACCESS",
              label: "VIP ACCESS",
              price: "$150",
              available: "20/52",
            },
            {
              type: "VVIP_ACCESS",
              label: "VVIP ACCESS",
              price: "$150",
              available: "20/52",
            },
          ].map((ticket) => (
            <button
              key={ticket.type}
              onClick={() => setSelectedType(ticket.type)}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                selectedType === ticket.type
                  ? "bg-[#12464E] border-2 border-[#24A0B5]"
                  : "bg-[#183238]/50 border-2 border-[#197686] hover:border-[#24A0B5]"
              }`}
            >
              <span className="block text-lg font-medium text-white mb-2">
                {ticket.price}
              </span>
              <span className="block text-sm text-white mb-1 ">
                {ticket.label}
              </span>
              <span className="block text-xs text-gray-400">
                {ticket.available}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Ticket Quantity */}
      <div className="mb-8">
        <label className="block text-sm text-white mb-2">
          Number of Tickets
        </label>
        <select
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-full p-3 bg-[transparent]/50 rounded-[8px] border border-[#24A0B5]/30 text-white focus:outline-none focus:border-[#24A0B5]"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i + 1} className="bg-[#183238]">
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <button className="w-full md:w-1/2 p-3 text-[#24A0B5] rounded-[8px] border border-2 border-[#24A0B5]/30 hover:border-[#24A0B5] transition">
          Cancel
        </button>
        <button
          onClick={() => onNextStep(selectedType, quantity)}
          className="w-full md:w-1/2 p-3 bg-[#24A0B5] text-white rounded-[8px] hover:bg-[#24A0B5] transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TicketSelection;
