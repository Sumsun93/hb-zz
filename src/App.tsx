import {useEffect, useRef, useState} from 'react'
import './App.css'
import background from './assets/background.png';
import music from './assets/musique.wav';
import AudioPlayer from "./components/AudioPlayer.tsx";
import sub from './assets/sub.txt';
import {useAudio, useFullscreen, useToggle} from "react-use";
import Intro from "./components/Intro.tsx";
import End from "./components/End.tsx";
import Stage from "./components/Stage.tsx";
import {Button} from "@mantine/core";

function App() {
    const [started, setStarted] = useState(false);
    const [delayedStarted, setDelayedStarted] = useState(false);
    const [ended, setEnded] = useState(false);
    const [delayedEnded, setDelayedEnded] = useState(false);
    const [isChorus, setIsChorus] = useState(false);
    const [audio, state, controls] = useAudio({
        src: music,
        autoPlay: false,
        preload: 'auto',
    });
    const [show, toggle] = useToggle(false);

    const ref = useRef(null)
    const isFullscreen = useFullscreen(ref, show, {onClose: () => toggle(false)});

    useEffect(() => {
        if (started) {
            toggle(true)
            setTimeout(() => {
                controls.play();
                setDelayedStarted(true);
            }, 4000);
        }
    }, [started]);

    useEffect(() => {
        if (delayedStarted && !state.playing && (state.time === state.duration)) {
            setEnded(true);
            setTimeout(() => {
                setDelayedEnded(true);
            }, 4000);
        }
    }, [state]);

    return (
        <div ref={ref}>
            <AudioPlayer
                audio={audio}
                state={state}
                subtitleSrc={sub}
                controls={controls}
                delayedStarted={delayedStarted}
                setIsChorus={setIsChorus}
            />
            {(!isFullscreen && started) && (
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        padding: '10px',
                        width: '100vw',
                        textAlign: 'center',
                        zIndex: 100,
                    }}
                >
                    <Button
                        color="#D16ED5FF"
                        onClick={() => {
                            toggle(true)
                        }}
                    >
                        Revenir en plein écran
                    </Button>
                </div>
            )}
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    background: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    overflow: 'hidden',
                }}
            >
                <Stage started={started} delayedStarted={delayedStarted} ended={ended} state={state}
                       isChorus={isChorus && state.playing}/>

                <End delayedEnded={delayedEnded}/>

                <Intro ended={ended} started={started} setStarted={setStarted}/>
            </div>
        </div>
    )
}

export default App;
