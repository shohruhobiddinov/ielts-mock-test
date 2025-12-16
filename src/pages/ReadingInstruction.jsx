import React from "react";
import { useNavigate } from "react-router-dom";
import readingVideo from "../videos/reading.mp4";

function ReadingInstruction() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <video
                src={readingVideo}
                autoPlay
                playsInline
                onEnded={() => navigate("/reading")}
                style={styles.video}
            />
        </div>
    );
}

const styles = {
    container: {
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "black",
    },
    video: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
};

export default ReadingInstruction;
