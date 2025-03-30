import React from 'react';

function Landing() {
  return (
    <div className="bg-gradient-to-br from-[#C0F2CB] to-transparent w-full">  
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
        <button className="bg-[#082B13] text-white text-xl h-12 rounded-3xl px-6 flex cursor-pointer gap-2 items-center justify-center">
          Explore <img src="pointer.svg" alt="" className="w-8" />
        </button>
      </div>
     <div>
        <img src="landingfull.svg" alt="" className='ml-80 -mt-4' />
     </div>
    </div>
  );
}

export default Landing;
