import React, { useState, useRef, useEffect } from 'react';
import Nav from '../../Nav';
import axios from 'axios';

const diseaseInfo = {
  0: {
    name: "Apple Scab",
    fertilizer: "Nitrogen-based",
    pesticide: "Captan",
    description: "A fungal disease causing dark spots on apple leaves and fruit.",
    preventiveMeasures: [
      "Use resistant varieties",
      "Improve air circulation",
      "Apply mulch",
      "Regularly monitor for symptoms",
    ],
  },
  1: {
    name: "Black Rot",
    fertilizer: "Balanced NPK",
    pesticide: "Mancozeb",
    description: "A fungal infection affecting apple trees, causing fruit rot.",
    preventiveMeasures: [
      "Prune infected branches",
      "Avoid overhead watering",
      "Apply fungicides preventively",
    ],
  },
  2: {
    name: "Cedar Apple Rust",
    fertilizer: "Organic compost",
    pesticide: "Myclobutanil",
    description: "A fungal disease causing orange spots on apple leaves.",
    preventiveMeasures: [
      "Remove nearby cedar trees",
      "Apply fungicides in early spring",
      "Monitor for early symptoms",
    ],
  },
  3: {
    name: "Healthy Apple",
    fertilizer: "General NPK",
    pesticide: "None",
    description: "No disease detected, the plant is healthy.",
    preventiveMeasures: [
      "Maintain proper watering",
      "Ensure adequate sunlight",
      "Regularly check for pests",
    ],
  },
  4: {
    name: "Healthy Blueberry",
    fertilizer: "Acidic soil mix",
    pesticide: "None",
    description: "No disease detected, the plant is healthy.",
    preventiveMeasures: [
      "Maintain soil pH between 4.5 and 5.5",
      "Ensure proper drainage",
      "Regularly prune bushes",
    ],
  },
  5: {
    name: "Cherry Powdery Mildew",
    fertilizer: "Compost tea",
    pesticide: "Sulfur",
    description: "A fungal infection causing white powdery patches on cherry leaves.",
    preventiveMeasures: [
      "Prune to improve air circulation",
      "Avoid overhead watering",
      "Apply sulfur-based fungicides",
    ],
  },
  6: {
    name: "Healthy Cherry",
    fertilizer: "Organic compost",
    pesticide: "None",
    description: "No disease detected, the plant is healthy.",
    preventiveMeasures: [
      "Maintain proper spacing between trees",
      "Regularly inspect for pests",
      "Ensure balanced fertilization",
    ],
  },
  7: {
    name: "Corn Cercospora Leaf Spot",
    fertilizer: "Nitrogen boost",
    pesticide: "Chlorothalonil",
    description: "A fungal disease causing lesions on corn leaves.",
    preventiveMeasures: [
      "Rotate crops regularly",
      "Remove infected plant debris",
      "Apply fungicides early in the season",
    ],
  },
  8: {
    name: "Corn Common Rust",
    fertilizer: "Phosphorus-rich",
    pesticide: "Azoxystrobin",
    description: "Rust-colored spots on corn leaves caused by fungi.",
    preventiveMeasures: [
      "Plant resistant varieties",
      "Avoid excessive nitrogen fertilization",
      "Apply fungicides as needed",
    ],
  },
  9: {
    name: "Corn Northern Leaf Blight",
    fertilizer: "Potassium-based",
    pesticide: "Mancozeb",
    description: "Large gray-green lesions on corn leaves due to fungi.",
    preventiveMeasures: [
      "Rotate crops with non-host plants",
      "Remove and destroy infected plant debris",
      "Apply fungicides preventively",
    ],
  },
  10: {
    name: "Healthy Corn",
    fertilizer: "Balanced NPK",
    pesticide: "None",
    description: "No disease detected, the plant is healthy.",
    preventiveMeasures: [
      "Ensure proper spacing between plants",
      "Maintain soil fertility",
      "Monitor for pests and diseases",
    ],
  },
  11: {
    name: "Grape Black Rot",
    fertilizer: "Calcium-rich",
    pesticide: "Copper fungicide",
    description: "A fungal disease causing black spots on grapevine leaves and fruit.",
    preventiveMeasures: [
      "Prune vines to improve air circulation",
      "Remove infected fruit and leaves",
      "Apply fungicides during wet weather",
    ],
  },
  12: {
    name: "Grape Esca (Black Measles)",
    fertilizer: "Iron supplement",
    pesticide: "Thiophanate-methyl",
    description: "A disease leading to brown streaks on grape leaves.",
    preventiveMeasures: [
      "Prune infected wood",
      "Avoid mechanical injuries to vines",
      "Apply fungicides preventively",
    ],
  },
  13: {
    name: "Grape Leaf Blight",
    fertilizer: "Phosphorus-rich",
    pesticide: "Dithane",
    description: "A disease causing brown, necrotic patches on grape leaves.",
    preventiveMeasures: [
      "Remove infected leaves",
      "Ensure proper vine spacing",
      "Apply fungicides as needed",
    ],
  },
  14: {
    name: "Healthy Grape",
    fertilizer: "Organic compost",
    pesticide: "None",
    description: "No disease detected, the plant is healthy.",
    preventiveMeasures: [
      "Maintain proper vine training",
      "Regularly inspect for pests",
      "Ensure balanced fertilization",
    ],
  },
  15: {
    name: "Orange Haunglongbing (Citrus Greening)",
    fertilizer: "Magnesium supplement",
    pesticide: "Imidacloprid",
    description: "A bacterial disease leading to yellowing of citrus leaves and fruit deformation.",
    preventiveMeasures: [
      "Control psyllid populations",
      "Remove infected trees",
      "Use disease-free planting material",
    ],
  },
  16: {
    name: "Peach Bacterial Spot",
    fertilizer: "Potash supplement",
    pesticide: "Copper hydroxide",
    description: "A bacterial infection causing water-soaked spots on peach leaves.",
    preventiveMeasures: [
      "Prune to improve air circulation",
      "Avoid overhead watering",
      "Apply copper-based bactericides",
    ],
  },
  17: {
    name: "Healthy Peach",
    fertilizer: "General NPK",
    pesticide: "None",
    description: "No disease detected, the plant is healthy.",
    preventiveMeasures: [
      "Maintain proper tree spacing",
      "Regularly inspect for pests",
      "Ensure balanced fertilization",
    ],
  },
  18: {
    name: "Pepper Bell Bacterial Spot",
    fertilizer: "Balanced micronutrients",
    pesticide: "Copper fungicide",
    description: "Dark, sunken spots on pepper leaves caused by bacterial infection.",
    preventiveMeasures: [
      "Use disease-free seeds",
      "Avoid overhead watering",
      "Apply copper-based bactericides",
    ],
  },
  19: {
    name: "Healthy Pepper",
    fertilizer: "General compost",
    pesticide: "None",
    description: "No disease detected, the plant is healthy.",
    preventiveMeasures: [
      "Maintain proper plant spacing",
      "Regularly inspect for pests",
      "Ensure balanced fertilization",
    ],
  },
  20: {
    name: "Potato Early Blight",
    fertilizer: "Low nitrogen, high phosphorus",
    pesticide: "Chlorothalonil",
    description: "Dark brown spots with concentric rings on potato leaves.",
    preventiveMeasures: [
      "Rotate crops regularly",
      "Remove infected plant debris",
      "Apply fungicides preventively",
    ],
  },
  21: {
    name: "Potato Late Blight",
    fertilizer: "Calcium-rich",
    pesticide: "Mancozeb",
    description: "Rapidly expanding grayish-black lesions on potato leaves.",
    preventiveMeasures: [
      "Plant resistant varieties",
      "Avoid overhead watering",
      "Apply fungicides as needed",
    ],
  },
  22: {
    name: "Healthy Potato",
    fertilizer: "Balanced organic mix",
    pesticide: "None",
    description: "No disease detected, the plant is healthy.",
    preventiveMeasures: [
      "Maintain proper soil drainage",
      "Regularly inspect for pests",
      "Ensure balanced fertilization",
    ],
  },
  23: {
    name: "Raspberry Healthy",
    fertilizer: "Acidic soil mix",
    pesticide: "None",
    description: "No disease detected, the plant is healthy.",
    preventiveMeasures: [
      "Maintain proper plant spacing",
      "Regularly prune canes",
      "Ensure balanced fertilization",
    ],
  },
  24: {
    name: "Soybean Healthy",
    fertilizer: "Balanced NPK",
    pesticide: "None",
    description: "No disease detected, the plant is healthy.",
    preventiveMeasures: [
      "Rotate crops regularly",
      "Maintain proper soil fertility",
      "Monitor for pests and diseases",
    ],
  },
  25: {
    name: "Squash Powdery Mildew",
    fertilizer: "Sulfur-based",
    pesticide: "Neem oil",
    description: "White powdery fungal patches on squash leaves.",
    preventiveMeasures: [
      "Improve air circulation",
      "Avoid overhead watering",
      "Apply sulfur-based fungicides",
    ],
  },
  26: {
    name: "Strawberry Leaf Scorch",
    fertilizer: "Iron supplement",
    pesticide: "Chlorothalonil",
    description: "Brown leaf edges and burnt-looking patches on strawberry leaves.",
    preventiveMeasures: [
      "Remove infected leaves",
      "Ensure proper plant spacing",
      "Apply fungicides as needed",
    ],
  },
  27: {
    name: "Healthy Strawberry",
    fertilizer: "Balanced micronutrients",
    pesticide: "None",
    description: "No disease detected, the plant is healthy.",
    preventiveMeasures: [
      "Maintain proper plant spacing",
      "Regularly inspect for pests",
      "Ensure balanced fertilization",
    ],
  },
  28: {
    name: "Tomato Bacterial Spot",
    fertilizer: "Calcium nitrate",
    pesticide: "Copper fungicide",
    description: "Small dark spots on tomato leaves, leading to leaf wilting.",
    preventiveMeasures: [
      "Use disease-free seeds",
      "Avoid overhead watering",
      "Apply copper-based bactericides",
    ],
  },
  29: {
    name: "Tomato Early Blight",
    fertilizer: "Low nitrogen, high phosphorus",
    pesticide: "Chlorothalonil",
    description: "Dark spots with concentric rings on tomato leaves.",
    preventiveMeasures: [
      "Rotate crops regularly",
      "Remove infected plant debris",
      "Apply fungicides preventively",
    ],
  },
  30: {
    name: "Tomato Late Blight",
    fertilizer: "Magnesium-rich",
    pesticide: "Mancozeb",
    description: "Grayish-black lesions on tomato leaves and fruit rot.",
    preventiveMeasures: [
      "Plant resistant varieties",
      "Avoid overhead watering",
      "Apply fungicides as needed",
    ],
  },
  31: {
    name: "Tomato Leaf Mold",
    fertilizer: "Organic compost",
    pesticide: "Dithane",
    description: "Yellow leaf spots that turn brown and develop mold.",
    preventiveMeasures: [
      "Improve air circulation",
      "Avoid overhead watering",
      "Apply fungicides preventively",
    ],
  },
  32: {
    name: "Tomato Septoria Leaf Spot",
    fertilizer: "Phosphorus boost",
    pesticide: "Copper fungicide",
    description: "Small brown spots with a tan center on tomato leaves.",
    preventiveMeasures: [
      "Remove infected leaves",
      "Avoid overhead watering",
      "Apply fungicides as needed",
    ],
  },
  33: {
    name: "Tomato Spider Mites",
    fertilizer: "Potassium-rich",
    pesticide: "Neem oil",
    description: "Tiny yellow specks on leaves with webbing.",
    preventiveMeasures: [
      "Maintain proper humidity levels",
      "Regularly inspect for mites",
      "Apply neem oil preventively",
    ],
  },
  34: {
    name: "Tomato Target Spot",
    fertilizer: "Balanced NPK",
    pesticide: "Chlorothalonil",
    description: "Large dark spots with yellow halos on tomato leaves.",
    preventiveMeasures: [
      "Rotate crops regularly",
      "Remove infected plant debris",
      "Apply fungicides preventively",
    ],
  },
  35: {
    name: "Tomato Mosaic Virus",
    fertilizer: "Boron supplement",
    pesticide: "None",
    description: "Mosaic-like yellow-green pattern on tomato leaves.",
    preventiveMeasures: [
      "Use disease-free seeds",
      "Control aphid populations",
      "Avoid handling plants when wet",
    ],
  },
  36: {
    name: "Tomato Yellow Leaf Curl Virus",
    fertilizer: "Iron supplement",
    pesticide: "None",
    description: "Upward curling of tomato leaves with yellowing.",
    preventiveMeasures: [
      "Control whitefly populations",
      "Remove infected plants",
      "Use resistant varieties",
    ],
  },
  37: {
    name: "Healthy Tomato",
    fertilizer: "General organic mix",
    pesticide: "None",
    description: "No disease detected, the plant is healthy.",
    preventiveMeasures: [
      "Maintain proper plant spacing",
      "Regularly inspect for pests",
      "Ensure balanced fertilization",
    ],
  },
};

const DiseaseDisplay = ({ uploadedImage, onReset }) => {
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);

    const diseaseClasses = [
        { id: 0, name: 'Apple Scab' },
        { id: 1, name: 'Apple Black Rot' },
        { id: 2, name: 'Apple Cedar Rust' },
        { id: 3, name: 'Healthy Apple' },
        { id: 4, name: 'Healthy Blueberry' },
        { id: 5, name: 'Cherry Powdery Mildew' },
        { id: 6, name: 'Healthy Cherry' },
        { id: 7, name: 'Corn Cercospora Leaf Spot' },
        { id: 8, name: 'Corn Common Rust' },
        { id: 9, name: 'Corn Northern Leaf Blight' },
        { id: 10, name: 'Healthy Corn' },
        { id: 11, name: 'Grape Black Rot' },
        { id: 12, name: 'Grape Esca (Black Measles)' },
        { id: 13, name: 'Grape Leaf Blight' },
        { id: 14, name: 'Healthy Grape' },
        { id: 15, name: 'Orange Haunglongbing (Citrus Greening)' },
        { id: 16, name: 'Peach Bacterial Spot' },
        { id: 17, name: 'Healthy Peach' },
        { id: 18, name: 'Bell Pepper Bacterial Spot' },
        { id: 19, name: 'Healthy Bell Pepper' },
        { id: 20, name: 'Potato Early Blight' },
        { id: 21, name: 'Potato Late Blight' },
        { id: 22, name: 'Healthy Potato' },
        { id: 23, name: 'Healthy Raspberry' },
        { id: 24, name: 'Healthy Soybean' },
        { id: 25, name: 'Squash Powdery Mildew' },
        { id: 26, name: 'Strawberry Leaf Scorch' },
        { id: 27, name: 'Healthy Strawberry' },
        { id: 28, name: 'Tomato Bacterial Spot' },
        { id: 29, name: 'Tomato Early Blight' },
        { id: 30, name: 'Tomato Late Blight' },
        { id: 31, name: 'Tomato Leaf Mold' },
        { id: 32, name: 'Tomato Septoria Leaf Spot' },
        { id: 33, name: 'Tomato Spider Mites' },
        { id: 34, name: 'Tomato Target Spot' },
        { id: 35, name: 'Tomato Yellow Leaf Curl Virus' },
        { id: 36, name: 'Tomato Mosaic Virus' },
        { id: 37, name: 'Healthy Tomato' }
    ];

    const handleImageUpload = async () => {
        if (!uploadedImage?.file) return;

        setLoading(true);
        setError('');
        setPrediction(null);
        setProgress(0);

        try {
            const formData = new FormData();
            formData.append('file', uploadedImage.file);

            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || 1)
                    );
                    setProgress(percentCompleted);
                }
            });

            if (response.data.error) {
                setError(response.data.error);
            } else {
                const classIndex = response.data.predicted_class;
                const disease = diseaseClasses.find(d => d.id === classIndex) || { 
                    id: classIndex, 
                    name: `Unknown Disease (Class ${classIndex})` 
                };
                
                const diseaseDetails = diseaseInfo[classIndex] || {
                    name: disease.name,
                    fertilizer: "Not specified",
                    pesticide: "Not specified",
                    description: "No additional information available",
                    preventiveMeasures: ["Consult a plant specialist"]
                };

                setPrediction({
                    diseaseId: disease.id,
                    diseaseName: disease.name,
                    confidence: (response.data.confidence * 100).toFixed(1),
                    isHealthy: disease.name.toLowerCase().includes('healthy'),
                    ...diseaseDetails
                });
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to process image. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleImageUpload();
    }, [uploadedImage]);

    return (
        <div className="w-full max-w-[95%] mx-auto p-4 relative">
            <div className="flex flex-col lg:flex-row gap-8 mt-8">
                <div className="w-full lg:w-1/2">
                    <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg border-4 border-white">
                        <img 
                            src={uploadedImage.preview} 
                            alt="Uploaded Plant" 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                    <button 
                        onClick={onReset}
                        className="mt-4 w-full bg-[#082B13] text-white px-4 py-3 rounded-lg text-lg hover:bg-[#0a3a1a] transition-all duration-300"
                    >
                        Analyze New Image
                    </button>
                </div>

                <div className="w-full lg:w-1/2">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-lg p-6">
                            <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
                                <div 
                                    className="h-full bg-[#082B13]" 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-lg font-medium text-[#082B13]">
                                Analyzing... {progress}%
                            </p>
                        </div>
                    ) : prediction ? (
                        <div className={`h-full rounded-xl shadow-lg p-6 ${
                            prediction.isHealthy ? 'bg-green-50' : 'bg-amber-50'
                        }`}>
                            <h2 className={`text-3xl font-bold mb-6 ${
                                prediction.isHealthy ? 'text-green-800' : 'text-amber-800'
                            }`}>
                                {prediction.isHealthy ? 'Healthy Plant' : 'Disease Detected'}
                            </h2>
                            
                            <div className="space-y-6">
                                <div className="p-6 rounded-lg bg-white overflow-y-auto max-h-40">
                                    <h3 className="font-semibold text-gray-600 mb-2">Disease Information</h3>
                                    <p className="text-2xl font-bold">
                                        {prediction.diseaseName}
                                    </p>
                                    <p className="mt-2 text-gray-700">{prediction.description}</p>
                                </div>
                                
                                <div className="p-6 rounded-lg bg-white">
                                    <h3 className="font-semibold text-gray-600 mb-2">Confidence Level</h3>
                                    <div className="mt-4">
                                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full ${
                                                    prediction.confidence > 70 ? 'bg-green-500' :
                                                    prediction.confidence > 40 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                                style={{ width: `${prediction.confidence}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-right mt-2 font-medium text-xl">
                                            {prediction.confidence}%
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 rounded-lg bg-white">
                                    <h3 className="font-semibold text-gray-600 mb-2">Treatment Recommendations</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <h4 className="font-medium text-gray-600">Recommended Fertilizer:</h4>
                                            <p className="text-lg font-medium">{prediction.fertilizer}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-600">Recommended Pesticide:</h4>
                                            <p className="text-lg font-medium">{prediction.pesticide}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 rounded-lg bg-white">
                                    <h3 className="font-semibold text-gray-600 mb-2">Preventive Measures</h3>
                                    <ul className="list-disc pl-5 space-y-1 mt-2">
                                        {prediction.preventiveMeasures.map((measure, index) => (
                                            <li key={index} className="text-gray-700">{measure}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-lg p-6">
                            <p>No results to display</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Ecotalk_Disease = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isQuerySubmitted, setIsQuerySubmitted] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.match('image.*')) {
            setUploadedImage({
                file: file,
                preview: URL.createObjectURL(file)
            });
            setIsQuerySubmitted(true);
        }
    };

    const handleReset = () => {
        setUploadedImage(null);
        setIsQuerySubmitted(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className='bg-[#F1FCF3] min-h-screen font-lato px-4'>
            <Nav />
            <div className='bg-white rounded-2xl min-h-[85vh] w-[97%] mx-auto flex flex-col items-center justify-center relative p-4 shadow-md'>
                {isQuerySubmitted ? (
                    <DiseaseDisplay 
                        uploadedImage={uploadedImage} 
                        onReset={handleReset}
                    />
                ) : (
                    <div className='flex flex-col items-center text-center w-full max-w-4xl'>
                        <div className="flex items-center justify-center mb-4">
                            <span className="text-4xl font-bold text-[#082B13]">Eco</span>
                            <span className="text-4xl font-bold text-[#4CAF50]">Talk</span>
                        </div>
                        <h1 className='text-2xl sm:text-4xl font-semibold text-[#082B13] mb-4'>
                            Plant Disease Detection
                        </h1>
                        <p className='text-lg px-3 mt-2 text-gray-600 mb-8'>
                            Upload an image to detect plant diseases
                        </p>
                        
                        <div className="relative w-full max-w-md">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                id="image-upload"
                                accept="image/*"
                            />
                            <label
                                htmlFor="image-upload"
                                className="block w-full p-6 border-2 border-dashed border-[#082B13] rounded-lg cursor-pointer hover:bg-gray-50 transition"
                            >
                                <div className="flex flex-col items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#082B13]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="mt-4 text-xl font-medium text-[#082B13]">
                                        Upload Plant Image
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ecotalk_Disease;