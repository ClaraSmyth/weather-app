import getWeather from './modules/api';
import './styles/styles.scss';

const form = document.querySelector('.card-search');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = document.querySelector('.card-search-input');
    getWeather(userInput.value);
    userInput.value = '';
});

getWeather('London');
