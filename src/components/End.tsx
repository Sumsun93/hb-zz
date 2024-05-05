import Lottie from "react-lottie";
import hb from '../hb.json';
import {Button, List, Modal, Image, ThemeIcon, Title} from "@mantine/core";
import {CiMicrophoneOn, CiMusicNote1, CiSliderVertical, CiUser} from "react-icons/ci";
import {useDisclosure} from "@mantine/hooks";

import studio from '../assets/studio.webp';
import {AiOutlineDownload} from "react-icons/ai";
import {MdOutlineReplay} from "react-icons/md";

import music from '../assets/musique.wav';

const End = ({delayedEnded}: {delayedEnded: boolean}) => {
    const [opened, { open, close }] = useDisclosure(false);

    const hbOptions = {
        loop: false,
        autoplay: true,
        animationData: hb
    };

    return (
        <>
            <Modal opened={opened} onClose={close} size={"auto"} centered>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '50vh',
                }}>
                    <Image
                        radius="md"
                        src={studio}
                        h='100%'
                        w='auto'
                    />
                </div>
            </Modal>

            {(delayedEnded) && (
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '50px',
                        zIndex: 50,
                    }}
                >
                    <div>
                        <Lottie options={hbOptions}/>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: "20px"
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Title order={1}>
                                Crédits
                            </Title>
                        </div>
                        <List
                            spacing="xs"
                            size="sm"
                            center
                        >
                            <List.Item
                                icon={
                                    <ThemeIcon color="#D16ED593" size={48} radius="xl">
                                        <CiUser size="70%" />
                                    </ThemeIcon>
                                }
                            >
                                Paroles/Voix: <Title c="#D16ED5FF" order={2}>Sumsun</Title>
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon color="#D16ED593" size={48} radius="xl">
                                        <CiMusicNote1 size="70%" />
                                    </ThemeIcon>
                                }
                            >
                                Prod: <Title order={2}>
                                    <Button
                                        component="a"
                                        href="https://litkidbeats.com/"
                                        target="_blank"
                                        variant="light"
                                        color="#D16ED5FF"
                                    >
                                        LitKidBeats
                                    </Button>
                                </Title>
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon color="#D16ED593" size={48} radius="xl">
                                        <CiSliderVertical size="70%" />
                                    </ThemeIcon>
                                }
                            >
                                Mixage/Mastering: <Title order={2}>
                                    <Button
                                        component="a"
                                        href="https://discord.gg/gMUSCKvf5P"
                                        target="_blank"
                                        variant="light"
                                        color="#D16ED5FF"
                                    >
                                        Tomish
                                    </Button>
                                </Title>
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon color="#D16ED593" size={48} radius="xl">
                                        <CiMicrophoneOn size="70%" />
                                    </ThemeIcon>
                                }
                            >
                                Studio d'enregistrement: <Title order={2}>
                                    <Button
                                        variant="light"
                                        color="#D16ED5FF"
                                        onClick={open}
                                    >MyStudio By CocaCola</Button>
                                </Title>
                            </List.Item>
                        </List>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px"
                        }}
                    >
                        <Button
                            variant="outline"
                            color="#D16ED5FF"
                            rightSection={<AiOutlineDownload size={24} />}
                            component="a"
                            href={music}
                            target="_blank"
                        >
                            Télécharger la musique
                        </Button>
                        <Button
                            onClick={() => window.location.reload()}
                            variant="filled"
                            color="#D16ED5FF"
                            rightSection={<MdOutlineReplay size={24} />}
                        >
                            Redémarrer le show
                        </Button>
                    </div>
                </div>
            )}

            {/*(delayedEnded) && (
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
                        pointerEvents: "none"
                    }}
                >
                    <Lottie options={confetti2Options}/>
                </div>
            )*/}
        </>
    )
}

export default End
