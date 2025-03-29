import React from 'react';
import RegionSelector from './options';
import StoreLocator from './location';
import Map from './mapdisplay';

function Display() {
  return (
    <div className="w-[97%] p-6 bg-white rounded-xl h-[665px]  m-auto flex flex-col lg:flex-row shadow-md items-start">
      <div className="flex w-full flex-col lg:flex-row gap-8 ">
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
