import React from "react";
import { BiErrorCircle, BiCloudDownload } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import ProgressBar from "./ProgressBar";

const AttendeeDetails = ({ ticketType, onPrevStep, onNextStep }) => {
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    message: "",
    avatarUrl: "",
    ticketType,
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    const savedData = localStorage.getItem("ticketFormData");
    if (savedData) {
      setFormData((prev) => ({ ...JSON.parse(savedData), ticketType }));
    }
  }, [ticketType]);

  React.useEffect(() => {
    localStorage.setItem("ticketFormData", JSON.stringify(formData));
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // optional
    // if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            avatarUrl: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onNextStep(formData);
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#11262C]/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg  border-1 border-[#0E464F] rounded-[32px]">
      {/* Header with Progress */}
      <div className="mb-8">
        <ProgressBar step={2} title={"Attendee Details"} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Photo */}
        <div>
          <label className="block text-sm text-white mb-2">
            Upload Profile Photo
          </label>
          <div
            className=" border-[#24A0B5] bg-[#000]/20   p-8 text-center cursor-pointer hover:border-[#24A0B5] transition-all"
            onClick={() => document.getElementById("avatar-upload").click()}
          >
            {/* Modified container to use relative positioning */}
            <div className="relative w-[240px] h-[240px] mx-auto rounded-[32px] border-4 border-[#24A0B5]/50 bg-[#0E464F] overflow-hidden group">
              {formData.avatarUrl && (
                // Added group-hover:blur-sm for blur effect on hover
                <img
                  src={formData.avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover group-hover:blur-sm transition-all duration-300"
                />
              )}
              {/* Upload overlay - always visible, becomes more visible on hover */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center
                ${
                  formData.avatarUrl
                    ? "bg-[#0E464F]/0 group-hover"
                    : "bg-transparent"
                } 
                transition-all duration-300`}
              >
                <BiCloudDownload className="w-12 h-12 mb-2" />
                <p className="text-white text-sm">
                  Drag & drop or click <br /> to upload
                </p>
              </div>
            </div>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* divider */}
        <div className="w-full border border-1 rounded-xl my-8 border-[#07373F] "></div>

        {/* Name Input */}
        <div>
          <label className="block text-sm text-white mb-2">
            Enter your name
          </label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full p-3 bg-[#183238]/50 rounded-xl border border-[#24A0B5]/30 text-white focus:outline-none focus:border-[#24A0B5]"
            placeholder="Enter your name"
          />
          {errors.fullName && (
            <div className="mt-2 p-2 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-500">
              <BiErrorCircle className="w-5 h-5" />
              <p className="text-sm">{errors.fullName}</p>
            </div>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm text-white mb-2">
            Enter your email <span className="text-white-500">*</span>
          </label>
          <div className="flex items-center w-full p-3 bg-[#183238]/50 rounded-xl border border-[#24A0B5]/30 focus-within:border-[#24A0B5]">
            <MdOutlineEmail className="text-gray-400 w-5 h-5" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="hello@example.io"
              className="w-full bg-transparent text-white outline-none ml-2"
            />
          </div>
          {errors.email && (
            <div className="mt-2 p-2 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-500">
              <BiErrorCircle className="w-5 h-5" />
              <p className="text-sm">{errors.email}</p>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div>
          <label className="block text-sm text-white mb-2">
            Special request?
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows="4"
            className="w-full p-3 bg-[#183238]/50 rounded-xl border border-[#24A0B5]/30 text-white focus:outline-none focus:border-[#24A0B5]"
            placeholder="Textarea"
          />

          {/* optional */}
          {/* {errors.message && (
            <div className="mt-2 p-2 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-500">
              <BiErrorCircle className="w-5 h-5" />
              <p className="text-sm">{errors.message}</p>
            </div>
          )} */}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <button
            type="button"
            onClick={onPrevStep}
            className="w-full md:w-1/2 p-3 text-gray-400 rounded-xl border border-[#24A0B5]/30 hover:border-[#24A0B5] transition"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-1/2 p-3 bg-[#24A0B5] text-white rounded-xl hover:bg-[#1E515D] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Get My Free Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendeeDetails;
