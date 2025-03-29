import React from 'react';

const Card = ({ imageSrc, heading }) => {
  return (
    <div className="w-full font-lato text-[#575B58] max-w-xs sm:w-64 p-4 bg-[#DFF9E5] rounded-lg shadow-md">      
      <div className="flex items-start gap-3">
        <img src={imageSrc} alt="Card Image" className="w-8 h-8 sm:w-10 sm:h-10 rounded-md object-cover" />
      </div>

      <div className='flex items-start text-start'>
        <h2 className="mt-4 text-sm sm:text-xl font-medium text-gray-800">{heading}</h2>
      </div>
    </div>
  );
};

export default Card;