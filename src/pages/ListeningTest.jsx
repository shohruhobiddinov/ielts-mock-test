import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ListeningTest = () => {
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState(32 * 60); // 32 minutes
    // const [timeLeft, setTimeLeft] = useState(1 * 60); // 1 minutes
    const [currentPart, setCurrentPart] = useState(1);
    const [answers, setAnswers] = useState(
        () => JSON.parse(localStorage.getItem("listeningAnswers") || "{}")
    );
    const TELEGRAM_BOT_TOKEN = "8293510200:AAFuQAvlbLEIWKXz01liE38ooOwM0t7f6CA";
    const TELEGRAM_CHAT_ID = "1736820935";



    // Timer countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate("/reading-instructions", { state: { listeningAnswers: answers } });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [navigate, answers]);

    // Auto play audio
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.play().catch(() => {
                alert("Click anywhere to start the audio.");
            });
        }
    }, []);


    const handleAnswerChange = (index, value) => {
        const newAnswers = { ...answers, [index]: value };
        setAnswers(newAnswers);
        localStorage.setItem("listeningAnswers", JSON.stringify(newAnswers));
    };




    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const handleSubmit = async () => {
        try {
            const message = Object.entries(answers)
                .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
                .join("\n");

            await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                chat_id: TELEGRAM_CHAT_ID,
                text: `Listening Test Answers:\n${message}`,
            });
            alert("Answers sent successfully!");
        } catch (error) {
            console.error("Failed to send answers to Telegram:", error);
        }
    };

    const goToReadingInstructions = () => {
        navigate("/reading-instructions");
    };



    return (
        <div className="flex flex-col h-screen bg-white p-6">
            {/* Navbar */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-black">Listening Test</h1>
                <div className="text-lg font-bold text-black">{formatTime(timeLeft)}</div>
            </div>

            {/* Hidden audio */}
            <audio ref={audioRef} src="/audio/listening-test.mp3" autoPlay hidden />

            {/* Questions */}
            <div className="flex-1 overflow-y-auto p-4 border border-gray-300 rounded-lg mb-4">

                {currentPart === 1 && (
                    <>
                        <h3 className={"font-bold text-xl"}>PART 1</h3>
                        <p>Listen and answer questions 1–10.</p>

                        <p className={'font-bold mt-5'}>Questions 1-10</p>
                        <p className={"my-2"}>Complete the notes below.</p>
                        <p>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</p>
                        <table className="min-w-full border border-gray-300 my-5">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2 font-bold text-start">Building Work</th>
                                <th className="border px-4 py-2"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border px-4 py-2">Address:</td>
                                <td className="border px-4 py-2">15 Hill Street</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Contact Information</td>
                                <td className="border px-4 py-2"></td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Name:</td>
                                <td className="border px-4 py-2">
                                    Sally
                                    <input
                                        type="text"
                                        value={answers[1] || ""}
                                        onChange={(e) => handleAnswerChange(1, e.target.value)}
                                        className="border border-gray-400 rounded px-2 py-1 mx-2 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                        placeholder="1"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Phone</td>
                                <td className="border px-4 py-2">027 584 6613</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold">Kitchen</td>
                                <td className="border px-4 py-2"></td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2"></td>
                                <td className="border px-4 py-2">- needs a bigger window</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2"></td>
                                <td className="border px-4 py-2">
                                    - the kitchen is too hot – fit a
                                    <input
                                        type="text"
                                        value={answers[2] || ""}
                                        onChange={(e) => handleAnswerChange(2, e.target.value)}
                                        className="border border-gray-400 rounded px-2 py-1 mx-2 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                        placeholder="2"
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td className="border px-4 py-2 font-bold">Bathroom</td>
                                <td className="border px-4 py-2"></td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2"></td>
                                <td className="border px-4 py-2">
                                    - put in a
                                    <input
                                        type="text"
                                        value={answers[3] || ""}
                                        onChange={(e) => handleAnswerChange(3, e.target.value)}
                                        className="border border-gray-400 rounded px-2 py-1 mx-2 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                        placeholder="3"
                                    />
                                    on the back wall
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2"></td>
                                <td className="border px-4 py-2">
                                    - decide the
                                    <input
                                        type="text"
                                        value={answers[4] || ""}
                                        onChange={(e) => handleAnswerChange(4, e.target.value)}
                                        className="border border-gray-400 rounded px-2 py-1 mx-2 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                        placeholder="4"
                                    />
                                    of the small tiles later
                                </td>
                            </tr>

                            <tr>
                                <td className="border px-4 py-2 font-bold">Outside</td>
                                <td className="border px-4 py-2"></td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2"></td>
                                <td className="border px-4 py-2">
                                    - put a higher
                                    <input
                                        type="text"
                                        value={answers[5] || ""}
                                        onChange={(e) => handleAnswerChange(5, e.target.value)}
                                        className="border border-gray-400 rounded px-2 py-1 mx-2 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                        placeholder="5"
                                    />
                                    in the garden
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2"></td>
                                <td className="border px-4 py-2">
                                    - put a new
                                    <input
                                        type="text"
                                        value={answers[6] || ""}
                                        onChange={(e) => handleAnswerChange(6, e.target.value)}
                                        className="border border-gray-400 rounded px-2 py-1 mx-2 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                        placeholder="6"
                                    />
                                    on the garage door
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2"></td>
                                <td className="border px-4 py-2">
                                    - fix the roof – it was damaged by a
                                    <input
                                        type="text"
                                        value={answers[7] || ""}
                                        onChange={(e) => handleAnswerChange(7, e.target.value)}
                                        className="border border-gray-400 rounded px-2 py-1 mx-2 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                        placeholder="7"
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td className="border px-4 py-2"></td>
                                <td className="border px-4 py-2">
                                    - fit a new rain gutter made of
                                    <input
                                        type="text"
                                        value={answers[8] || ""}
                                        onChange={(e) => handleAnswerChange(8, e.target.value)}
                                        className="border border-gray-400 rounded px-2 py-1 mx-2 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                        placeholder="8"
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td className="border px-4 py-2 font-bold">Other Information</td>
                                <td className="border px-4 py-2"></td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Start date</td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        value={answers[9] || ""}
                                        onChange={(e) => handleAnswerChange(9, e.target.value)}
                                        className="border border-gray-400 rounded px-2 py-1 mx-2 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                        placeholder="9"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Security code:</td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        value={answers[10] || ""}
                                        onChange={(e) => handleAnswerChange(10, e.target.value)}
                                        className="border border-gray-400 rounded px-2 py-1 mx-2 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                        placeholder="10"
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </>
                )}

                {currentPart === 2 && (
                    <>
                        <h3 className={"font-bold text-xl"}>PART 2</h3>
                        <p>Listen and answer questions 11–20.</p>

                        <p className={'font-bold mt-5'}>Questions 11-15</p>
                        <p>Choose the correct letter, <strong>A, B or C.</strong></p>

                        <p className=" font-bold mt-4 text-black">Pioneer Park and Resort </p>

                        {/* Questions 11-15: radio buttons */}
                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">11. For camping supplies, the speaker recommends
                                inexpensive:</p>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q11"
                                    value="A cooking equipment"
                                    checked={answers[11] === "A cooking equipment"}
                                    onChange={(e) => handleAnswerChange(11, e.target.value)}
                                    className="accent-black"
                                />
                                A cooking equipment
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q11"
                                    value="B tents"
                                    checked={answers[11] === "B tents"}
                                    onChange={(e) => handleAnswerChange(11, e.target.value)}
                                    className="accent-black"
                                />
                                B tents
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q11"
                                    value="C sleeping bags"
                                    checked={answers[11] === "C sleeping bags"}
                                    onChange={(e) => handleAnswerChange(11, e.target.value)}
                                    className="accent-black"
                                />
                                C sleeping bags
                            </label>
                        </div>

                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">12. To stay warm during cold months, the speaker
                                recommends:</p>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q12"
                                    value="A making a campfire"
                                    checked={answers[12] === "A making a campfire"}
                                    onChange={(e) => handleAnswerChange(12, e.target.value)}
                                    className="accent-black"
                                />
                                A making a campfire
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q12"
                                    value="B wearing layers of clothing"
                                    checked={answers[12] === "B wearing layers of clothing"}
                                    onChange={(e) => handleAnswerChange(12, e.target.value)}
                                    className="accent-black"
                                />
                                B wearing layers of clothing
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q12"
                                    value="C staying dry"
                                    checked={answers[12] === "C staying dry"}
                                    onChange={(e) => handleAnswerChange(12, e.target.value)}
                                    className="accent-black"
                                />
                                C staying dry
                            </label>
                        </div>

                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">13. For the campgrounds without water, the speaker
                                recommends:</p>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q13"
                                    value="A buying water at the camp"
                                    checked={answers[13] === "A buying water at the camp"}
                                    onChange={(e) => handleAnswerChange(13, e.target.value)}
                                    className="accent-black"
                                />
                                A buying water at the camp
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q13"
                                    value="B bringing water from home"
                                    checked={answers[13] === "B bringing water from home"}
                                    onChange={(e) => handleAnswerChange(13, e.target.value)}
                                    className="accent-black"
                                />
                                B bringing water from home
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q13"
                                    value="C using filtered river water"
                                    checked={answers[13] === "C using filtered river water"}
                                    onChange={(e) => handleAnswerChange(13, e.target.value)}
                                    className="accent-black"
                                />
                                C using filtered river water
                            </label>
                        </div>

                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">14. To keep the area in good condition, visitors
                                should:</p>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q14"
                                    value="A use different trails each day"
                                    checked={answers[14] === "A use different trails each day"}
                                    onChange={(e) => handleAnswerChange(14, e.target.value)}
                                    className="accent-black"
                                />
                                A use different trails each day
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q14"
                                    value="B camp in flat areas"
                                    checked={answers[14] === "B camp in flat areas"}
                                    onChange={(e) => handleAnswerChange(14, e.target.value)}
                                    className="accent-black"
                                />
                                B camp in flat areas
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q14"
                                    value="C move their tent regularly"
                                    checked={answers[14] === "C move their tent regularly"}
                                    onChange={(e) => handleAnswerChange(14, e.target.value)}
                                    className="accent-black"
                                />
                                C move their tent regularly
                            </label>
                        </div>

                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">15. When leaving, what should campers do with their
                                garbage?</p>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q15"
                                    value="A Put it in the bags provided in the camping area"
                                    checked={answers[15] === "A Put it in the bags provided in the camping area"}
                                    onChange={(e) => handleAnswerChange(15, e.target.value)}
                                    className="accent-black"
                                />
                                A Put it in the bags provided in the camping area
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q15"
                                    value="B Leave it at the park exit"
                                    checked={answers[15] === "B Leave it at the park exit"}
                                    onChange={(e) => handleAnswerChange(15, e.target.value)}
                                    className="accent-black"
                                />
                                B Leave it at the park exit
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q15"
                                    value="C Take it home with them"
                                    checked={answers[15] === "C Take it home with them"}
                                    onChange={(e) => handleAnswerChange(15, e.target.value)}
                                    className="accent-black"
                                />
                                C Take it home with them
                            </label>
                        </div>

                        {/* Questions 16-20: select dropdowns */}
                        <p className={'font-bold mt-5'}>Questions 16-20</p>
                        <p>What activity can visitors do in each of the following exhibits?</p>
                        <p>Choose <strong>FIVE</strong> answers from the box and write the correct
                            letter, <strong>A-G,</strong>
                            next to questions 16-20.</p>

                        <p className={"font-bold my-2"}>Activities</p>
                        <p className={"my-2"}><strong>A</strong> sing songs </p>
                        <p className={"my-2"}><strong>B</strong> buy gifts </p>
                        <p className={"my-2"}><strong>C</strong> learn about nature</p>
                        <p className={"my-2"}><strong>D</strong> make a boat</p>
                        <p className={"my-2"}><strong>E</strong> watch a show</p>
                        <p className={"my-2"}><strong>F</strong> get to know people</p>
                        <p className={"my-2"}><strong>G</strong> buy a snack</p>

                        <div className="my-4">
                            <p className="mb-1 font-bold text-black">16. Eagle Trading Post</p>
                            <select
                                value={answers[16] || ""}
                                onChange={(e) => handleAnswerChange(16, e.target.value)}
                                className="border border-gray-400 rounded px-2 py-1 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black"
                            >
                                <option value="">Select answer</option>
                                <option value="A sing songs">A</option>
                                <option value="B buy gifts">B </option>
                                <option value="C learn about nature">C </option>
                                <option value="D make a boat">D </option>
                                <option value="E watch a show">E </option>
                                <option value="F get to know people">F </option>
                                <option value="G buy a snack">G </option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">17. Bike Barn</p>
                            <select
                                value={answers[17] || ""}
                                onChange={(e) => handleAnswerChange(17, e.target.value)}
                                className="border border-gray-400 rounded px-2 py-1 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black"
                            >
                                <option value="">Select answer</option>
                                <option value="A sing songs">A sing songs</option>
                                <option value="B buy gifts">B buy gifts</option>
                                <option value="C learn about nature">C learn about nature</option>
                                <option value="D make a boat">D make a boat</option>
                                <option value="E watch a show">E watch a show</option>
                                <option value="F get to know people">F get to know people</option>
                                <option value="G buy a snack">G buy a snack</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">18. Long Trail Lake</p>
                            <select
                                value={answers[18] || ""}
                                onChange={(e) => handleAnswerChange(18, e.target.value)}
                                className="border border-gray-400 rounded px-2 py-1 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black"
                            >
                                <option value="">Select answer</option>
                                <option value="A sing songs">A sing songs</option>
                                <option value="B buy gifts">B buy gifts</option>
                                <option value="C learn about nature">C learn about nature</option>
                                <option value="D make a boat">D make a boat</option>
                                <option value="E watch a show">E watch a show</option>
                                <option value="F get to know people">F get to know people</option>
                                <option value="G buy a snack">G buy a snack</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">19. Pioneer Hall</p>
                            <select
                                value={answers[19] || ""}
                                onChange={(e) => handleAnswerChange(19, e.target.value)}
                                className="border border-gray-400 rounded px-2 py-1 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black"
                            >
                                <option value="">Select answer</option>
                                <option value="A sing songs">A sing songs</option>
                                <option value="B buy gifts">B buy gifts</option>
                                <option value="C learn about nature">C learn about nature</option>
                                <option value="D make a boat">D make a boat</option>
                                <option value="E watch a show">E watch a show</option>
                                <option value="F get to know people">F get to know people</option>
                                <option value="G buy a snack">G buy a snack</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">20. Crockett's Campfire</p>
                            <select
                                value={answers[20] || ""}
                                onChange={(e) => handleAnswerChange(20, e.target.value)}
                                className="border border-gray-400 rounded px-2 py-1 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black"
                            >
                                <option value="">Select answer</option>
                                <option value="A sing songs">A sing songs</option>
                                <option value="B buy gifts">B buy gifts</option>
                                <option value="C learn about nature">C learn about nature</option>
                                <option value="D make a boat">D make a boat</option>
                                <option value="E watch a show">E watch a show</option>
                                <option value="F get to know people">F get to know people</option>
                                <option value="G buy a snack">G buy a snack</option>
                            </select>
                        </div>
                    </>
                )}
                {currentPart === 3 && (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-black">Part 3: Research Project (Questions 21-30)</h2>
                        <p className="mb-4 font-semibold text-black">Answer the following questions. Choose ONE letter (A, B, or C) or TWO letters (A–E) as instructed.</p>

                        {/* Questions 21-26: radio buttons */}
                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">21. How did John choose the topic of his research project?</p>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q21"
                                    value="A He thought the information would be useful for town planning"
                                    checked={answers[21] === "A He thought the information would be useful for town planning"}
                                    onChange={(e) => handleAnswerChange(21, e.target.value)}
                                    className="accent-black"
                                />
                                A He thought the information would be useful for town planning
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q21"
                                    value="B He has a special interest in the use of public services"
                                    checked={answers[21] === "B He has a special interest in the use of public services"}
                                    onChange={(e) => handleAnswerChange(21, e.target.value)}
                                    className="accent-black"
                                />
                                B He has a special interest in the use of public services
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q21"
                                    value="C He read about a similar study which had been done earlier"
                                    checked={answers[21] === "C He read about a similar study which had been done earlier"}
                                    onChange={(e) => handleAnswerChange(21, e.target.value)}
                                    className="accent-black"
                                />
                                C He read about a similar study which had been done earlier
                            </label>
                        </div>

                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">22. During his research, John is expecting to find that:</p>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q22"
                                    value="A the use of public services has altered very little"
                                    checked={answers[22] === "A the use of public services has altered very little"}
                                    onChange={(e) => handleAnswerChange(22, e.target.value)}
                                    className="accent-black"
                                />
                                A the use of public services has altered very little
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q22"
                                    value="B a group of people has changed its habits"
                                    checked={answers[22] === "B a group of people has changed its habits"}
                                    onChange={(e) => handleAnswerChange(22, e.target.value)}
                                    className="accent-black"
                                />
                                B a group of people has changed its habits
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q22"
                                    value="C the most frequently used facility is the library"
                                    checked={answers[22] === "C the most frequently used facility is the library"}
                                    onChange={(e) => handleAnswerChange(22, e.target.value)}
                                    className="accent-black"
                                />
                                C the most frequently used facility is the library
                            </label>
                        </div>

                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">23. What is the problem with using official records?</p>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q23"
                                    value="A They may be lacking in detail"
                                    checked={answers[23] === "A They may be lacking in detail"}
                                    onChange={(e) => handleAnswerChange(23, e.target.value)}
                                    className="accent-black"
                                />
                                A They may be lacking in detail
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q23"
                                    value="B They may not be readily available"
                                    checked={answers[23] === "B They may not be readily available"}
                                    onChange={(e) => handleAnswerChange(23, e.target.value)}
                                    className="accent-black"
                                />
                                B They may not be readily available
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q23"
                                    value="C They may be difficult to analyse"
                                    checked={answers[23] === "C They may be difficult to analyse"}
                                    onChange={(e) => handleAnswerChange(23, e.target.value)}
                                    className="accent-black"
                                />
                                C They may be difficult to analyse
                            </label>
                        </div>

                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">24. What does the tutor think about John using a questionnaire to get information?</p>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q24"
                                    value="A He needs to do a course in questionnaire design first"
                                    checked={answers[24] === "A He needs to do a course in questionnaire design first"}
                                    onChange={(e) => handleAnswerChange(24, e.target.value)}
                                    className="accent-black"
                                />
                                A He needs to do a course in questionnaire design first
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q24"
                                    value="B He should use this method instead of looking at public records"
                                    checked={answers[24] === "B He should use this method instead of looking at public records"}
                                    onChange={(e) => handleAnswerChange(24, e.target.value)}
                                    className="accent-black"
                                />
                                B He should use this method instead of looking at public records
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q24"
                                    value="C He will find the practice he gets useful the following year"
                                    checked={answers[24] === "C He will find the practice he gets useful the following year"}
                                    onChange={(e) => handleAnswerChange(24, e.target.value)}
                                    className="accent-black"
                                />
                                C He will find the practice he gets useful the following year
                            </label>
                        </div>

                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">25. Which new variable does John agree to add to his investigation?</p>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q25"
                                    value="A occupation"
                                    checked={answers[25] === "A occupation"}
                                    onChange={(e) => handleAnswerChange(25, e.target.value)}
                                    className="accent-black"
                                />
                                A occupation
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q25"
                                    value="B income group"
                                    checked={answers[25] === "B income group"}
                                    onChange={(e) => handleAnswerChange(25, e.target.value)}
                                    className="accent-black"
                                />
                                B income group
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q25"
                                    value="C qualifications"
                                    checked={answers[25] === "C qualifications"}
                                    onChange={(e) => handleAnswerChange(25, e.target.value)}
                                    className="accent-black"
                                />
                                C qualifications
                            </label>
                        </div>

                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">26. How many questionnaires will John distribute?</p>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q26"
                                    value="A the same number as in the previous study"
                                    checked={answers[26] === "A the same number as in the previous study"}
                                    onChange={(e) => handleAnswerChange(26, e.target.value)}
                                    className="accent-black"
                                />
                                A the same number as in the previous study
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q26"
                                    value="B a greater number than he needs for analysis"
                                    checked={answers[26] === "B a greater number than he needs for analysis"}
                                    onChange={(e) => handleAnswerChange(26, e.target.value)}
                                    className="accent-black"
                                />
                                B a greater number than he needs for analysis
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="q26"
                                    value="C the number recommended in the project guidelines"
                                    checked={answers[26] === "C the number recommended in the project guidelines"}
                                    onChange={(e) => handleAnswerChange(26, e.target.value)}
                                    className="accent-black"
                                />
                                C the number recommended in the project guidelines
                            </label>
                        </div>

                        {/* Questions 27-30: checkboxes (choose only TWO) */}
                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">
                                27-28. Which TWO strategies will John use to encourage people to fill out his questionnaire?
                            </p>
                            {["A using simple language","B delivering the questionnaires in person","C making the questionnaires anonymous","D providing return envelopes","E trialling the questionnaire on friends"].map((opt) => (
                                <label key={opt} className="flex items-center gap-2 text-black">
                                    <input
                                        type="checkbox"
                                        checked={answers[27]?.includes(opt) || false}
                                        disabled={!answers[27]?.includes(opt) && (answers[27]?.length >= 2)}
                                        onChange={(e) => {
                                            setAnswers((prev) => ({
                                                ...prev,
                                                27: prev[27]?.includes(opt)
                                                    ? prev[27].filter((v) => v !== opt)
                                                    : [...(prev[27] || []), opt],
                                            }));
                                        }}
                                        className="accent-black"
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>


                        <div className="mb-4">
                            <p className="mb-1 font-bold text-black">
                                29-30. Which TWO pieces of advice does the tutor give John about his questionnaire?
                            </p>
                            {["A There should be a mixture of question types","B Some questions should elicit personal information","C There should be an introduction to explain the survey's purpose","D A telephone number should be provided for queries","E The questions should only take a few minutes to answer"].map((opt) => (
                                <label key={opt} className="flex items-center gap-2 text-black">
                                    <input
                                        type="checkbox"
                                        checked={answers[30]?.includes(opt) || false}
                                        disabled={!answers[30]?.includes(opt) && (answers[30]?.length >= 2)}
                                        onChange={(e) => {
                                            setAnswers((prev) => ({
                                                ...prev,
                                                30: prev[30]?.includes(opt)
                                                    ? prev[30].filter((v) => v !== opt)
                                                    : [...(prev[30] || []), opt],
                                            }));
                                        }}
                                        className="accent-black"
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </>
                )}


                {currentPart === 4 && (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-black">
                            Part 4: Science in the Future (Questions 31-40)
                        </h2>
                        <p className="mb-4 font-semibold text-black">
                            Complete the notes below. Write ONE WORD ONLY for each answer.
                        </p>

                        <div className="">

                            <p className={"font-bold"}>Science in the Future</p>
                            <p>Scientists were asked to predict changes in their own field in the next 50 years.</p>
                            <p className={"font-bold"}>Computer science</p>
                            <div className="flex items-center gap-2">
                                <span className="text-black">The invention of computers is as significant as the discovery of how to create and use</span>
                                <input
                                    type="text"
                                    value={answers[31] || ""}
                                    onChange={(e) => handleAnswerChange(31, e.target.value)}
                                    className="w-[150px] border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-black"
                                    placeholder="31"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-black">Computer will be seen as being</span>
                                <input
                                    type="text"
                                    value={answers[32] || ""}
                                    onChange={(e) => handleAnswerChange(32, e.target.value)}
                                    className="border border-gray-400 rounded px-2 py-1 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                    placeholder="32"
                                />
                            </div>
                            <p className={"font-bold"}>Psychology</p>

                            <div className="flex items-center gap-2">
                                <span className="text-black">Research will become much more</span>
                                <input
                                    type="text"
                                    value={answers[33] || ""}
                                    onChange={(e) => handleAnswerChange(33, e.target.value)}
                                    className="border border-gray-400 rounded px-2 py-1 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                    placeholder="33"
                                />
                                <span className={"text-black"}>, and also more practical since more</span>
                                <input
                                    type="text"
                                    value={answers[34] || ""}
                                    onChange={(e) => handleAnswerChange(34, e.target.value)}
                                    className="border border-gray-400 rounded px-2 py-1 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                    placeholder="34"
                                />
                                <span className="text-black">will be working in the field</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-black">Imaging devices will give information about the behaviour of the</span>
                                <input
                                    type="text"
                                    value={answers[35] || ""}
                                    onChange={(e) => handleAnswerChange(35, e.target.value)}
                                    className="border border-gray-400 rounded px-2 py-1 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                    placeholder="35"
                                />
                            </div>

                            <p className={"font-bold"}>Genetics</p>

                            <div className="flex items-center gap-2">
                                <span className="text-black">With increased life expectancy, it is important to consider the</span>
                                <input
                                    type="text"
                                    value={answers[36] || ""}
                                    onChange={(e) => handleAnswerChange(36, e.target.value)}
                                    className="border border-gray-400 rounded px-2 py-1 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                    placeholder="36"
                                />
                                <span className="text-black">of elderly people's lives</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-black">Knowledge of a person's genome will indicate whether they are likely to be affected by a</span>
                                <input
                                    type="text"
                                    value={answers[37] || ""}
                                    onChange={(e) => handleAnswerChange(37, e.target.value)}
                                    className="border border-gray-400 rounded px-2 py-1 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                    placeholder="37"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-black">The approach to treatment will be on an increasingly</span>
                                <input
                                    type="text"
                                    value={answers[38] || ""}
                                    onChange={(e) => handleAnswerChange(38, e.target.value)}
                                    className="border border-gray-400 rounded px-2 py-1 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                    placeholder="38"
                                />
                                <span className="text-black">basis</span>
                            </div>

                            <p className={"font-bold"}>Zoology</p>
                            <p>People can explore the world via satellite.</p>

                            <div className="flex items-center gap-2">
                                <span className="text-black">People can see the effects of the destruction of</span>
                                <input
                                    type="text"
                                    value={answers[39] || ""}
                                    onChange={(e) => handleAnswerChange(39, e.target.value)}
                                    className="border border-gray-400 rounded px-2 py-1 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                    placeholder="39"
                                />
                                <span className="text-black">in East Africa</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-black">Such increased awareness should enable us to do more to look after the</span>
                                <input
                                    type="text"
                                    value={answers[40] || ""}
                                    onChange={(e) => handleAnswerChange(40, e.target.value)}
                                    className="border border-gray-400 rounded px-2 py-1 w-[150px] focus:outline-none focus:ring-1 focus:ring-black"
                                    placeholder="40"
                                />
                            </div>
                        </div>
                    </>
                )}

            </div>

            {/* Footer: Part buttons */}
            <div className="flex justify-center gap-4">
                {[1, 2, 3, 4].map((p) => (
                    <button
                        key={p}
                        onClick={() => setCurrentPart(p)}
                        className={`px-4 py-2 rounded-lg font-bold border ${
                            currentPart === p ? "bg-black text-white" : "bg-white text-black border-black"
                        }`}
                    >
                        Part {p}
                    </button>
                ))}
                <div className="flex justify-center">
                    <button
                        onClick={goToReadingInstructions}
                        className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition"
                    >
                        Submit
                    </button>
                </div>

            </div>

        </div>
    );
};

export default ListeningTest;