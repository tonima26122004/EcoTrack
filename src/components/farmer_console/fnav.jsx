import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Fnav = () => {
  const [active, setActive] = useState('Eco-Talk');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const buttons = ['Eco-Talk', 'Eco-Price'];

  const handleNavigation = (btn) => {
    setActive(btn);
    setMenuOpen(false); // Close mobile menu on selection

    if (btn === 'Eco-Talk') navigate('/farmer'); // Updated route to /farmer
    else if (btn === 'Eco-Price') navigate('/market');
  };

  return (
    <div>
      <div className="flex justify-between w-[97%] mx-auto py-6 items-center md:flex-row flex-col">
        <div className="flex justify-between w-full md:w-auto items-center">
          <img src="logo.svg" alt="Logo" />
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <img src="menu-icon.svg" alt="Menu" />
          </button>
        </div>

        {/* Side Menu for Small Screens */}
        <div className={`fixed top-0 left-0 h-full w-3/4 max-w-sm bg-[#F1FCF3] p-6 shadow-lg transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden z-50`}>
          <button className="absolute top-4 right-4 p-2" onClick={() => setMenuOpen(false)}>
            <img src="close-icon.svg" alt="Close" />
          </button>
          <ul className="flex flex-col text-lg gap-4 mt-8">
            {buttons.map((btn) => (
              <button
                key={btn}
                className={`w-full py-2 text-left px-4 rounded-lg ${active === btn ? 'bg-black text-white' : 'text-black'}`}
                onClick={() => handleNavigation(btn)}
              >
                {btn}
              </button>
            ))}
          </ul>
          <div className="mt-8">
            <button className="w-full py-2 px-4 bg-[#C0F2CB] rounded-lg text-black">Settings</button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="relative hidden md:flex md:w-[50%]">
          <ul className="flex text-xl bg-[#F1FCF3] px-1 py-1 items-center rounded-full relative w-full">
            {/* Active Indicator (Sliding Black Bar) */}
            <div
              className="absolute top-0 bottom-0 w-1/2 rounded-full bg-black transition-all duration-300"
              style={{ transform: `translateX(${buttons.indexOf(active) * 100}%)` }}
            />
            {buttons.map((btn) => (
              <button
                key={btn}
                className={`relative z-10 w-1/2 py-2 text-center transition-all duration-300 ${
                  active === btn ? 'text-white' : 'text-black'
                }`}
                onClick={() => handleNavigation(btn)}
              >
                {btn}
              </button>
            ))}
          </ul>
        </div>

        {/* User Info & Settings */}
        <div className="hidden md:flex items-center gap-6 bg-[#F1FCF3] rounded-full px-1 py-1">
          <div className="flex items-center gap-3 text-lg">
            <img src="User.svg" alt="User" />
            <p>Incsha Leff</p>
          </div>
          <div className="px-2 bg-[#C0F2CB] rounded-full flex justify-center items-center p-2">
            <button>
              <img src="settings.svg" alt="Settings" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fnav;
