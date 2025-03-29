import React, { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";

const StoreLocator = () => {
  const [search, setSearch] = useState("");

  const stores = [
    { name: "Green Mall", phone: "+91 4841684565", address: "Samukpota, Bishnupur, Kolkata, West Bengal" },
    { name: "Green Mall", phone: "+91 4841684565", address: "Samukpota, Bishnupur, Kolkata, West Bengal" },
    { name: "Green Mall", phone: "+91 4841684565", address: "Samukpota, Bishnupur, Kolkata, West Bengal" },
    { name: "Green Mall", phone: "+91 4841684565", address: "Samukpota, Bishnupur, Kolkata, West Bengal" },
    { name: "Green Mall", phone: "+91 4841684565", address: "Samukpota, Bishnupur, Kolkata, West Bengal" },
    { name: "Green Mall", phone: "+91 4841684565", address: "Samukpota, Bishnupur, Kolkata, West Bengal" },
    { name: "Green Mall", phone: "+91 4841684565", address: "Samukpota, Bishnupur, Kolkata, West Bengal" },
  ];

  return (
    <div className="p-4 rounded-lg mt-6 w-full max-w-md mx-auto">
      <div className="mt-4">
        <div className="flex gap-4 text-xl mb-6 items-center">
          <span>or</span>
          <button className="bg-[#1D3B1F] px-5 py-1 rounded-full"> add your current location</button>
        </div>
        <h2 className="text-lg font-semibold text-[#1D3B1F]">Store Details:</h2>
        <div className="bg-white p-3 rounded-lg shadow-md shadow-black mt-2">
          <h3 className="mt-4 text-[#1D3B1F] font-xl">Quick Search:</h3>

          <div className="sticky top-0 bg-white z-10">
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

            <div className="flex items-center justify-center gap-3 my-3">
              <span className="text-[#1D3B1F]">or</span>
              <button
                className="flex items-center gap-2 bg-white border border-[#1D3B1F] text-[#1D3B1F] px-4 py-2 rounded-full shadow-md text-sm"
              >
                <FaPlus /> Add Your Current Location
              </button>
            </div>
          </div>

          <div className="mt-2 max-h-[250px] overflow-y-auto">
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
