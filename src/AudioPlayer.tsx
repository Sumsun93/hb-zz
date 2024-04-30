import {useState, useEffect, ReactElement} from 'react';
import {HTMLMediaState} from "react-use/lib/factory/createHTMLMediaHook";

interface Subtitle {
    start: number;
    end: number;
    text: string;
}

const SubtitleDisplay = ({ src, currentTime }: {
    src: string,
    currentTime: number
}) => {
    const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
    const [currentSubtitle, setCurrentSubtitle] = useState("");

    useEffect(() => {
        fetch(src)
            .then((response) => response.text())
            .then((text) => {
                const parsedSubtitles = parseVTT(text);
                setSubtitles(parsedSubtitles);
            });
    }, [src]);

    useEffect(() => {
        const subtitle = subtitles.find(s => currentTime >= s.start && currentTime <= s.end);
        setCurrentSubtitle(subtitle ? subtitle.text : "");
    }, [currentTime, subtitles]);

    return <div className="subtitle">{currentSubtitle}</div>;
};

const parseVTT = (vttString: string) => {
    const lines = vttString.split(/\r?\n/);
    let entry: {start: number, end: number, text: string} | null = null;
    const entries: {start: number, end: number, text: string}[] = [];

    lines.forEach((line) => {
        if (line.includes('-->')) {
            if (entry) entries.push(entry);
            const [start, end] = line.split(' --> ').map(timeToSeconds);
            // const [start, end] = time.split(' ').map(timeToSeconds);
            entry = { start, end, text: '' };
        } else if (line.trim() && !line.match(/^\d+$/) && entry) {
            console.log(line);
            entry.text += line.trim() + ' ';
        }
    });

    if (entry) entries.push(entry); // Push the last entry if exists

    return entries;
};

const timeToSeconds = (time: string) => {
    const [hms, ms] = time.split('.');
    const [hours, minutes, seconds] = hms.split(':').map(parseFloat);
    return hours * 3600 + minutes * 60 + seconds + parseFloat('0.' + ms);
};

function AudioPlayer({ subtitleSrc, audio, state }: {
    subtitleSrc: string,
    audio: ReactElement,
    state: HTMLMediaState
}) {
    return (
        <div>
            {audio}
            <div
                className="jersey-20-charted-regular"
                style={{
                    width: '100vw',
                    position: 'absolute',
                    top: '30vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: "3em",
                }}
            >
                <SubtitleDisplay src={subtitleSrc} currentTime={state.time} />
            </div>
        </div>
    );
}

export default AudioPlayer;
