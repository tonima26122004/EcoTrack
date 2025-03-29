import React, { useState } from "react";

const LocationInputBox = () => {
  const [city, setCity] = useState("Kolkata");
  const [state, setState] = useState("West Bengal");
  const [country, setCountry] = useState("India");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      console.log("Image uploaded:", file.name);
    }
  };

  const handleSend = () => {
    console.log("Send button clicked.");
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center w-full bg-[#082B13] border-2 border-[#082B13] text-white rounded-md overflow-hidden">
      {/* Label */}
      <div className="px-4 py-2 bg-[#082B13] text-white font-semibold text-sm sm:text-base">
        Select Region:
      </div>

      {/* Input Section */}
      <div className="flex flex-wrap flex-grow bg-white text-black px-2 sm:px-4 py-2 items-center">
        {/* City Dropdown */}
        <label className="mr-1 sm:mr-2 font-medium text-xs sm:text-sm">City:</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="text-green-600 font-semibold bg-transparent focus:outline-none text-xs sm:text-sm"
        >
          <option value="Kolkata">Kolkata</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
        </select>

        {/* State Dropdown */}
        <label className="ml-2 sm:ml-4 mr-1 sm:mr-2 font-medium text-xs sm:text-sm">State:</label>
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="text-green-600 font-semibold bg-transparent focus:outline-none text-xs sm:text-sm"
        >
          <option value="West Bengal">West Bengal</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Delhi">Delhi</option>
        </select>

        {/* Country Dropdown */}
        <label className="ml-2 sm:ml-4 mr-1 sm:mr-2 font-medium text-xs sm:text-sm">Country:</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="text-green-600 font-semibold bg-transparent focus:outline-none text-xs sm:text-sm"
        >
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
      </div>

      {/* Upload Button */}
      <div className="bg-[#082B13] px-2 sm:px-3 py-2 flex items-center text-xs sm:text-sm">
        <label htmlFor="upload-image" className="cursor-pointer">
          Upload your soil picture
        </label>
        <input
          type="file"
          id="upload-image"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* Upload Icon */}
      <div className="bg-white p-1 sm:p-2">
        <label htmlFor="upload-image">
          <img src="upload.svg" alt="Upload" className="w-5 sm:w-6 cursor-pointer" />
        </label>
      </div>

      {/* Send Button */}
      <button onClick={handleSend} className="bg-[#082B13] p-1 sm:p-2">
        <img src="send.svg" alt="Send" className="w-5 sm:w-6" />
      </button>
    </div>
  );
};

export default LocationInputBox;
