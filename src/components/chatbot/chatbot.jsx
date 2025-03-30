import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot } from "lucide-react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your plant disease assistant. Ask me anything about plant diseases, treatments, or prevention methods.", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);

  const commonQueries = [
    "What is Apple Scab?",
    "How to treat powdery mildew?",
    "Symptoms of leaf rust?",
    "Prevention of bacterial blight?",
    "How to identify downy mildew?",
    "Treatment for black spot disease?",
    "Causes of citrus canker?",
    "How to prevent fungal infections in plants?",
    "Best fungicides for plant diseases?",
    "Why are my plant leaves turning yellow?",
    "What are the symptoms of root rot?",
    "How to treat anthracnose in plants?",
    "What causes white spots on leaves?",
    "How to prevent blight in tomatoes?",
    "Why do plant leaves turn brown at the edges?",
    "How to treat rust fungus on plants?",
    "What are the signs of viral infections in plants?",
    "How to get rid of aphids naturally?",
    "What is the best organic pesticide for plant diseases?",
    "Why is my plant wilting despite watering?",
    "How to identify and treat bacterial wilt?",
    "What are the common fungal diseases in houseplants?",
    "How to control powdery mildew in cucumbers?",
    "What are the early signs of plant disease?",
    "How does overwatering affect plant health?",
    "How to treat botrytis (gray mold) in plants?",
    "How to protect plants from fungal infections during monsoon?",
    "What are the best practices for plant disease prevention?",
    "Why are my plant leaves curling?",
    "How to revive a plant with yellowing leaves?",
    "What are the most common citrus tree diseases?",
    "How to identify and treat clubroot in plants?",
    "What causes black spots on plant leaves?",
    "What is fire blight and how to control it?",
    "How to treat bacterial canker in fruit trees?",
    "How to prevent damping-off in seedlings?",
    "How does temperature affect plant diseases?",
    "What are the best soil treatments for preventing plant diseases?",
    "Why are my tomato plants developing yellow leaves?",
    "How to treat downy mildew on grapevines?"
];


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 1) {
      const filteredSuggestions = commonQueries.filter((query) =>
        query.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setSuggestions([]); 

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyATRMeKViaD2VWFZUcBOOV21jwKfxjMydI",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `${input} - Provide a clear, precise, and concise answer using bullet points (medium-sized and filled) in a point-wise format. 
                  Ensure each point starts on a new line and uses full sentences. Do not use asterisks in the answer. 
                  Limit the response to 50 words. If the question is not related to plant diseases, their treatments, or prevention, respond with: 
                  "Please ask only about plant diseases, treatments, or prevention."`
                }
              ]
            }
          ]
        }
      });

      const botResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, something went wrong.";
      setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error fetching response. Please try again.", isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-green-600 text-white p-4 flex items-center space-x-3">
          <Bot className="h-6 w-6" />
          <h1 className="text-lg font-semibold">Plant Disease Assistant</h1>
        </div>

        {/* Chat Messages */}
        <div className="h-[400px] p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-lg ${
                  msg.isUser ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-gray-200 rounded-lg p-3 text-gray-800">Thinking...</div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Box */}
        <div className="relative p-4 border-t flex flex-col">
          {/* Suggestions Above Input Field */}
          {suggestions.length > 0 && (
            <ul className="absolute bottom-16 w-full bg-white border border-gray-300 rounded-lg shadow-md p-2 z-20">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setInput(suggestion);
                    setSuggestions([]);
                  }}
                  className="p-2 cursor-pointer hover:bg-green-100"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center">
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about plant diseases..."
              className="flex-1 resize-none rounded-lg border border-gray-300 p-3 focus:outline-none focus:border-green-500"
              rows="1"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className={`ml-3 p-3 rounded-lg ${
                input.trim() && !loading
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;