import React, { useState } from "react";
import RegionSelector from "./options";
import StoreLocator from "./location";

function Display() {
  // 🔹 State to hold the selected location
  const [selectedLocation, setSelectedLocation] = useState({
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
  });

  return (
    <div className="w-[97%] p-6 bg-white rounded-xl h-[85vh] m-auto flex flex-col lg:flex-row shadow-md items-start">
      <div className="flex w-full flex-col lg:flex-row gap-8">
        {/* Region Selector - Updates selected location */}
        <div className="w-full lg:w-auto">
          <RegionSelector setSelectedLocation={setSelectedLocation} />
        </div>

        {/* Store Locator - Displays stores based on selected location */}
        
      </div>
    </div>
  );
}

export default Display;
