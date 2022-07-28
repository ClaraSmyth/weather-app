import format from 'date-fns/format';

const renderInfo = (weather) => {
    const location = document.querySelector('.card-location');
    const date = document.querySelector('.card-date');
    const time = document.querySelector('.card-time');
    const temp = document.querySelector('.card-temp');

    const [currentDate, currentTime] = format(new Date(), 'do MMM y~p').split('~');

    location.innerText = weather.name;
    date.innerText = currentDate;
    time.innerText = currentTime;
    temp.innerText = weather.main.temp;
};

export default renderInfo;
