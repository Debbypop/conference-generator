import React, { useState } from "react";
import Navbar from "./components/NavBar";

import TicketSelection from "./components/TicketSelection";
import AttendeeDetails from "./components/AtendeeDetails";
import GeneratedTicket from "./components/GeneratedTicket";

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [ticketType, setTicketType] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(null);

  const handleTicketSelection = (selectedType,quantity) => {
    setTicketType(selectedType);
    setTicketQuantity(quantity)
    setCurrentStep(2);
  };

  const handleAttendeeSubmission = (formData) => {
    setTicketData({
      ...formData,
      quantity: ticketQuantity,
    });
    setCurrentStep(3);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setTicketType(null);
    setTicketData(null);
    localStorage.removeItem("ticketFormData");
  };

  return (
    <div className="min-h-screen bg-[#0A1A1E]">
      {/* Navbar */}
      <Navbar />

      {/* Content Wrapper */}
      <main className="container mx-auto pt-24 px-4">
        <div className="flex justify-center items-center min-h-[calc(100vh-96px)]">
          {/* Conditional rendering of components */}
          {currentStep === 1 && (
            <TicketSelection onNextStep={handleTicketSelection} />
          )}
          {currentStep === 2 && (
            <AttendeeDetails
              ticketType={ticketType}
              onPrevStep={() => setCurrentStep(1)}
              onNextStep={handleAttendeeSubmission}
            />
          )}
          {currentStep === 3 && (
            <GeneratedTicket ticketData={ticketData} onReset={handleReset} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
