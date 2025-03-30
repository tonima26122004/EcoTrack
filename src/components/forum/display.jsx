import React, { useState } from "react";
import PostCard from "./card"; // Assuming card.jsx exports PostCard
import CommunityPeople from "./people";

function Display() {
  const [posts, setPosts] = useState([
    {
      profilePic: "profile.svg",
      name: "Anna Smith",
      date: "26 Mar, 2025",
      title: "Urban Farming",
      content: "Urban farming is the future! More cities should encourage local food production to reduce carbon footprints.",
      initialUpvotes: 1200,
      initialDownvotes: 300,
    },
  ]);

  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() !== "") {
      const newPost = {
        profilePic: "profile.svg",
        name: "User",
        date: new Date().toLocaleDateString(),
        title: "New Post",
        content: text,
        initialUpvotes: 0,
        initialDownvotes: 0,
      };
      setPosts([newPost, ...posts]);
      setText("");
    }
  };

  return (
    <div className="w-[95%] p-4 bg-white rounded-xl max-h-[85vh] mx-auto flex flex-col lg:flex-row shadow-md items-start overflow-y-auto">
      <div className="w-[60%] flex flex-col gap-2">
        <h1 className="text-3xl mb-2">Community Posts:</h1>
        <hr className="max-w-[30%] mb-3" />
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>

      <div className="flex flex-col gap-3 justify-between w-[40%] h-[80vh]">
        <div className="h-[54%] w-full overflow-y-auto">
          <CommunityPeople />
        </div>

        <div className="h-[44%] w-full flex flex-col gap-2 items-center">
          <div className="border rounded-2xl px-6 mt-2 py-3">
            <h1>Host Your Own Eco Workshop</h1> 
            <button className="bg-[#082B13] px-6 text-white flex py-1  rounded-full mx-auto">
              <span>Setup now</span>
            </button>
          </div>
          
          <div className="w-full h-full">
            <div className="w-full rounded-lg h-full mt-4">
              <div className="relative">
                <textarea
                  className="w-full h-36 p-2 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#082B13] pr-16"
                  placeholder="Write your message here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>

                <div className="absolute bottom-2 left-2 flex gap-2">
                  <button className="p-1 bg-gray-200 rounded-md hover:bg-gray-300">
                    <img src="upload.svg" alt="Upload" className="w-5" />
                  </button>
                  <button className="p-1 bg-gray-200 rounded-md hover:bg-gray-300">
                    <img src="capture.svg" alt="Capture" className="w-5" />
                  </button>
                </div>

                <div className="absolute bottom-2 right-2">
                  <button
                    className="p-1 bg-[#082B13] text-white rounded-md hover:bg-[#06421A]"
                    onClick={handleSend}
                  >
                    <img src="send.svg" alt="Send" className="w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Display;
