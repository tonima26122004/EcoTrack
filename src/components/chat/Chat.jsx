import React, { useState } from 'react';
import Nav from '../../Nav';
import Card from './Card';
import AnimatedInputBox from './Input';
import Chat_display from './Chat_display';


const Chat = () => {
  const [showChatDisplay, setShowChatDisplay] = useState(false);
  const [ans, setAns] = useState([]);

  const handleSendClick = (query) => {
    setShowChatDisplay(true);
    setAns([...ans, { user: query, bot: "Here's some helpful info!" }]);
  };

  return (
    <div className='bg-[#C0F2CB] h-screen font-lato'>
      <Nav />
      <div className='bg-[#F1FCF3] rounded-2xl h-[85%] w-[97%] mx-auto flex flex-col items-center justify-center relative'>
{/* 
        {showChatDisplay ? (
          <Chat_display ans={ans} displaybutton={true} />
        ) : ( */}
          <div className='flex flex-col items-center text-center w-full max-w-[45%] main_content'>
            <div className="flex flex-col items-center gap-2">
              <h1 className='text- text-[#575B58]'>Welcome to EcoTalk</h1>
              <h1 className='text-5xl font-semibold'>What Eco-Friendly Solution <br />
                Do You Need?</h1>
              <h1 className='text-lg px-3 mt-2 text-[#575B58]'>
                Choose a category to access in-depth analysis, gain valuable insights, 
                and discover innovative solutions that promote sustainability, 
                enhance environmental awareness, and support informed decision-making 
                for a greener and healthier future.
              </h1>
            </div>

            <div className='flex justify-center gap-6 mt-8 '>
              <Card imageSrc="https://via.placeholder.com/150" heading="Carbon Footprint " />
              <Card imageSrc="https://via.placeholder.com/150" heading="Plant-Based Remedies" />
              <Card imageSrc="https://via.placeholder.com/150" heading="Sustainable Living" />
            </div>
          </div>
        

        <div className='absolute bottom-4 w-[97%]'>
          {/* <AnimatedInputBox getans={handleSendClick} /> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
