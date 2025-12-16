import React from "react";
import { useNavigate } from "react-router-dom";
import listeningVideo from "../videos/listening.mp4";

function ListeningInstruction() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <video
                src={listeningVideo}
                autoPlay
                playsInline
                onEnded={() => navigate("/listening")}
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
        objectFit: "cover", // IMPORTANT
    },
};

export default ListeningInstruction;
