import React from 'react';
import RegionSelector from './options';
import StoreLocator from './location';
import Map from '../chat/mapdisplay';
function Display() {
  return (
    <div className="w-full p-4 bg-white rounded-xl min-h-[85vh] max-w-7xl mx-auto flex flex-col lg:flex-row shadow-md items-start">
      <div className="flex w-full flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Region Selector (doesn't shrink) */}
        <div className="w-full lg:w-auto">
          <RegionSelector />
          <Map/>
        </div>
        {/* Store Locator (takes remaining space) */}
        <div className="flex-grow w-full">
          <StoreLocator />
        </div>
      </div>
    </div>
  );
}

export default Display;
