import { fromUnixTime, getUnixTime } from 'date-fns';

export default function getCountryDate(timezone) {
    const date = new Date();

    const utcDate = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    );

    const unixTime = getUnixTime(utcDate) + timezone;

    return fromUnixTime(unixTime);
}
