import Lottie from "react-lottie";
import hb from '../hb.json';
import {Button, List, Modal, Image, ThemeIcon, Title} from "@mantine/core";
import {CiMicrophoneOn, CiMusicNote1, CiSliderVertical, CiUser} from "react-icons/ci";
import {useDisclosure} from "@mantine/hooks";

import studio from '../assets/studio.png';

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
                    <Title order={2}>Tu y as vraiment cru ?</Title>
                    <Image
                        radius="md"
                        src={studio}
                        h='90%'
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
                        gap: '100px',
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
                                    <ThemeIcon color="gray" size={48} radius="xl">
                                        <CiUser size="70%" />
                                    </ThemeIcon>
                                }
                            >
                                Paroles/Voix: <Title order={2}>Sumsun</Title>
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon color="gray" size={48} radius="xl">
                                        <CiMusicNote1 size="70%" />
                                    </ThemeIcon>
                                }
                            >
                                Prod: <Title order={2}>
                                    <Button
                                        component="a"
                                        href="https://litkidbeats.com/"
                                        target="_blank"
                                        variant="default"
                                    >
                                        LitKidBeats
                                    </Button>
                                </Title>
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon color="gray" size={48} radius="xl">
                                        <CiSliderVertical size="70%" />
                                    </ThemeIcon>
                                }
                            >
                                Mixage/Mastering: <Title order={2}>
                                    <Button
                                        component="a"
                                        href="https://discord.gg/gMUSCKvf5P"
                                        target="_blank"
                                        variant="default"
                                    >
                                        Tomish
                                    </Button>
                                </Title>
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon color="gray" size={48} radius="xl">
                                        <CiMicrophoneOn size="70%" />
                                    </ThemeIcon>
                                }
                            >
                                Studio d'enregistrement: <Title order={2}>
                                    <Button variant="default" onClick={open}>MyStudio By CocaCola</Button>
                                </Title>
                            </List.Item>
                        </List>
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
