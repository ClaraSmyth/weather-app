import { format, fromUnixTime } from 'date-fns';
import getCountryDate from './convert-date';

const createExtraElements = () => {
    const div = document.createElement('div');
    const timePara = document.createElement('p');
    const img = document.createElement('img');
    const tempPara = document.createElement('p');

    div.classList.add('card-extra-item');
    timePara.classList.add('card-extra-time');
    img.classList.add('card-extra-img');
    tempPara.classList.add('card-extra-temp');

    return [div, timePara, img, tempPara];
};

const renderMain = (country) => {
    const location = document.querySelector('.card-location');
    const day = document.querySelector('.card-day');
    const date = document.querySelector('.card-date');
    const time = document.querySelector('.card-time');
    const temp = document.querySelector('.card-temp');
    const desc = document.querySelector('.card-desc');
    const icon = document.querySelector('.card-icon');

    const countryDate = format(getCountryDate(country.timezone), 'EEEE~do MMM R~p');
    const [currentDay, currentDate, currentTime] = countryDate.split('~');

    location.innerText = `${country.name}, ${country.sys.country}`;
    day.innerText = currentDay;
    date.innerText = currentDate;
    time.innerText = currentTime;
    temp.innerText = `${Math.round(country.main.temp)}°`;
    desc.innerText = country.weather[0].description;
    icon.src = `http://openweathermap.org/img/wn/${country.weather[0].icon}@2x.png`;
};

const renderExtra = (country) => {
    const extraHourly = document.querySelector('.card-extra-hourly');
    const extraDaily = document.querySelector('.card-extra-daily');

    extraHourly.textContent = '';

    country.daily.forEach((day, index) => {
        const [div, timePara, img, tempPara] = createExtraElements();

        timePara.innerText = format(fromUnixTime(country.hourly[index].dt), 'p');
        img.src = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        tempPara.innerText = `${Math.round(country.hourly[index].temp)}°`;

        div.append(timePara, img, tempPara);
        extraHourly.append(div);
    });
};

const renderError = (error) => {
    const errorDiv = document.querySelector('.card-error');
    const errorText = document.querySelector('.card-error-text');

    errorText.innerText = error;
    errorDiv.classList.add('is-active');
    setTimeout(() => errorDiv.classList.remove('is-active'), 3000);
};

export { renderMain, renderExtra, renderError };
