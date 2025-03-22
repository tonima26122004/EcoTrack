import React, { useState } from 'react';

const Nav = () => {
  const [active, setActive] = useState('Eco-Talk');

  const buttons = ['Eco-Talk', 'Eco-Trail', 'Eco-Herb'];

  return (
    <div>
      <div className="flex justify-between px-8 py-6 items-center">

        <div>
          <img src="logo.svg" alt="Logo" />
        </div>

        <div className="relative w-[35%]">
          <ul className="flex text-2xl bg-[#F1FCF3] px-1 py-1 items-center rounded-full relative w-full">
            <div
              className="absolute top-0 bottom-0 w-1/3 rounded-full bg-black transition-all duration-300"
              style={{
                left: `${buttons.indexOf(active) * 33.33}%`
              }}
            />
            {buttons.map((btn) => (
              <button
                key={btn}
                className={`relative z-10 w-1/3 py-2 text-center ${active === btn ? 'text-white' : 'text-black'}`}
                onClick={() => setActive(btn)}
              >
                {btn}
              </button>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-6 bg-[#F1FCF3] rounded-full px-1 py-1">
          <div className='flex items-center gap-3 text-lg'>
            <img src="User.svg" alt="User" />
            <p>Incsha leff</p>
          </div>
          <div className='px-2 bg-[#C0F2CB] rounded-full flex justify-center items-center p-2 '>
            <button>
              <img src="settings.svg" alt="Settings" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Nav;
