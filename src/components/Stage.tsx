import light from "../assets/light.svg";
import classNames from "classnames";
import sum from "../assets/Sum.png";
import mic from "../assets/mic.svg";
import peoples from "../assets/peoples.svg";
import Lottie from "react-lottie";
import confetti from "../confettis.json";
import {HTMLMediaState} from "react-use/lib/factory/createHTMLMediaHook";

const Stage = ({delayedStarted, started, ended, state}: {delayedStarted: boolean, started: boolean, ended: boolean, state: HTMLMediaState}) => {
    const confetti1Options = {
        loop: true,
        autoplay: true,
        animationData: confetti,
    };

    return (
        <>
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
                <div style={{left: "35.8vw", transition: "2s", opacity: state.playing ? 1 : 0}} className="ray"/>
            </div>

            <div className="light1">
                <img
                    src={light}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '29vw',
                        width: '30px',
                        height: '30px',
                        zIndex: 10
                    }}
                />
                <div style={{left: "30vw", transition: "2s", opacity: state.playing ? 1 : 0}} className="ray"/>
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
                <div style={{left: "65.8vw", transition: "2s", opacity: state.playing ? 1 : 0}}
                     className="ray"></div>
            </div>

            <div className="light2">
                <img
                    src={light}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '70vw',
                        width: '30px',
                        height: '30px',
                        zIndex: 10
                    }}
                />
                <div style={{left: "71vw", transition: "2s", opacity: state.playing ? 1 : 0}}
                     className="ray"></div>
            </div>

            <div className="light3">
                <div
                    style={{
                        width: '100vh',
                        height: '500px',
                        zIndex: 11,
                        left: "30vw",
                        transition: "3s",
                        opacity: state.playing ? 1 : 0
                    }}
                    className={classNames("ray2", {"ray2-anim": state.playing})}
                />
            </div>

            <div className="light4">
                <div
                    style={{
                        width: '100vh',
                        height: '500px',
                        zIndex: 11,
                        left: "75vw",
                        transition: "3s",
                        opacity: state.playing ? 1 : 0
                    }}
                    className={classNames("ray2", {"ray2-anim": state.playing})}
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
                    className={classNames({sum: state.playing})}
                    style={{
                        position: 'absolute',
                        top: '39vh',
                        left: '38vw',
                        height: '30vh',
                        zIndex: 5,
                        opacity: delayedStarted ? 1 : 0,
                        transition: '2s',
                    }}
                    src={sum}
                />
                <img
                    style={{
                        position: 'absolute',
                        top: '51vh',
                        left: '48vw',
                        height: '20vh',
                        zIndex: 5,
                        opacity: delayedStarted ? 1 : 0,
                        transition: '2s',
                    }}
                    src={mic}
                />

                {started && (
                    <img
                        className={classNames('peoples', {'peoples-anim': state.playing})}
                        src={peoples}
                    />
                )}
            </div>

            {(delayedStarted && !ended && state.playing) && (
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
        </>
    )
}

export default Stage
