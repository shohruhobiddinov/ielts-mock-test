import React from "react";
import { useNavigate } from "react-router-dom";

function EndPage() {
    const navigate = useNavigate();
    const studentName = localStorage.getItem("studentName") || "Candidate";

    return (
        <div
            className="flex items-center justify-center flex-col h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
                {/* Title */}
                <h1 className="text-3xl font-bold mb-6 text-purple-700">Test Completed!</h1>

                {/* Message */}
                <p className="text-gray-600 mb-8">
                    Thank you, <span className="font-semibold">{studentName}</span>, for completing the IELTS mock test.
                </p>

                {/* Optional message about submission */}
                <p className="text-gray-500 mb-6">
                    Your answers have been saved.
                </p>

                {/* Footer */}
                <p className="mt-6 text-gray-500 text-sm">
                    We hope you found this practice helpful. Good luck with your IELTS preparation!
                </p>

            </div>

            <p className="text-center mt-6 text-gray-500 text-sm">
                This mock platform is created by <br/> Shohruh Obiddinov
            </p>
        </div>
    );
}

export default EndPage;
