import { renderMain, renderError, renderExtra, loadingAnimation, renderStoredItems } from './dom';
import { storedLocations, updateLastSearched } from './storage';

const getStoredWeather = (units) => {
    storedLocations.forEach(async (location, index) => {
        try {
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=${units}&appid=81383e7bd599e45d7534726f6e06fab2`
            );
            if (!weatherResponse.ok) throw new Error(weatherResponse.statusText);

            const weather = await weatherResponse.json();

            renderStoredItems(weather, index);
        } catch (error) {
            // console.error(error.message);
            renderError('Sorry, something went wrong!');
        }
    });
};

const getWeather = async (input) => {
    try {
        loadingAnimation();
        const unitCheckbox = document.querySelector('.card-units-checkbox');
        const units = unitCheckbox.checked ? 'imperial' : 'metric';

        const inputResponse = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=81383e7bd599e45d7534726f6e06fab2`
        );
        if (!inputResponse.ok) throw new Error(inputResponse.statusText);

        const location = await inputResponse.json();
        if (!location.length) throw new Error('NOT FOUND');

        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location[0].lat}&lon=${location[0].lon}&units=${units}&appid=81383e7bd599e45d7534726f6e06fab2`
        );
        if (!weatherResponse.ok) throw new Error(weatherResponse.statusText);

        const extraResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${location[0].lat}&lon=${location[0].lon}&exclude=current,minutely,alerts&units=${units}&appid=81383e7bd599e45d7534726f6e06fab2`
        );
        if (!extraResponse.ok) throw new Error(extraResponse.statusText);

        const weather = await weatherResponse.json();
        const extra = await extraResponse.json();

        renderMain(weather);
        renderExtra(extra);
        updateLastSearched(weather.name);
        loadingAnimation();
        getStoredWeather(units);
    } catch (error) {
        loadingAnimation();
        // console.error(error.message);
        if (error.message !== 'NOT FOUND') renderError('Sorry, something went wrong!');
        if (error.message === 'NOT FOUND') renderError(`Sorry, we couldn't find ${input}`);
    }
};

export default getWeather;
