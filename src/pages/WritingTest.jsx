import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sendTelegramMessage } from "../utils/telegramApi";
import task1Image from "../images/photo_2025-11-09_03-30-42.jpg";

function WritingTest() {
    const navigate = useNavigate();
    const studentName = localStorage.getItem("studentName") || "Anonymous";

    const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes
    // const [timeLeft, setTimeLeft] = useState(1 * 30);
    const [currentTask, setCurrentTask] = useState(1); // 1 or 2
    const [task1, setTask1] = useState(localStorage.getItem("writingTask1") || "");
    const [task2, setTask2] = useState(localStorage.getItem("writingTask2") || "");

    const task1Ref = useRef(null);
    const task2Ref = useRef(null);

    const finishedRef = useRef(false);


    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleFinish();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format MM:SS
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // Word count helper
    const wordCount = (text) => (text.trim() === "" ? 0 : text.trim().split(/\s+/).length);

    // Finish test and send data to Telegram
    const handleFinish = async () => {
        if (finishedRef.current) return; // ✅ prevent duplicate send
        finishedRef.current = true;

        const latestTask1 = task1Ref.current?.value || task1;
        const latestTask2 = task2Ref.current?.value || task2;

        localStorage.setItem("writingTask1", latestTask1);
        localStorage.setItem("writingTask2", latestTask2);

        const listeningAnswers = JSON.parse(localStorage.getItem("listeningAnswers") || "{}");
        const readingAnswers = JSON.parse(localStorage.getItem("readingAnswers") || "{}");

        let message = `<b>IELTS Mock Test Completed</b>\nCandidate: ${studentName}\n\n`;

        message += `<b>Listening Answers:</b>\n`;
        Object.keys(listeningAnswers).forEach((key) => {
            message += `Q${key}: ${listeningAnswers[key] || "No answer"}\n`;
        });

        message += `\n<b>Reading Answers:</b>\n`;
        Object.keys(readingAnswers).forEach((key) => {
            message += `Q${key}: ${readingAnswers[key] || "No answer"}\n`;
        });

        message += `\n<b>Writing Task 1:</b>\n${latestTask1}\n\n<b>Writing Task 2:</b>\n${latestTask2}`;

        try {
            await sendTelegramMessage(message);
            console.log("All answers sent to Telegram!");
        } catch (err) {
            console.error("Failed to send to Telegram:", err);
        }

        navigate("/end");
    };


    return (
        <div className="min-h-screen bg-white text-black flex flex-col text-lg">
            {/* Navbar */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300 fixed top-0 left-0 right-0 bg-white z-10">
                <h1 className="font-bold text-xl md:text-2xl">Writing Task</h1>
                <div className="font-semibold">{formatTime(timeLeft)}</div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 gap-6 p-4 pt-24 pb-20 overflow-auto">
                {/* Left: Question */}
                <div className="flex-1 border border-gray-300 rounded-lg p-4">
                    {currentTask === 1 ? (
                        <>
                            <h2 className="font-bold mb-2">Task 1</h2>
                            <p>
                                You should spend about 20 minutes on this task. Write at least 150 words.
                                Summarize the information by selecting and reporting the main features,
                                and make comparisons where relevant.
                            </p>
                            <p className="mt-5">
                                The charts below give information about the world’s top three producers of four different dairy products
                                (milk, cheese, butter, milk powder) in 2012.
                            </p>
                            <img
                                src={task1Image}
                                alt="Task 1 Chart"
                                className="mt-4 w-full h-auto border border-gray-300 rounded-lg"
                            />
                        </>
                    ) : (
                        <>
                            <h2 className="font-bold mb-2">Task 2</h2>
                            <p>
                                You should spend about 40 minutes on this task. Write at least 250 words.
                                <br /> Present a clear position throughout your response and support your ideas with relevant examples.
                            </p>
                            <p className="mt-5">
                                Experts say older people were happier and healthier in past because they did exercise and spent more time
                                with their family and friends, whereas many now suffer from loneliness and health problems.
                                What are the reasons and what are the solutions?
                            </p>
                        </>
                    )}
                </div>

                {/* Right: Textarea */}
                <div className="flex-1 flex flex-col border border-gray-300 rounded-lg p-4">
                    {/* Task 1 Textarea */}
                    <textarea
                        ref={task1Ref}
                        value={task1}
                        onChange={(e) => setTask1(e.target.value)}
                        spellCheck="false"
                        className="flex-1 w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Write your Task 1 answer here..."
                        style={{ display: currentTask === 1 ? "block" : "none" }}
                    />

                    {/* Task 2 Textarea */}
                    <textarea
                        ref={task2Ref}
                        value={task2}
                        onChange={(e) => setTask2(e.target.value)}
                        spellCheck="false"
                        className="flex-1 w-full border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black p-4"
                        placeholder="Write your Task 2 answer here..."
                        style={{ display: currentTask === 2 ? "block" : "none" }}
                    />

                    <div className="mt-2 text-right text-sm">
                        Word Count: {currentTask === 1 ? wordCount(task1) : wordCount(task2)}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-center gap-4 p-4 border-t border-gray-300 fixed bottom-0 left-0 right-0 bg-white z-10">
                <button
                    onClick={() => setCurrentTask(1)}
                    className={`px-6 py-2 border rounded-lg font-bold ${
                        currentTask === 1 ? "bg-black text-white" : "bg-white text-black border-black"
                    }`}
                >
                    Part 1
                </button>
                <button
                    onClick={() => setCurrentTask(2)}
                    className={`px-6 py-2 border rounded-lg font-bold ${
                        currentTask === 2 ? "bg-black text-white" : "bg-white text-black border-black"
                    }`}
                >
                    Part 2
                </button>
            </div>
        </div>
    );
}

export default WritingTest;
