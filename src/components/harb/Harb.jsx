import React from 'react';
import Nav from '../../Nav';

const Ecotalk_carbon = () => {
  return (
    <div className='bg-[#C0F2CB] h-screen overflow-hidden font-lato'>
      <Nav />
      <div className='flex flex-col h-[calc(96vh-76px)] p-4'>
        {/* Form Section */}
        <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          {/* Non-scrollable Header */}
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-left">
              Fill Out Your Company Details
            </h2>
            <p className="text-gray-600 opacity-72  text-left">
              Provide your company's essential details to streamline verification and connect with potential partners in the industry
            </p>
          </div>

          {/* Scrollable Form Inputs Section */}
          <div className="px-6 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <form className="space-y-4 pb-2">
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-left">
                  Company Name:
                </label>
                <div className="border-b border-gray-300 opacity-50 ">
                  <input 
                    type="text" 
                    className="w-full bg-transparent focus:outline-none"
                    placeholder="Madical_com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-left">
                  Brand Name (if different):
                </label>
                <div className="border-b border-gray-300 opacity-50 ">
                  <input 
                    type="text" 
                    className="w-full bg-transparent focus:outline-none"
                    placeholder="medical"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-left">
                  Registration Number:
                </label>
                <div className="border-b border-gray-300 opacity-50">
                  <input 
                    type="text" 
                    className="w-full bg-transparent focus:outline-none"
                    placeholder="1234 5647 6486"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-left">
                  Head Office Address:
                </label>
                <div className="border-b border-gray-300 opacity-50">
                  <input 
                    type="text" 
                    className="w-full bg-transparent focus:outline-none"
                    placeholder="16/B XYZ,City-PINCode"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-left">
                  Phone Number:
                </label>
                <div className="border-b border-gray-300 opacity-50">
                  <input 
                    type="tel" 
                    className="w-full bg-transparent focus:outline-none"
                    placeholder="1234567891"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-left">
                  Email Address:
                </label>
                <div className="border-b border-gray-300 opacity-50">
                  <input 
                    type="email" 
                    className="w-full bg-transparent focus:outline-none"
                    placeholder="eamil@gmail.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-left">
                  Website (if any):
                </label>
                <div className="border-b border-gray-300">
                  <input 
                    type="url" 
                    className="w-full bg-transparent focus:outline-none"
                    placeholder="mediacl.com"
                  />
                </div>
              </div>
            </form>
          </div>
          
          {/* Fixed Button Container */}
          <div className="p-6 pt-0">
            <button 
              type="submit"
              className="w-[24%] bg-[#082B13] text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-200 mt-6 mx-auto block"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecotalk_carbon;