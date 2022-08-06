import getWeather from './modules/api';
import { toggleModalBg } from './modules/dom';
import { lastSearched, saveLocation } from './modules/storage';
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

const hourlyBtn = document.querySelector('.card-hourly-open');
hourlyBtn.addEventListener('click', () => {
    const extraCard = document.querySelector('.card-extra');
    const extraCardHourly = document.querySelector('.card-extra-hourly');
    const extraCardDaily = document.querySelector('.card-extra-daily');
    const extraCardHeader = document.querySelector('.card-extra-header');

    extraCardHeader.innerText = 'Hourly Weather';
    extraCardHourly.classList.remove('display-none');
    extraCardDaily.classList.add('display-none');
    extraCard.classList.add('is-active');

    toggleModalBg();
});

const dailyBtn = document.querySelector('.card-daily-open');
dailyBtn.addEventListener('click', () => {
    const extraCard = document.querySelector('.card-extra');
    const extraCardDaily = document.querySelector('.card-extra-daily');
    const extraCardHourly = document.querySelector('.card-extra-hourly');
    const extraCardHeader = document.querySelector('.card-extra-header');

    extraCardHeader.innerText = 'Daily Weather';
    extraCardDaily.classList.remove('display-none');
    extraCardHourly.classList.add('display-none');
    extraCard.classList.add('is-active');

    toggleModalBg();
});

const closeExtraBtn = document.querySelector('.card-extra-close');
closeExtraBtn.addEventListener('click', () => {
    const extraCard = document.querySelector('.card-extra');
    extraCard.classList.remove('is-active');

    toggleModalBg();
});

const saveBtn = document.querySelector('.card-save');
saveBtn.addEventListener('click', () => {
    const location = document.querySelector('.card-location');

    const locationName = location.innerText;
    const locationLat = location.dataset.lat;
    const locationLon = location.dataset.lon;

    saveLocation(locationName, locationLat, locationLon);
    getWeather(location.innerText);
});

const storageBtn = document.querySelector('.card-saved-btn');
storageBtn.addEventListener('click', () => {
    const storedSection = document.querySelector('.stored');
    const storedItems = document.querySelectorAll('.stored-item');

    storedSection.classList.toggle('is-active');

    storedItems.forEach((item) => {
        item.classList.toggle('is-active');
    });
});

const storedItems = document.querySelectorAll('.stored-item');
storedItems.forEach((item) => {
    item.addEventListener('click', () => {
        getWeather(item.childNodes[0].innerText);
    });
});

getWeather(lastSearched);
