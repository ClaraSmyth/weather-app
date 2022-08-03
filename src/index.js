import getWeather from './modules/api';
import './styles/styles.scss';

const form = document.querySelector('.card-search');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = document.querySelector('.card-search-input');
    getWeather(userInput.value);
    userInput.value = '';
});

const unitCheckbox = document.querySelector('.card-units-checkbox');
unitCheckbox.addEventListener('click', () => {
    const currentCity = document.querySelector('.card-location');
    getWeather(currentCity.innerText);
});

const openHourly = document.querySelector('.card-hourly-open');
openHourly.addEventListener('click', () => {
    const extraCard = document.querySelector('.card-extra');
    extraCard.classList.add('is-active');
});

const closeExtra = document.querySelector('.card-extra-close');
closeExtra.addEventListener('click', () => {
    const extraCard = document.querySelector('.card-extra');
    extraCard.classList.remove('is-active');
});

getWeather('London');
