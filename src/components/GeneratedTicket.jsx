 
import React, { useState, useEffect } from "react";

const GeneratedTicket = ({ ticketData, onReset }) => {
  const [barcodeId, setBarcodeId] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  // Generate a unique barcode when ticket is created
  useEffect(() => {
    const generateBarcodeId = () => {
      const timestamp = Date.now().toString();
      const random = Math.random().toString(36).substr(2, 9);
      return `TCH-${timestamp.slice(-6)}-${random.toUpperCase()}`;
    };
    setBarcodeId(generateBarcodeId());
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-[#031E21]/80 backdrop-blur-sm p-6 shadow-lg border-1 border-[#0E464F] rounded-[32px]">
      {/* Header   */}
      <div className="mb-2">
        <h2 className="text-white text-xl   text-center">
          Your Ticket is Booked!
        </h2>
      </div>

      <p className="text-center text-gray-400 text-sm mb-16">
        Check your email for a copy or you can download
      </p>

      {/* Ticket Card */}
      <div className="bg-[#031E21]/10 rounded-[16px] border-1 border-[#0E464F]  mb-8">
        {/* Main Ticket Content */}
        <div className="p-6">
          {/* Event Details */}
          <div className="text-center mb-6">
            <h3 className="text-white text-xl font-medium mb-2">
              Techember Fest '25
            </h3>
            <p className="text-gray-400 text-sm">
              7-14 Sumonu road, Ikeja, Lagos
            </p>
            <p className="text-gray-400 text-sm">March 15, 2025 | 7:00 PM</p>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-[140px] h-[140px] mb-16">
              {ticketData?.avatarUrl ? (
                <img
                  src={ticketData.avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-xl border-2 border-[#24A0B5]"
                />
              ) : (
                <div className="w-full h-full bg-[#24A0B5]/20 rounded-xl border-2 border-[#24A0B5] flex items-center justify-center">
                  <span className="text-[#24A0B5] text-2xl">
                    {ticketData?.fullName?.charAt(0) || "G"}
                  </span>
                </div>
              )}
            </div>

            {/* Attendee Details */}
            <div className="w-full grid grid-cols-2 gap-4 border-1 rounded-[8px]  bg-[#08343C]/50 border-[#08343C] p-4">
              <div className="text-start">
                <p className="text-gray-400 text-sm mb-1">Enter your name</p>
                <p className="text-white">
                  {ticketData?.fullName || "Guest User"}
                </p>
              </div>
              <div className="text-start">
                <p className="text-gray-400 text-sm mb-1">Enter your email</p>
                <p className="text-white break-all">
                  {ticketData?.email || "user@email.com"}
                </p>
              </div>
              <div className="text-start">
                <p className="text-gray-400 text-sm mb-1">Ticket Type</p>
                <p className="text-white">
                  {ticketData?.ticketType?.replace(/_/g, " ") || "VIP"}
                </p>
              </div>
              <div className="text-start">
                <p className="text-gray-400 text-sm mb-1">Ticket for</p>
                <p className="text-white">1</p>
              </div>
            </div>

            {/* Special Request */}
            <div className="w-full mt-6 text-left   border-1 rounded-[8px] bg-[#08343C]/50   border-[#08343C] p-4 ">
              <p className="text-gray-400 text-sm mb-1">Special request?</p>
              <p className="text-white text-sm">
                {ticketData?.message || "Nil"}
              </p>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="w-full border-dashed border-2 rounded-xl my-8 border-[#07373F] "></div>

        {/* Barcode Section */}

        <div className="p-4  ">
          <div className="flex flex-col items-center gap-2">
            <img
              src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${barcodeId}&scale=2&height=10&includetext&textxalign=center`}
              alt="Barcode"
              className="h-12 bg-white px-4 rounded"
            />
            <p className="text-xs text-gray-400">{barcodeId}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={onReset}
          className="w-full md:w-1/2 p-3 text-gray-400 rounded-xl border border-[#24A0B5]/30 hover:border-[#24A0B5] transition"
        >
          Book Another Ticket
        </button>
        <button className="w-full md:w-1/2 p-3 bg-[#24A0B5] text-white rounded-xl hover:bg-[#1E515D] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default GeneratedTicket;
