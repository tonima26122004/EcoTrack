import React from 'react';
import Fnav from './fnav';
import LocationInputBox from '../chat/Location_input';
const Farmer = () => {
  return (
    <div className="bg-[#C0F2CB] min-h-screen font-lato px-4">
      <Fnav />

      <div className=" rounded-2xl min-h-[85vh] w-[97%] mx-auto flex flex-col items-center justify-center bg-white relative p-4">
        <div className="flex flex-col items-center text-center w-full max-w-4xl main_content">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-lg text-[#575B58] font-lato">Welcome to EcoTalk</h1>
            <h1 className="text-2xl sm:text-5xl font-semibold font-lato">
              What Eco-Friendly Solution <br />
              Do You Need?
            </h1>
            <h1 className="text-sm sm:text-lg px-3 mt-2 text-[#575B58] font-lato">
              Choose a category to access in-depth analysis, gain valuable insights, 
              and discover innovative solutions that promote sustainability, 
              enhance environmental awareness, and support informed decision-making 
              for a greener and healthier future.
            </h1>
          </div>
          
        </div>
        <div className='absolute bottom-0 w-[97%] m-6'>
        <LocationInputBox />
        </div>
      </div>
    
    </div>
  );
};

export default Farmer;
