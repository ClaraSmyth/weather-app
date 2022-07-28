import renderInfo from './dom';

const getWeather = async (input) => {
    const inputResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=81383e7bd599e45d7534726f6e06fab2`,
        { mode: 'cors' }
    );
    const location = await inputResponse.json();

    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location[0].lat}&lon=${location[0].lon}&units=metric&appid=81383e7bd599e45d7534726f6e06fab2`,
        { mode: 'cors' }
    );
    const weather = await weatherResponse.json();

    console.log(location);
    console.log(weather);
    renderInfo(weather);
};

export default getWeather;
