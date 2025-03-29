import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
// import Listen from "./Listen";

const Chat_display = ({ ans, displaybutton }) => {
    const containerRef = useRef(null); 

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [ans]);

    return (
        <div
            ref={containerRef}
            className="bg-[#E4E2D6] w-[96%] mx-auto mt-4 rounded-lg p-4 h-[450px] overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent"
        >
            <div className="flex flex-col space-y-4 pb-16">
                {ans.map((msg, index) => (
                    <React.Fragment key={index}>
                        {msg.user && (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex w-full justify-end"
                            >
                                <div
                                    className="bg-[#9E9776] font-libra text-black text-lg px-4 py-3 rounded-2xl text-right max-w-[70%] break-words"
                                    style={{ fontWeight: 600 }}
                                >
                                    {msg.user}
                                </div>
                            </motion.div>
                        )}

                        {msg.bot && (
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.5 }}
                                className="flex w-full items-start space-x-3"
                            >
                                <div className="w-10 h-10 mt-4 ">
                                    <img
                                        src="Group 41.svg"
                                        alt="Bot Icon"
                                        className="w-full h-full"
                                    />
                                </div>
                                <div
                                    className="bg-[#E4E2D6] font-libra text-black text-lg px-6 py-3 rounded-2xl text-left max-w-[70%] break-words"
                                    style={{ fontWeight: 600 }}
                                >
                                    {msg.bot}
                                    {/* <div className="mt-3"><Listen ans={ans}/></div> */}
                                </div>
                                
                                
                                
                            </motion.div>
                        )}

                        {displaybutton && msg.bot && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                                className="flex flex-col items-start space-y-2"
                            >
                                <p
                                    className="text-black text-md font-bold ml-17"
                                    style={{ marginLeft: 72 }}
                                >
                                    For more information:
                                </p>
                                <button
                                    className="bg-[#9E9776] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#7F6C4F] transition-all"
                                    style={{ marginLeft: 72 }}
                                >
                                    Click here
                                </button>
                            </motion.div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            
        </div>
    );
};

export default Chat_display;

