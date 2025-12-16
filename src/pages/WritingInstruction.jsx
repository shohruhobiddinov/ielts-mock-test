import React from "react";
import { useNavigate } from "react-router-dom";
import writingVideo from "../videos/writing.mp4";

function WritingInstruction() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <video
                src={writingVideo}
                autoPlay
                playsInline
                onEnded={() => navigate("/writing")}
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

export default WritingInstruction;
