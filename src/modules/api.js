import { renderInfo, renderError } from './dom';

const getWeather = async (input) => {
    try {
        const unitCheckbox = document.querySelector('.card-units-checkbox');
        const units = unitCheckbox.checked ? 'imperial' : 'metric';

        const inputResponse = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=81383e7bd599e45d7534726f6e06fab2`
        );
        if (!inputResponse.ok) throw new Error(inputResponse.statusText);

        const location = await inputResponse.json();
        if (!location.length) throw new Error('NOT FOUND');

        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location[0].lat}&lon=${location[0].lon}&units=${units}&appid=81383e7bd599e45d7534726f6e06fab2`
        );
        if (!weatherResponse.ok) throw new Error(weatherResponse.statusText);

        const weather = await weatherResponse.json();

        renderInfo(weather);
    } catch (error) {
        console.error(error.message);
        if (error.message !== 'NOT FOUND') renderError('Sorry, something went wrong!');
        if (error.message === 'NOT FOUND') renderError(`Sorry, we couldn't find ${input}`);
    }
};

export default getWeather;
