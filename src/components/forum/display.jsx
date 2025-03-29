import React from "react";
import PostCard from "./card"; // Assuming card.jsx exports PostCard

function Display() {
  return (
    <div>
      <div className="w-full p-4 bg-white rounded-xl min-h-[85vh] max-w-7xl mx-auto flex flex-col lg:flex-row shadow-md items-start">
        <div className="flex w-full flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Region Selector (doesn't shrink) */}
          <div className="w-full lg:w-auto">
            {/* Region Selector Component (If applicable) */}
          </div>
          {/* Store Locator (takes remaining space) */}
          <div className="flex-grow w-full space-y-6 flex flex-col items-start">
            {/* Displaying Three Post Cards */}
            <PostCard
              profilePic="profile.svg"
              name="Emily Harvester"
              date="28 Mar, 2025"
              title="Supporting Local Farmers"
              content="Local farmers are the backbone of our communities. Let’s support them by choosing locally grown produce and advocating for fair policies that help them thrive."
              initialUpvotes={1500}
              initialDownvotes={1000}
            />
            <PostCard
              profilePic="profile.svg"
              name="John Doe"
              date="27 Mar, 2025"
              title="Sustainable Agriculture"
              content="Farming practices should focus on sustainability. We must reduce waste and improve soil health for future generations."
              initialUpvotes={900}
              initialDownvotes={200}
            />
            <PostCard
              profilePic="profile.svg"
              name="Anna Smith"
              date="26 Mar, 2025"
              title="Urban Farming"
              content="Urban farming is the future! More cities should encourage local food production to reduce carbon footprints."
              initialUpvotes={1200}
              initialDownvotes={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Display;
