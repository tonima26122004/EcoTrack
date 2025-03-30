import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="w-screen relative bg-[radial-gradient(ellipse_at_center,_#C0F2CB_10%,_#A0D8B3_40%,_transparent_90%)]">
      <div className="h-full w-full flex flex-wrap p-6">
        {/* Logo Section */}
        <div className="w-full lg:w-1/3 flex">
          <img src="logo.svg" alt="Logo" className="m-4 w-32 sm:w-40 md:w-32" />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center items-center w-full text-center mt-20 text-6xl">
          <div>Join us to empower <span className="text-[#2BA84A]">sustainable farming</span></div>
          <div>and <span className="text-[#2BA84A]">smart agriculture</span>.</div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="flex items-center justify-between px-40 py-8">
        <div className="text-lg text-[#082B13]">
          Smart crop, plant, and market <br /> analysis using AI
        </div>
        <button 
          className="bg-[#082B13] text-white text-xl h-12 rounded-3xl px-6 flex cursor-pointer gap-2 items-center justify-center hover:bg-[#C0F2CB] hover:text-[#2BA84A]"
          onClick={() => navigate('/login')} // Navigate to /login
        >
          Explore <img src="pointer.svg" alt="" className="w-8" />
        </button>
      </div>

      {/* Main Image */}
      <div>
        <img src="landingfull.svg" alt="" className="ml-80 -mt-4" />
      </div>

      {/* Randomly Placed Small Images */}
      <img src="water.svg" alt="Rose" className="absolute top-20 left-20 w-6 opacity-80" />
      <img src="rose.svg" alt="Water" className="absolute top-40 right-32 w-8 opacity-80" />
      <img src="rose.svg" alt="Rose" className="absolute bottom-20 left-40 w-5 opacity-80" />
      <img src="water.svg" alt="Water" className="absolute bottom-10 right-10 w-6 opacity-80" />
      <img src="rose.svg" alt="Rose" className="absolute top-80 left-1/2 w-7 opacity-80" />
      <div className='h-12'></div>
    </div>
  );
}

export default Landing;
