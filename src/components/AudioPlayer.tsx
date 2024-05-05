import {useState, useEffect, ReactElement} from 'react';
import {HTMLMediaState} from "react-use/lib/factory/createHTMLMediaHook";
import {ActionIcon, Slider, Text} from "@mantine/core";
import {CiPause1, CiPlay1, CiVolumeHigh, CiVolumeMute} from "react-icons/ci";

import './player.css';
import TimeFormatter from "./TimeFormatter.tsx";
import {timeToSeconds} from "../utils.tsx";

interface Controls {
    play: () => (Promise<void> | undefined)
    pause: () => void
    seek: (time: number) => void
    volume: (volume: number) => void
    mute: () => void
    unmute: () => void
}

interface Subtitle {
    start: number;
    end: number;
    text: string;
}

const chorusTime = [
    {start: '00:00:13.000', end: '00:00:40.112'},
    {start: '00:01:06.157', end: '00:01:33.729'},
    {start: '00:01:59.443', end: '00:02:47.729'}
]

const SubtitleDisplay = ({ src, currentTime, setIsChorus }: {
    src: string,
    currentTime: number,
    setIsChorus: (state: boolean) => void
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
        setIsChorus(chorusTime.some(s => currentTime >= timeToSeconds(s.start) && currentTime <= timeToSeconds(s.end)))
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
            entry.text += line.trim() + ' ';
        }
    });

    if (entry) entries.push(entry); // Push the last entry if exists

    return entries;
};

function AudioPlayer({ delayedStarted, subtitleSrc, audio, state, controls, setIsChorus }: {
    delayedStarted: boolean,
    subtitleSrc: string,
    audio: ReactElement,
    state: HTMLMediaState,
    controls: Controls,
    setIsChorus: (state: boolean) => void
}) {

    useEffect(() => {
        controls.volume(0.5);
    }, []);

    return (
        <div className="jersey-20-charted-regular">
            {audio}
            <div
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
                <SubtitleDisplay src={subtitleSrc} currentTime={state.time} setIsChorus={setIsChorus} />
            </div>
            <div
                style={{
                    width: '100vw',
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: "3em",
                    zIndex: 29,
                }}
            >
                <div className="player" style={{fontFamily: 'inherit', display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <ActionIcon
                            color="#D16ED5FF"
                            aria-label="Play/Pause"
                            disabled={!delayedStarted}
                            onClick={state.playing ? controls.pause : controls.play}
                        >
                            {state.playing ? <CiPause1/> : <CiPlay1/>}
                        </ActionIcon>
                        <ActionIcon
                            color="#D16ED5FF"
                            aria-label="Volume"
                            onClick={state.muted ? controls.unmute : controls.mute}
                        >
                            {state.muted ? <CiVolumeMute /> : <CiVolumeHigh />}
                        </ActionIcon>
                        <div
                            style={{width: '100px'}}
                        >
                            <Slider color="#D16ED5FF" variant="default" disabled={state.muted} label={null} min={0} max={1} step={0.01} value={state.volume} onChange={controls.volume}/>
                        </div>
                    </div>
                    <Text
                        style={{
                            fontFamily: 'sans-serif',
                            display: 'flex',
                            gap: '5px',
                        }}
                    >
                        <TimeFormatter seconds={state.time} /> / <TimeFormatter seconds={state.duration} />
                    </Text>
                    <div
                        style={{width: '100%'}}
                    >
                        <Slider color="#D16ED5FF" disabled={!delayedStarted} label={null} min={0} max={state.duration} value={state.time} onChangeEnd={controls.seek}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;
