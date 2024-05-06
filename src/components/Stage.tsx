import light from "../assets/light.svg";
import classNames from "classnames";
import sum from "../assets/Sum.png";
import mic from "../assets/mic.svg";
import peoples from "../assets/peoples.svg";
import chair from '../assets/chair.svg';
import cardboard from '../assets/cardboard.svg';
import Lottie from "react-lottie";
import hearts from "../hearts.json";
import {HTMLMediaState} from "react-use/lib/factory/createHTMLMediaHook";
import {DetailedHTMLProps, ImgHTMLAttributes} from "react";
import {timeToSeconds} from "../utils.tsx";

const Stage = ({delayedStarted, started, ended, state, isChorus}: {delayedStarted: boolean, started: boolean, ended: boolean, state: HTMLMediaState, isChorus: boolean}) => {
    const confetti1Options = {
        loop: true,
        autoplay: true,
        animationData: hearts,
    };

    const chairVisible = state.time >= 51;
    const cardBoardVisible = state.time >= 111;

    const sideSums = {
        left: {
            position: 'absolute',
            top: '30vh',
            left: '-5vw',
            height: '30vh',
            transform: "rotate(90deg)",
            zIndex: 5,
        },
        right: {
            position: 'absolute',
            top: '30vh',
            right: '-5vw',
            height: '30vh',
            transform: "rotate(-90deg) scaleX(-1)",
            zIndex: 5,
        }
    }

    const leftSums = [
        {start: "00:00:14.858", end: "00:00:16.028"},
        {start: "00:00:28.644", end: "00:00:29.757"},
        {start: "00:01:08.687", end: "00:01:09.686"},
        {start: "00:01:21.572", end: "00:01:22.813"},
        {start: "00:02:01.715", end: "00:02:03.057"},
        {start: "00:02:15.030", end: "00:02:16.471"},
    ]

    const rightSums = [
        {start: "00:00:21.972", end: "00:00:23.143"},
        {start: "00:00:34.830", end: "00:00:36.256"},
        {start: "00:01:15.372", end: "00:01:16.557"},
        {start: "00:01:28.602", end: "00:01:30.024"},
        {start: "00:02:08.358", end: "00:02:09.914"},
        {start: "00:02:21.858", end: "00:02:23.214"},
    ]

    const isLeft = leftSums.some(s => state.time >= timeToSeconds(s.start) && state.time <= timeToSeconds(s.end))
    const isRight = rightSums.some(s => state.time >= timeToSeconds(s.start) && state.time <= timeToSeconds(s.end))

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
                        opacity: isChorus ? 1 : 0
                    }}
                    className={classNames("ray2", {"ray2-anim": isChorus})}
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
                        opacity: isChorus ? 1 : 0
                    }}
                    className={classNames("ray2", {"ray2-anim": isChorus})}
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
                <div className={classNames({["sum-wrapper"]: state.playing})}>
                    <img
                        className={classNames({sum: isChorus})}
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
                </div>
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

                {(isLeft || isRight) && (
                    <img
                        className={classNames({sideSumLeft: isLeft, sideSumRight: isRight})}
                        style={sideSums[isLeft ? 'left' : 'right'] as DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>}
                        src={sum}
                    />
                )}

                {chairVisible && (
                    <img
                        className="chair"
                        src={chair}
                    />
                )}

                {cardBoardVisible && (
                    <img
                        className="cardboard"
                        src={cardboard}
                    />
                )}

                {started && (
                    <>
                        <img
                            className={classNames('peoples2', {
                                'peoples-anim': state.playing,
                                'peoples-anim-chorus': isChorus
                            })}
                            src={peoples}
                        />
                        <img
                            className={classNames('peoples', {
                                'peoples-anim': state.playing,
                                'peoples-anim-chorus': isChorus
                            })}
                            src={peoples}
                        />
                    </>
                )}
            </div>

            {(delayedStarted && !ended && state.playing && isChorus) && (
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        zIndex: 10,
                        opacity: 0.5
                    }}
                >
                    <Lottie options={confetti1Options}/>
                </div>
            )}
        </>
    )
}

export default Stage
