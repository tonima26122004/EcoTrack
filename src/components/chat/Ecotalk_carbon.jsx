import React, { useState } from 'react';
import Nav from '../../Nav';
import AnimatedInputBox from './Input'; 

const Ecotalk_carbon = () => {
  const [que, setQue] = useState('');
  const [isQuerySubmitted, setIsQuerySubmitted] = useState(false);
  const [isInputMoved, setIsInputMoved] = useState(false);
  const [queries, setQueries] = useState([]);

  const addQuery = (query) => {
    setQueries([...queries, query]);
  };

  const getans = () => {
    console.log("Fetching answer for:", que);
  };

  return (
    <div className='bg-[#C0F2CB] min-h-screen font-lato px-4'>
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

          {/* Placeholder for maintaining spacing where the cards were */}
          <div className='flex flex-wrap justify-evenly w-full gap-6 mt-8 min-h-[150px]'></div>
        </div>

        {/* Input Box Section */}
        <div className="w-full max-w-[95%] absolute bottom-4 mt-6">
          <AnimatedInputBox 
            addQuery={addQuery} 
            getans={getans} 
            setque={setQue} 
            que={que} 
            setIsQuerySubmitted={setIsQuerySubmitted} 
            setIsInputMoved={setIsInputMoved} 
          />
        </div>

        
      </div>
    </div>
  );
};

export default Ecotalk_carbon;
