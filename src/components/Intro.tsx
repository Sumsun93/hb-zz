import {useEffect} from "react";
import {Button, Image, Text} from "@mantine/core";
import classNames from "classnames";
import {useAudio} from "react-use";

import zz from '../assets/zz.svg';
import miam from '../assets/miam.mp3';

const Intro = ({ended, started, setStarted}: {ended: boolean, started: boolean, setStarted: (state: boolean) => void}) => {
    const [audio, , controls] = useAudio({
        src: miam,
        autoPlay: false,
    })

    useEffect(() => {
        controls.volume(0.5)
    }, []);

    return (
        <div id="stage">
            {audio}
            {!started && (
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        zIndex: 1000,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: "50px"
                    }}
                >
                        <Image
                            src={zz}
                            h={"400px"}
                            w={"auto"}
                            style={{
                                filter: "drop-shadow(0 0 10px #D16ED5FF)",
                                pointerEvents: 'all',
                                cursor: 'pointer'
                            }}
                            onClick={controls.play}
                        />

                    <Button
                        color="#D16ED5FF"
                        style={{
                            width: '200px',
                            pointerEvents: "all"
                        }}
                        onClick={() => setStarted(true)}
                    >
                        Démarrer le show !
                    </Button>

                    <Text style={{textAlign: 'center'}}>
                        Assures-toi d'avoir l'accélération matérielle/graphique d'activée sur ton navigateur.
                        <br />
                        Une fois le show démarré, tu peux régler le volume en bas de l'écran !
                    </Text>
                </div>
            )}
            <div id="curtain-left" className={classNames("curtain", {open: (started && !ended)})}></div>
            <div id="curtain-right" className={classNames("curtain", {open: (started && !ended)})}></div>
            <div id="balance" className={classNames("balance", {open: (started && !ended)})}></div>
            <div className={classNames("spotlight", {open: (started && !ended)})}></div>
        </div>
    )
}

export default Intro
