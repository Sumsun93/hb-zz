import {useEffect, useState} from 'react'
import classNames from "classnames";
import {useAudio} from "react-use";
import Lottie from 'react-lottie';
import './App.css'
import background from './assets/background.png';
import light from './assets/light.svg';
import music from './assets/maquette_zz.mp3';
import sum from './assets/Sum.png';
import peoples from './assets/peoples.svg';
import confetti from './confettis.json';
import confetti2 from './confetti2.json';
import hb from './hb.json';

function App() {
    const [started, setStarted] = useState(false);
    const [delayedStarted, setDelayedStarted] = useState(false);
    const [ended, setEnded] = useState(false);
    const [delayedEnded, setDelayedEnded] = useState(false);
    const [audio, state, controls] = useAudio({
        src: music,
        autoPlay: false,
        preload: 'auto'
    });

    useEffect(() => {
        if (started && !state.playing) {
            setTimeout(() => {
                controls.play();
                setDelayedStarted(true);
            }, 4000);
        }
    }, [started]);

    useEffect(() => {
        if (delayedStarted && !state.playing) {
            setEnded(true);
            setTimeout(() => {
                setDelayedEnded(true);
            }, 4000);
        }
    }, [state]);

    const confetti1Options = {
        loop: true,
        autoplay: true,
        animationData: confetti,
    };

    const confetti2Options = {
        loop: true,
        autoplay: true,
        animationData: confetti2,
    };

    const hbOptions = {
        loop: false,
        autoplay: true,
        animationData: hb,
    };

    return (
        <>
            {audio}
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
                <div className="light1">
                    <img
                        src={light}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: '35vw',
                            width: '30px',
                            height: '30px',
                            zIndex: 10
                        }}
                    />
                    <div style={{left: "35.8vw", transition: "2s", opacity: delayedStarted ? 1 : 0}}
                         className="ray"></div>
                </div>

                <div className="light2">
                    <img
                        src={light}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: '65vw',
                            width: '30px',
                            height: '30px',
                            zIndex: 10
                        }}
                    />
                    <div style={{left: "65.8vw", transition: "2s", opacity: delayedStarted ? 1 : 0}}
                         className="ray"></div>
                </div>

                <div className="light3">
                    <div
                        style={{width: '100vh', height: '500px', zIndex: 11, left: "30vw", transition: "3s", opacity: delayedStarted ? 1 : 0}}
                        className={classNames("ray2", {"ray2-anim": delayedStarted})}
                    />
                </div>

                <div className="light4">
                    <div
                        style={{width: '100vh', height: '500px', zIndex: 11, left: "75vw", transition: "3s", opacity: delayedStarted ? 1 : 0}}
                        className={classNames("ray2", {"ray2-anim": delayedStarted})}
                    />
                </div>

                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden'
                    }}
                >
                    <img
                        className={classNames({sum: delayedStarted})}
                        style={{
                            position: 'absolute',
                            top: '40vh',
                            left: '38vw',
                            height: '30vh',
                            zIndex: 5,
                            opacity: delayedStarted ? 1 : 0,
                            transition: '2s',
                        }}
                        src={sum}
                    />

                    {started && (
                        <img
                            className={classNames('peoples', {'peoples-anim': delayedStarted})}
                            src={peoples}
                        />
                    )}
                </div>

                {(delayedStarted && !ended) && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            zIndex: 7,
                        }}
                    >
                        <Lottie options={confetti1Options}/>
                    </div>
                )}

                {(delayedEnded) && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 50,
                        }}
                    >
                        <div>
                            <Lottie options={hbOptions}/>
                        </div>
                    </div>
                )}

                {(delayedEnded) && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 50,
                        }}
                    >
                        <Lottie options={confetti2Options}/>
                    </div>
                )}

                <div id="stage">
                    {!started && (
                        <button
                            style={{
                                position: 'absolute',
                                top: 'calc(100vh/2)',
                                left: 'calc(100vw/2 - 100px)',
                                width: '200px',
                                zIndex: 1000,
                            }}
                            onClick={() => setStarted(true)}
                        >
                            Démarrer le show !
                        </button>
                    )}
                    <div id="curtain-left" className={classNames("curtain", {open: (started && !ended)})}></div>
                    <div id="curtain-right" className={classNames("curtain", {open: (started && !ended)})}></div>
                    <div id="balance" className={classNames("balance", {open: (started && !ended)})}></div>
                    <div className={classNames("spotlight", {open: (started && !ended)})}></div>
                </div>
            </div>
        </>
    )
}

export default App;
