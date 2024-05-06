import { useState, useEffect } from 'react';
import App from "../App.tsx";
import {Title} from "@mantine/core";
import classNames from "classnames";

function CountdownTimer({ targetDate }: {targetDate: Date}) {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const remaining = calculateTimeRemaining();
            setTimeRemaining(remaining);
            if (!remaining) {
                setIsExpired(true);
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function calculateTimeRemaining() {
        const currentTime = new Date().getTime();
        const targetTime = new Date(targetDate).getTime();
        const difference = targetTime - currentTime;

        if (difference <= 0) {
            return null;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    if (isExpired) {
        return <App />;
    }

    return (
        <div id="stage">
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10000,
            }}>

                {timeRemaining && (
                    <>
                        <Title>Show disponible dans :</Title>
                        <Title>
                            {timeRemaining.hours < 10 ? `0${timeRemaining.hours}` : timeRemaining.hours }
                            :{timeRemaining.minutes < 10 ? `0${timeRemaining.minutes}` : timeRemaining.minutes }
                            :{timeRemaining.seconds < 10 ? `0${timeRemaining.seconds}` : timeRemaining.seconds }
                        </Title>
                    </>
                )}
            </div>
            <div id="curtain-left" className={classNames("curtain")}></div>
            <div id="curtain-right" className={classNames("curtain")}></div>
            <div id="balance" className={classNames("balance")}></div>
            <div className={classNames("spotlight")}></div>
        </div>
    )
        ;
}

export default CountdownTimer;
