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

getWeather('London');
