import React, { useState } from 'react';

const AnimatedInputBox = ({ addQuery, getans, setque, que, setIsQuerySubmitted, setIsInputMoved }) => {
    const [inputValue, setInputValue] = useState('');
    const [image, setImage] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [voice, setVoice] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        if (inputValue.trim()) {
            addQuery(inputValue);
            setInputValue('');
        }
    };

    const handleVoice = () => {
        setVoice(!voice);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            getans();
            setIsQuerySubmitted(true);
            setIsInputMoved(true);
        }
    };

    return (
        <div>
            <div className="relative w-full">
                <input
                    type="text"
                    value={que}
                    onChange={(e) => setque(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter Your Query here"
                    className="px-4 py-2 border-2 font-libra outline-0 border-[#766C40] rounded-md w-full pr-36"
                />

                <div className="absolute inset-y-0 right-0 flex items-center gap-4">
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                    />
                    <label htmlFor="image-upload" className="py-1 rounded-md cursor-pointer">
                        <img className="w-6" src="upload.svg" alt="Upload" />
                    </label>
                    {!voice ? (
                        <button onClick={handleVoice} className="py-1">
                            <img className="w-4" src="Mic_2.svg" alt="Voice" />
                        </button>
                    ) : (
                        <button onClick={handleVoice} className="py-1">
                            <img className="w-4" src="Mic_1.svg" alt="Voice" />
                        </button>
                    )}
                    <button
                        onClick={() => {
                            getans();
                            setIsQuerySubmitted(true);
                            setIsInputMoved(true);
                        }}
                        className="py-2 bg-[#766C40] rounded-md px-2"
                    >
                        <img className="w-6" src="send.svg" alt="Send" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnimatedInputBox;
