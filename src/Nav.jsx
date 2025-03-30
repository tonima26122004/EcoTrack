import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageDropdown from './components/Lang';

const Nav = () => {
  const [active, setActive] = useState('Eco-Talk');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const buttons = ['Eco-Talk', 'Eco-Trail', 'Eco-Forum', 'Eco-Herb', 'Eco-Chat'];

  const handleNavigation = (btn) => {
    setActive(btn);
    setMenuOpen(false);

    const routes = {
      'Eco-Talk': '/Chat',
      'Eco-Trail': '/trail',
      'Eco-Forum': '/forum',
      'Eco-Herb': '/herb',
      'Eco-Chat': '/Chatbot'
    };

    navigate(routes[btn]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-[97%] mx-auto py-6">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img src="logo.svg" alt="Logo" />
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <img src="menu-icon.svg" alt="Menu" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center flex-1 ml-4">
          <ul className="flex text-xl bg-[#F1FCF3] px-1 py-1 items-center rounded-full relative w-[70%]">
            <div
              className="absolute top-0 bottom-0 w-1/5 rounded-full bg-black transition-transform duration-300 ease-in-out"
              style={{ transform:`translateX(${buttons.indexOf(active) * 100}%)` }}
            />
            {buttons.map((btn) => (
              <button
                key={btn}
                className={`relative z-10 w-1/5 py-2 text-center transition-all duration-300 ${
                  active === btn ? 'text-white' : 'text-black'
                }`}
                onClick={() => handleNavigation(btn)}
              >
                {btn}
              </button>
            ))}
          </ul>
        </div>
        <LanguageDropdown />

        {/* User Info & Settings */}
        <div ref={dropdownRef} className="hidden md:flex items-center gap-6 bg-[#F1FCF3] rounded-full px-3 py-2 ml-4 relative">
          <div className="flex items-center gap-3 text-lg">
            <img src="User.svg" alt="User" />
            <p>Incsha Leff</p>
          </div>
          
          {/* Settings Dropdown */}
          <div className="relative">
            <button
              className="px-2 bg-[#C0F2CB] rounded-full flex justify-center items-center p-2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img src="settings.svg" alt="Settings" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 border border-gray-300">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-black">Edit</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-black">Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-sm bg-[#F1FCF3] p-6 shadow-lg transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden z-50`}
      >
        <button className="absolute top-4 right-4 p-2" onClick={() => setMenuOpen(false)}>
          <img src="close-icon.svg" alt="Close" />
        </button>
        <ul className="flex flex-col text-lg gap-4 mt-8">
          {buttons.map((btn) => (
            <button
              key={btn}
              className={`w-full py-2 text-left px-4 rounded-lg ${
                active === btn ? 'bg-black text-white' : 'text-black'
              }`}
              onClick={() => handleNavigation(btn)}
            >
              {btn}
            </button>
          ))}
        </ul>
        <div className="mt-8">
          <button className="w-full py-2 bg-[#C0F2CB] rounded-lg text-black">Settings</button>
        </div>
      </div>
    </div>
  );
};

export default Nav;