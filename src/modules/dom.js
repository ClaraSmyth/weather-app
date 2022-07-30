import { format, getUnixTime, fromUnixTime, formatISO } from 'date-fns';

const renderInfo = (weather) => {
    const location = document.querySelector('.card-location');
    const date = document.querySelector('.card-date');
    const time = document.querySelector('.card-time');
    const temp = document.querySelector('.card-temp');
    const desc = document.querySelector('.card-desc');
    const icon = document.querySelector('.card-icon');

    const unixTime = getUnixTime(new Date());
    const unixToUtc = fromUnixTime(unixTime + weather.timezone).toUTCString();
    console.log(new Date());
    console.log(new Date(unixToUtc));

    const [currentDate, currentTime] = format(fromUnixTime(unixTime), 'do MMM R~p').split('~');

    location.innerText = `${weather.name}, ${weather.sys.country}`;
    date.innerText = currentDate;
    time.innerText = currentTime;
    temp.innerText = weather.main.temp;
    desc.innerText = weather.weather[0].description;
    icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
};

export default renderInfo;
