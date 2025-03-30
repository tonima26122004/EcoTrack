import React, { useState } from 'react';

const LanguageDropdown = () => {
  const languages = [
    'English',   // English (already in English)
    'অসমীয়া',   // Assamese
    'বাংলা',     // Bengali
    'बोड़ो',      // Bodo
    'डोगरी',      // Dogri
    'ગુજરાતી',    // Gujarati
    'हिन्दी',     // Hindi
    'ಕನ್ನಡ',     // Kannada
    'कश्मीरी',    // Kashmiri
    'कोंकणी',     // Konkani
    'मैथिली',    // Maithili
    'മലയാളം',    // Malayalam
    'মণিপুরি',   // Manipuri
    'मराठी',     // Marathi
    'नेपाली',    // Nepali
    'ଓଡିଆ',     // Odia
    'ਪੰਜਾਬੀ',     // Punjabi
    'संस्कृत',    // Sanskrit
    'সান্তালি',   // Santali
    'सिन्धी',    // Sindhi
    'தமிழ்',     // Tamil
    'తెలుగు',    // Telugu
    'اردو',      // Urdu
];


  const [selectedLanguage, setSelectedLanguage] = useState('Lang: English');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (language) => {
    setSelectedLanguage(`Lang: ${language}`); 
    setIsOpen(false); 
  };

  return (
    
    <div className="relative inline-block font-libra text-left">
      <div className='flex '>
      {/* Dropdown Button */}
      
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between p-2  bg-white rounded-md shadow-sm  w-40"
      >
        <span className="mr-2">{selectedLanguage}</span> {/* Adjusted margin */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transform ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.707a1 1 0 011.414 0L10 11.586l3.293-3.879a1 1 0 111.414 1.414l-4 4.586a1 1 0 01-1.414 0l-4-4.586a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
    <div className="absolute mt-2 w-40  bg-white shadow-lg max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent border border-gray-200 rounded-md z-10 ">
        <div className="custom-scrollbar ">
            {languages.map((language, index) => (
                <div
                    key={index}
                    onClick={() => handleSelect(language)}
                    className="px-2 py-2 cursor-pointer font-libra hover:bg-gray-100 border-b border-gray-300"
                >
                    {language}
                </div>
            ))}
        </div>
    </div>
)}

</div>
    </div>
  );
};

export default LanguageDropdown;
