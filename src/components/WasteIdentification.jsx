import React, { useState, useRef, useEffect } from 'react';

const WasteIdentification = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
            setPrediction(null);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
            setPrediction(null);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const identifyWaste = async () => {
        if (!image) {
            alert('Please select an image first.');
            return;
        }

        setIsLoading(true);
        setPrediction(null);

        try {
            const response = await callGeminiAPI(image);
            setPrediction(response);
        } catch (error) {
            console.error('Error identifying waste:', error);
            setPrediction({
                label: 'Error',
                confidence: 0,
                instructions: 'An error occurred while processing the image.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const callGeminiAPI = async (imageFile) => {
        const systemInstructions = `You are a helpful assistant specialized in identifying waste items from images. You have access to detailed information about waste management processes, metrics, and best practices. Your goal is to provide accurate and informative answers to user queries related to solid waste management. When responding, use markdown formatting for bolding (using **bold text**), spacing, and lists (using * list item).`;
        const prompt = `${systemInstructions}\n\nIdentify the waste item in the image and provide instructions on how to dispose of it.`;

        try {
            const base64Image = await convertImageToBase64(imageFile);

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    { text: prompt },
                                    {
                                        inline_data: {
                                            mime_type: imageFile.type,
                                            data: base64Image,
                                        },
                                    },
                                ],
                            },
                        ],
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Gemini API Error:', errorData);
                throw new Error(`Gemini API request failed with status ${response.status}`);
            }

            const data = await response.json();
            console.log('Gemini API Response:', data);

            if (
                data.candidates &&
                data.candidates.length > 0 &&
                data.candidates[0].content &&
                data.candidates[0].content.parts &&
                data.candidates[0].content.parts.length > 0
            ) {
                const responseText = data.candidates[0].content.parts[0].text;
                return {
                    label: 'Prediction',
                    confidence: 1,
                    instructions: responseText,
                };
            } else {
                return {
                    label: 'Unknown',
                    confidence: 0,
                    instructions: "I'm sorry, I couldn't identify the waste item in the image.",
                };
            }
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            throw error;
        }
    };

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        if (image) {
            identifyWaste();
        }
    }, [image]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Waste Item Identification</h1>
            <p className="text-gray-600 mb-4">
                Upload an image of a waste item to identify it and learn how to dispose of it properly.
            </p>

            <div
                className="border-2 border-dashed border-gray-400 rounded-lg p-6 mb-4 cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleButtonClick}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    ref={fileInputRef}
                />
                {imageUrl ? (
                    <img src={imageUrl} alt="Uploaded" className="max-w-full max-h-64 mx-auto" />
                ) : (
                    <p className="text-gray-600 text-center">
                        Drag and drop an image here, or click to select an image.
                    </p>
                )}
            </div>

            {isLoading && (
                <div className="text-center mb-4">
                    <p className="text-gray-600">Identifying waste...</p>
                </div>
            )}

            {prediction && (
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Prediction:</h2>
                    <p className="text-gray-700">
                        <b>Label:</b> {prediction.label}
                    </p>
                    <p className="text-gray-700">
                        <b>Confidence:</b> {(prediction.confidence * 100).toFixed(2)}%
                    </p>
                    <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: formatGeminiResponse(prediction.instructions) }} />
                </div>
            )}
        </div>
    );
};

const formatGeminiResponse = (text) => {
    // Convert markdown-like bold to <b> tags
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Convert markdown-like lists to <ul> and <li> tags with proper indentation
    formattedText = formattedText.replace(
        /(^|\n)\s*\* (.*?)(?=(\n\s*\*|$))/g,
        (match, p1, p2) => {
            return `${p1}  <li>${p2}</li>`; // Added indentation here
        }
    );

    // Wrap the list items in a <ul> tag with proper indentation
    formattedText = formattedText.replace(
        /(  <li>.*?<\/li>(\n|$))+/g, // Adjusted regex to match indented <li> tags
        (match) => {
            return `<ul>\n${match}\n</ul>`; // Added indentation and newlines here
        }
    );

    // Wrap each line in a <p> tag if not already in a list
    formattedText = formattedText
        .split('\n')
        .map((line, index) => {
            if (line.trim().length > 0 && !line.trim().startsWith("<li")) {
                return `<p key=${index}>${line}</p>`;
            }
            return line;
        })
        .join('\n'); // Added newline here

    return formattedText;
};

export default WasteIdentification;
