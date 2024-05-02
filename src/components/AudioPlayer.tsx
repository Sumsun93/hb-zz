import {useState, useEffect, ReactElement} from 'react';
import {HTMLMediaState} from "react-use/lib/factory/createHTMLMediaHook";
import {ActionIcon, Slider} from "@mantine/core";
import {CiPause1, CiPlay1, CiVolumeHigh, CiVolumeMute} from "react-icons/ci";

import './player.css';

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

function AudioPlayer({ delayedStarted, subtitleSrc, audio, state, controls }: {
    delayedStarted: boolean,
    subtitleSrc: string,
    audio: ReactElement,
    state: HTMLMediaState,
    controls: any,
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
                <SubtitleDisplay src={subtitleSrc} currentTime={state.time} />
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
                <div className="player">
                    <ActionIcon
                        variant="default"
                        aria-label="Play/Pause"
                        disabled={!delayedStarted}
                        onClick={state.playing ? controls.pause : controls.play}
                    >
                        {state.playing ? <CiPause1/> : <CiPlay1/>}
                    </ActionIcon>
                    <ActionIcon
                        variant="default"
                        aria-label="Volume"
                        onClick={state.muted ? controls.unmute : controls.mute}
                    >
                        {state.muted ? <CiVolumeMute /> : <CiVolumeHigh />}
                    </ActionIcon>
                    <div
                        style={{width: '100px'}}
                    >
                        <Slider disabled={state.muted} label={null} min={0} max={1} step={0.01} value={state.volume} onChange={controls.volume}/>
                    </div>
                    <div
                        style={{width: '100%'}}
                    >
                        <Slider disabled={!delayedStarted} label={null} min={0} max={state.duration} value={state.time}
                                onChangeEnd={controls.seek}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;
