import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StartPage() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleStart = () => {
        if (name.trim() === "") {
            alert("Please enter your name before starting the test.");
            return;
        }
        localStorage.setItem("studentName", name.trim());
        navigate("/listening");
    };

    return (
        <div
            className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
                {/* Title */}
                <h1 className="text-3xl font-bold mb-6 text-purple-700">IELTS Mock Test</h1>

                {/* Description */}
                <p className="text-gray-600 mb-8">
                    Enter your name and start your full IELTS mock test experience.
                </p>

                {/* Input */}
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-6 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />

                {/* Start Button */}
                <button
                    onClick={handleStart}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition duration-200"
                >
                    Start Test
                </button>

                {/* Footer */}
                <p className="mt-6 text-gray-500 text-sm">
                    Make sure you are ready. The timer will start immediately after clicking Start.
                </p>
            </div>
        </div>
    );
}

export default StartPage;





