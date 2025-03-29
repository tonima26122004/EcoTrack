import React, { useState, useRef } from "react";
import axios from "axios";

const DiseaseDisplay = () => {
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setError("");
        setPrediction(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.data.error) {
                setError(response.data.error);
            } else {
                setPrediction(response.data);
            }
        } catch (err) {
            setError("Failed to process image. Please try again.");
            console.error("Error:", err);
        } finally {
            setLoading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const resetForm = () => {
        setPrediction(null);
        setError("");
    };

    return (
        <div className="w-full max-w-md mx-auto p-4">
            {/* <h1 className="text-xl font-bold text-[#082B13] mb-2">Plant Diagnosis Result</h1>
            <p className="text-sm text-[#575B58] mb-4">Upload an image to detect disease.</p> */}

            <div className="flex flex-col items-center gap-4">
                {error && (
                    <div className="w-full p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {prediction && (
                    <div className="w-full p-4 border border-[#082B13] rounded-md bg-[#F1FCF3]">
                        <h2 className="text-lg font-bold text-[#082B13] mb-2">Results</h2>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="font-semibold">Disease Class:</p>
                            <p>{prediction.predicted_class}</p>
                            <p className="font-semibold">Confidence:</p>
                            <p>{(prediction.confidence * 100).toFixed(2)}%</p>
                        </div>
                        <button 
                            onClick={resetForm}
                            className="mt-4 w-full py-2 bg-[#082B13] text-white rounded-md hover:bg-[#0a3e1a]"
                        >
                            Upload New Image
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiseaseDisplay;
