import React from "react";
import { Routes, Route } from "react-router-dom";
import ListeningTest from "./pages/ListeningTest";
import ReadingTest from "./pages/ReadingTest";
import WritingTest from "./pages/WritingTest";
import StartPage from "./pages/StartPage.jsx";
import EndPage from "./pages/EndPage.jsx";
import HighlightProvider from "./components/HighlightProvider";
import ListeningInstruction from "./pages/ListeningInstruction";
import ReadingInstruction from "./pages/ReadingInstruction";
import WritingInstruction from "./pages/WritingInstruction";


function App() {
    return (
        <HighlightProvider>
            <Routes>
                <Route path="/" element={<StartPage />} />

                <Route path="/listening-instructions" element={<ListeningInstruction />} />
                <Route path="/listening" element={<ListeningTest />} />

                <Route path="/reading-instructions" element={<ReadingInstruction />} />
                <Route path="/reading" element={<ReadingTest />} />

                <Route path="/writing-instructions" element={<WritingInstruction />} />
                <Route path="/writing" element={<WritingTest />} />

                <Route path="/end" element={<EndPage />} />
            </Routes>
        </HighlightProvider>
    );
}

export default App;
