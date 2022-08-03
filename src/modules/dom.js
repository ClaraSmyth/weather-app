import { format, fromUnixTime } from 'date-fns';
import getCountryDate from './convert-date';

const createExtraElements = () => {
    const container = document.createElement('div');
    const titlePara = document.createElement('p');
    const img = document.createElement('img');
    const tempContainer = document.createElement('div');

    container.classList.add('card-extra-item');
    titlePara.classList.add('card-extra-title');
    img.classList.add('card-extra-img');
    tempContainer.classList.add('card-extra-temp');

    return [container, titlePara, img, tempContainer];
};

const createHourlyItem = (country, index) => {
    const [container, titlePara, img, tempContainer] = createExtraElements();
    const tempPara = document.createElement('p');

    tempPara.classList.add('card-extra-temp-current');

    titlePara.innerText = format(fromUnixTime(country.hourly[index].dt), 'p');
    img.src = `http://openweathermap.org/img/wn/${country.hourly[index].weather[0].icon}@4x.png`;
    tempPara.innerText = `${Math.round(country.hourly[index].temp)}°`;

    tempContainer.append(tempPara);

    container.append(titlePara, img, tempContainer);

    return container;
};

const createDailyItem = (country, day) => {
    const [container, titlePara, img, tempContainer] = createExtraElements();
    const maxTempPara = document.createElement('p');
    const minTempPara = document.createElement('p');

    maxTempPara.classList.add('card-extra-temp-max');
    minTempPara.classList.add('card-extra-temp-min');

    tempContainer.append(maxTempPara, minTempPara);

    titlePara.innerText = format(fromUnixTime(day.dt), 'EEE, do');
    img.src = `http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`;
    maxTempPara.innerText = `${Math.round(day.temp.max)}°`;
    minTempPara.innerText = `${Math.round(day.temp.min)}°`;

    tempContainer.append(maxTempPara, minTempPara);

    container.append(titlePara, img, tempContainer);

    return container;
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
    icon.src = `http://openweathermap.org/img/wn/${country.weather[0].icon}@4x.png`;
};

const renderExtra = (country) => {
    const extraHourly = document.querySelector('.card-extra-hourly');
    const extraDaily = document.querySelector('.card-extra-daily');

    extraHourly.textContent = '';
    extraDaily.textContent = '';

    country.daily.forEach((day, index) => {
        const hourlyItem = createHourlyItem(country, index);
        const dailyItem = createDailyItem(country, day);
        extraHourly.append(hourlyItem);
        extraDaily.append(dailyItem);
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
