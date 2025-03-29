import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const RegionSelector = () => {
  const [product, setProduct] = useState("Carbon-Free Products");
  const [city, setCity] = useState("Kolkata");
  const [state, setState] = useState("West Bengal");
  const [country, setCountry] = useState("India");

  return (
    <div className="p-6 sm:p-2 rounded-lg w-full max-w-3xl text-[#1D3B1F] text-base mx-auto">
      {/* Product Selector */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 text-lg">
        <span>Find nearest store for:</span>
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="bg-transparent text-green-600 underline cursor-pointer focus:outline-none text-lg"
        >
          <option>Carbon-Free Products</option>
          <option>Eco-Friendly Items</option>
        </select>
      </div>

      {/* Region Selector */}
      <div className="flex flex-col sm:flex-row items-center h-14 border border-[#1D3B1F] rounded-lg sm:rounded-full shadow-md w-full sm:w-full mx-auto">
        {/* Select Region Button */}
        <button className="bg-[#1D3B1F] text-white px-6 h-14 text-lg sm:rounded-l-full rounded-none w-52 sm:w-60">
          Select Region:
        </button>

        {/* Dropdowns Container */}
        <div className="flex flex-wrap sm:flex-nowrap items-center w-full px-4 py-3 gap-3 sm:gap-5">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full">
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <label className="text-[#1D3B1F]">City:</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="text-green-600 focus:outline-none text-lg w-full sm:w-auto"
              >
                <option className="bg-white">Kolkata</option>
                <option>Mumbai</option>
                <option>Delhi</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <label className="text-[#1D3B1F]">State:</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="text-green-600 focus:outline-none text-lg w-full sm:w-auto"
              >
                <option className="bg-white">West Bengal</option>
                <option>Maharashtra</option>
                <option>Delhi</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <label className="text-[#1D3B1F]">Country:</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="text-green-600 focus:outline-none text-lg w-full sm:w-auto"
              >
                <option className="bg-white">India</option>
                <option>USA</option>
              </select>
            </div>
          </div>

          {/* Search Icon - Now Fully Aligned & Visible */}
          <button className="p-3 text-[#1D3B1F] flex-shrink-0 bg-gray-200 rounded-full">
            <FaSearch className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegionSelector;