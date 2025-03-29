import React, { useState } from "react";
import { FaSearch, FaPlus, FaMapMarkerAlt } from "react-icons/fa";

const StoreLocator = () => {
  const [search, setSearch] = useState("");
  const [showLocationForm, setShowLocationForm] = useState(false);

  const stores = [
    { name: "Green Mall", phone: "+91 4841684565", address: "Samukpota, Bishnupur, Kolkata, West Bengal" },
    { name: "Green Mall", phone: "+91 4841684565", address: "Samukpota, Bishnupur, Kolkata, West Bengal" },
    { name: "Green Mall", phone: "+91 4841684565", address: "Samukpota, Bishnupur, Kolkata, West Bengal" },
    { name: "Green Mall", phone: "+91 4841684565", address: "Samukpota, Bishnupur, Kolkata, West Bengal" },
    { name: "Green Mall", phone: "+91 4841684565", address: "Samukpota, Bishnupur, Kolkata, West Bengal" },
    { name: "Green Mall", phone: "+91 4841684565", address: "Samukpota, Bishnupur, Kolkata, West Bengal" },
    { name: "Green Mall", phone: "+91 4841684565", address: "Samukpota, Bishnupur, Kolkata, West Bengal" },
  ];

  const openGoogleMaps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          window.open(mapsUrl, "_blank");
        },
        (error) => {
          alert("Unable to fetch location. Please enable location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className=" p-4 rounded-lg w-full max-w-md mx-auto ">
      <div className="flex items-center justify-between mb-4">
        <div>
          <button
            className="flex items-center gap-2 bg-white border border-[#1D3B1F] text-[#1D3B1F] px-4 py-2 rounded-full shadow-md text-sm"
            onClick={() => setShowLocationForm(true)}
          >
            <FaPlus /> Add your store location
          </button>
          <span className="text-gray-600 text-lg">or</span>
          <button
            className="flex items-center gap-2 bg-[#1D3B1F] text-white px-4 py-2 rounded-full text-sm"
            onClick={openGoogleMaps}
          >
            <FaMapMarkerAlt /> Choose your current location
          </button>
        </div>
      </div>

      {showLocationForm && (
        <div className="bg-white p-3 rounded-lg shadow-md mt-2">
          <h3 className="text-[#1D3B1F] font-medium mb-2">Enter Store Location:</h3>
          <input
            type="text"
            placeholder="Enter store address"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />
          <button
            className="mt-2 bg-[#1D3B1F] text-white px-4 py-2 rounded-md w-full"
            onClick={() => setShowLocationForm(false)}
          >
            Save Location
          </button>
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-[#1D3B1F]">Store Details:</h2>
        <div className="bg-white p-3 rounded-lg shadow-md shadow-black mt-2">
          <h3 className="mt-4 text-[#1D3B1F] font-xl">Quick Search:</h3>
          <div className="sticky top-0 bg-white z-10 border-b border-[#1D3B1F]">
            <div className="flex items-center border border-[#1D3B1F] rounded-full overflow-hidden shadow-sm px-3 py-2">
              <input
                type="text"
                placeholder="Store : Eco_store"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow bg-transparent focus:outline-none text-sm text-gray-600"
              />
              <FaSearch className="text-[#1D3B1F]" />
            </div>
          </div>

          <div className="mt-2 max-h-[300px] overflow-y-auto">
            {stores.map((store, index) => (
              <div
                key={index}
                className="border-b last:border-b-0 py-2 text-sm text-[#1D3B1F]"
              >
                <h4 className="font-semibold">{store.name}</h4>
                <p className="text-[#1D3B1F]">{store.phone}</p>
                <p className="text-gray-500 text-xs">{store.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
