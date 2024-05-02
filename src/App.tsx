import {useEffect, useRef, useState} from 'react'
import './App.css'
import background from './assets/background.png';
import music from './assets/musique.wav';
import AudioPlayer from "./components/AudioPlayer.tsx";
import sub from './assets/sub.txt';
import {useAudio, useFullscreen} from "react-use";
import Intro from "./components/Intro.tsx";
import End from "./components/End.tsx";
import Stage from "./components/Stage.tsx";

function App() {
    const [started, setStarted] = useState(true);
    const [delayedStarted, setDelayedStarted] = useState(true);
    const [ended, setEnded] = useState(true);
    const [delayedEnded, setDelayedEnded] = useState(true);
    const [audio, state, controls] = useAudio({
        src: music,
        autoPlay: false,
        preload: 'auto',
    });

    const ref = useRef(null)
    useFullscreen(ref, started);

    useEffect(() => {
        if (started) {
            setTimeout(() => {
                // controls.play();
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
            />
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
                <Stage started={started} delayedStarted={delayedStarted} ended={ended} state={state} />
                
                <End delayedEnded={delayedEnded} />

                <Intro ended={ended} started={started} setStarted={setStarted} />
            </div>
        </div>
    )
}

export default App;
