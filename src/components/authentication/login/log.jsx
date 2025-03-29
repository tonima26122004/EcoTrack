import React from 'react';

function Log() {
  return (
    <div className="flex">
      {/* FarmMaster Section */}
      <div className="ml-20">
        <img src="farmer.svg" alt="Logo" className="ml-60" />
        <div className="flex ml-36 text-2xl text-center mt-2 font-semibold">
          I'm here to cultivate growth <br /> as a FarmMaster.
        </div>
        <div className="ml-36 text-center text-lg">Guide farming for smooth growth.</div>
        
        {/* FarmMaster Login */}
        <a href="/flogin">
          <button className="bg-[#082B13] cursor-pointer text-white p-3 w-32 rounded-lg ml-52 mt-4 text-xl">
            Login
          </button>
        </a>

        <div className="ml-48 mt-4">Don't have an account?</div>

        {/* FarmMaster Sign Up */}
        <a href="/fregister">
          <button className="ml-60 text-xl text-[#2BA84A] cursor-pointer underline">Sign Up</button>
        </a>
      </div>

      {/* Divider */}
      <div className="border border-gray-600 h-96 ml-72"></div>

      {/* LifeGrower Section */}
      <div className="ml-30">
        <img src="medicine.svg" alt="Logo" className="ml-60" />
        <div className="flex ml-36 text-2xl text-center mt-2 font-semibold">
          I'm here to nurture nature <br /> as a LifeGrower.
        </div>
        <div className="ml-36 text-center text-lg">Nurture plants for healthy growth.</div>
        
        {/* LifeGrower Login */}
        <a href="/ulogin">
          <button className="bg-[#082B13] cursor-pointer text-white p-3 w-32 rounded-lg ml-52 mt-4 text-xl">
            Login
          </button>
        </a>

        <div className="ml-48 mt-4">Don't have an account?</div>

        {/* LifeGrower Sign Up */}
        <a href="/uregister">
          <button className="ml-60 text-xl text-[#2BA84A] cursor-pointer underline">Sign Up</button>
        </a>
      </div>
    </div>
  );
}

export default Log;
