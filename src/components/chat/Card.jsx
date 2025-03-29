import React from 'react';

const Card = ({ imageSrc, heading }) => {
  return (
    <div className="w-full max-w-xs sm:w-64 p-4 bg-[#DFF9E5] rounded-lg shadow-md">      
      <div className="flex items-start gap-3">
        <img src={imageSrc} alt="Card Image" className="w-14 h-14 sm:w-16 sm:h-16 rounded-md object-cover" />
      </div>

      <div>
        <h2 className="mt-4 text-lg sm:text-xl font-semibold text-gray-800">{heading}</h2>
      </div>
    </div>
  );
};

export default Card;