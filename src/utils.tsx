export const timeToSeconds = (time: string) => {
    const [hms, ms] = time.split('.');
    const [hours, minutes, seconds] = hms.split(':').map(parseFloat);
    return hours * 3600 + minutes * 60 + seconds + parseFloat('0.' + ms);
};
