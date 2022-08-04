import { renderError } from './dom';

const storedLocations = [
    { name: 'London, GB', lat: 51.5074, lon: -0.1278 },
    { name: 'Madrid, ES', lat: 40.4167, lon: -3.7036 },
    { name: 'Québec, CA', lat: 46.8137, lon: -71.2084 },
    { name: 'Kyoto, JP', lat: 35.021, lon: 135.7556 },
    { name: 'New York, US', lat: 40.7127, lon: -74.006 },
    { name: 'California, US', lat: 38.6287, lon: -92.566 },
    { name: 'Los Angeles, US', lat: 34.0537, lon: -118.2428 },
    { name: 'Moscow, RU', lat: 55.754, lon: 37.6204 },
];

const createLocation = (name, lat, lon) => {
    return { name, lat, lon };
};

const saveLocation = (name, lat, lon) => {
    const exists = storedLocations.some((obj) => {
        return obj.name === name;
    });

    if (exists) return renderError(`Already saved ${name}`);

    const newLocation = createLocation(name, lat, lon);
    storedLocations.unshift(newLocation);
    storedLocations.pop();
    return undefined;
};

export { storedLocations, saveLocation };
