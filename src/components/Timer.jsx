const Timer = ({ timeLeft }) => {
    const minutes = Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");

    return (
        <div className="text-center text-lg font-semibold text-white">
            {minutes}:{seconds}
        </div>
    );
};

export default Timer;
