const TimeFormatter = ({ seconds }: {seconds: number}) => {
    const formatTime = (totalSeconds: number) => {
        const wholeSeconds = Math.floor(totalSeconds);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = wholeSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return <>{formatTime(seconds)}</>
};

export default TimeFormatter;
