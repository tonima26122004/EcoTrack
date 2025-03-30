import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const PostCard = ({ profilePic, name, date, title, content, initialUpvotes, initialDownvotes }) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [comment, setComment] = useState("");

  return (
    <div className="bg-green-50 p-4 rounded-lg w-full  shadow-md max-w-3xl border border-green-100">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <img
          src={profilePic}
          alt={name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold text-sm sm:text-base">{name}</p>
          <p className="text-gray-500 text-xs sm:text-sm">{date}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mt-2">
        <h3 className="font-bold text-green-900 text-sm sm:text-lg">{title}</h3>
        <p className="text-gray-700 text-xs sm:text-sm">{content}</p>
      </div>

      {/* Reactions (Upvotes & Downvotes) */}
      <div className="flex items-center space-x-4 mt-3 text-green-900">
        <button
          className="flex items-center space-x-1 text-green-600"
          onClick={() => setUpvotes(upvotes + 1)}
        >
          <FaArrowUp />
          <span>{upvotes.toLocaleString()}</span>
        </button>
        <button
          className="flex items-center space-x-1 text-gray-500"
          onClick={() => setDownvotes(downvotes + 1)}
        >
          <FaArrowDown />
          <span>{downvotes.toLocaleString()}</span>
        </button>

        <div className="mt-3 flex w-full items-center border border-green-300 rounded-full px-2 py-1 bg-white">
        <input
          type="text"
          className="flex-grow outline-none  text-xs sm:text-sm p-2 bg-transparent"
          placeholder="Add your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="bg-green-700 text-white p-2 w-8 sm:w-10 rounded-full hover:bg-green-800">
          ➤
        </button>
      </div>  
      </div>

      {/* Comment Box */}
      
    </div>
  );
};

export default PostCard;
