import React, { useState } from "react";

const CommunityPeople = () => {
  const [search, setSearch] = useState("");
  const users = [
    { profilePic: "sara.svg", name: "Emily Harvester", posts: 234 },
    { profilePic: "sara.svg", name: "John Doe", posts: 187 },
    { profilePic: "sara.svg", name: "Sarah Johnson", posts: 312 },
    { profilePic: "sara.svg", name: "Michael Smith", posts: 145 },
  ];

  return (
    <div className="w-[100%] bg-white p-4 rounded-xl shadow-md">
      {/* Heading */}
      <h2 className="text-xl font-semibold mb-3">Community People</h2>
      
      {/* Search Bar */}
      <div className="relative flex  mb-4">
        <input
          type="text"
          placeholder="Eco_store"
          className="w-full p-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src="search.svg" alt="" />
      </div>

      {/* User List */}
      <div className="flex flex-col gap-3">
        {users.map((user, index) => (
          <div key={index}>
            <div className="flex items-center gap-4">
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-12 h-12 rounded-full border-2 border-gray-300"
              />
              <div className="flex justify-between w-full">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.posts} posts</p>
              </div>
            </div>
            {index !== users.length - 1 && <hr className="my-2 border-gray-300" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPeople;
