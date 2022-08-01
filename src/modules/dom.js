import { format } from 'date-fns';
import getCountryDate from './convert-date';

const renderInfo = (country) => {
    const location = document.querySelector('.card-location');
    const date = document.querySelector('.card-date');
    const time = document.querySelector('.card-time');
    const temp = document.querySelector('.card-temp');
    const desc = document.querySelector('.card-desc');
    const icon = document.querySelector('.card-icon');

    const [currentDate, currentTime] = format(getCountryDate(country.timezone), 'do MMM R~p').split('~');

    location.innerText = `${country.name}, ${country.sys.country}`;
    date.innerText = currentDate;
    time.innerText = currentTime;
    temp.innerText = country.main.temp;
    desc.innerText = country.weather[0].description;
    icon.src = `http://openweathermap.org/img/wn/${country.weather[0].icon}@2x.png`;
};

export default renderInfo;
