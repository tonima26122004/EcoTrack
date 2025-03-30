// import React, { useState, useRef } from 'react';
// import axios from 'axios';

// const DiseaseDisplay = () => {
//     const [diagnosis, setDiagnosis] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [previewImage, setPreviewImage] = useState(null);
//     const fileInputRef = useRef(null);

//     const analyzePlantImage = async (e) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         // Validate image file
//         if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
//             setError('Please upload a valid image (JPEG, JPG, or PNG)');
//             return;
//         }

//         if (file.size > 5 * 1024 * 1024) {
//             setError('Image size exceeds 5MB limit');
//             return;
//         }

//         setIsLoading(true);
//         setError('');
//         setDiagnosis(null);

//         // Create image preview
//         const reader = new FileReader();
//         reader.onload = (e) => setPreviewImage(e.target.result);
//         reader.readAsDataURL(file);

//         const formData = new FormData();
//         formData.append('plant_image', file);

//         try {
//             const response = await axios.post(
//                 'http://localhost:5000/predict',
//                 formData,
//                 {
//                     headers: { 'Content-Type': 'multipart/form-data' },
//                     timeout: 20000
//                 }
//             );

//             if (response.data.error) {
//                 throw new Error(response.data.error);
//             }

//             setDiagnosis({
//                 diseaseName: response.data.predicted_class || 'Unknown Disease',
//                 confidence: response.data.confidence 
//                     ? `${(parseFloat(response.data.confidence) * 100).toFixed(2)}%` 
//                     : 'N/A',
//                 isHealthy: response.data.predicted_class?.toLowerCase().includes('healthy')
//             });

//         } catch (err) {
//             console.error('Diagnosis error:', err);
//             setError(err.response?.data?.error || err.message || 'Analysis failed. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const resetAnalysis = () => {
//         setDiagnosis(null);
//         setError('');
//         setPreviewImage(null);
//         if (fileInputRef.current) fileInputRef.current.value = '';
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//             <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
//                 <div className="p-6">
//                     <div className="flex items-center justify-center gap-2 mb-6">
//                         <span className="text-3xl">🌿</span>
//                         <h1 className="text-2xl font-bold text-green-800">Plant Health Analyzer</h1>
//                     </div>
                    
//                     {!diagnosis && !isLoading && (
//                         <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 transition-colors hover:border-green-400 hover:bg-green-50 cursor-pointer">
//                             <input
//                                 type="file"
//                                 id="plant-image-upload"
//                                 ref={fileInputRef}
//                                 accept=".jpg,.jpeg,.png"
//                                 onChange={analyzePlantImage}
//                                 className="hidden"
//                             />
//                             <label htmlFor="plant-image-upload" className="flex flex-col items-center justify-center">
//                                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
//                                     <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                     </svg>
//                                 </div>
//                                 <p className="text-lg font-medium text-green-700 mb-1">Upload Plant Image</p>
//                                 <p className="text-sm text-gray-500">Supports JPG, PNG (Max 5MB)</p>
//                             </label>
//                         </div>
//                     )}

//                     {isLoading && (
//                         <div className="py-10 flex flex-col items-center justify-center">
//                             <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
//                             <p className="text-gray-600">Analyzing plant health...</p>
//                         </div>
//                     )}

//                     {error && (
//                         <div className="mt-4">
//                             <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
//                                 <div className="flex items-center">
//                                     <span className="text-red-500 mr-2">⚠️</span>
//                                     <p className="text-red-700">{error}</p>
//                                 </div>
//                             </div>
//                             <button 
//                                 onClick={resetAnalysis}
//                                 className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
//                             >
//                                 Try Again
//                             </button>
//                         </div>
//                     )}

//                     {previewImage && (
//                         <div className="mt-6 flex justify-center">
//                             <img 
//                                 src={previewImage} 
//                                 alt="Uploaded plant" 
//                                 className="max-h-64 rounded-lg shadow-md"
//                             />
//                         </div>
//                     )}

//                     {diagnosis && (
//                         <div className={`mt-6 p-5 rounded-lg ${diagnosis.isHealthy ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
//                             <h2 className={`text-xl font-bold mb-4 text-center ${diagnosis.isHealthy ? 'text-green-700' : 'text-red-700'}`}>
//                                 {diagnosis.isHealthy ? '🌱 Healthy Plant!' : '⚠️ Disease Detected'}
//                             </h2>
                            
//                             <div className="bg-white p-4 rounded-md mb-4">
//                                 <div className="flex justify-between py-2 border-b border-gray-100">
//                                     <span className="text-gray-600 font-medium">Diagnosis:</span>
//                                     <span className={`font-semibold ${diagnosis.isHealthy ? 'text-green-600' : 'text-red-600'}`}>
//                                         {diagnosis.diseaseName}
//                                     </span>
//                                 </div>
//                                 <div className="flex justify-between py-2">
//                                     <span className="text-gray-600 font-medium">Confidence:</span>
//                                     <span className="font-semibold text-blue-600">{diagnosis.confidence}</span>
//                                 </div>
//                             </div>

//                             {!diagnosis.isHealthy && (
//                                 <div className="bg-white p-3 rounded-md mb-4 text-sm text-gray-700">
//                                     <p>💡 Recommendation: Isolate the plant and consider organic fungicides.</p>
//                                 </div>
//                             )}

//                             <button 
//                                 onClick={resetAnalysis}
//                                 className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
//                             >
//                                 Analyze Another Plant
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DiseaseDisplay;