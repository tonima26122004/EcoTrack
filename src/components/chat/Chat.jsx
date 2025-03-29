import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Nav from '../../Nav';
import Card from './Card';

const Chat = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className='bg-[#C0F2CB]  min-h-screen font-lato px-4'>
      <Nav />

      <div className='bg-[#F1FCF3] rounded-2xl min-h-[85vh] w-[97%] mx-auto flex flex-col items-center justify-center relative p-4'>
        <div className='flex flex-col items-center text-center w-full max-w-4xl'>
          <div className='flex flex-col items-center gap-2'>
            <h1 className='text-lg text-[#575B58] font-lato'>Welcome to EcoTalk</h1>
            <h1 className='text-2xl sm:text-5xl font-semibold font-lato'>
              What Eco-Friendly Solution <br />
              Do You Need?
            </h1>
            <h1 className='text-sm sm:text-lg px-3 mt-2 text-[#575B58] font-lato'>
              Choose a category to access in-depth analysis, gain valuable insights, 
              and discover innovative solutions that promote sustainability, 
              enhance environmental awareness, and support informed decision-making 
              for a greener and healthier future.
            </h1>
          </div>

          <div className='flex flex-wrap justify-center w-full gap-6 mt-8'>
            {[
              { src: 'Carbon Footprint.svg', title: 'Carbon Footprint Analysis for Daily Life', path: '/ecotalk_carbon' },
              { src: 'Carbon Footprint (1).svg', title: 'Plant Disease Detection and Diagnosis', path: '/ecotalk_diesease'},
              // { src: 'Carbon Footprint (2).svg', title: 'Plant Identification and Classification', path: '/ecotalk_identification' }
            ].map((item, index) => (
              <button 
                key={index} 
                className='transition-transform transform hover:scale-105 duration-300'
                onClick={() => navigate(item.path)} // Navigate to the respective path
              >
                <Card imageSrc={item.src} heading={item.title} />
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Chat;
