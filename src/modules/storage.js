import { renderError, animateBookmark } from './dom';

const LOCAL_STORAGE_LOCATION_KEY = 'weatherapp.location';
const storedLocations = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LOCATION_KEY)) || [
    { name: 'London, GB', lat: 51.5074, lon: -0.1278 },
    { name: 'Amsterdam, NL', lat: 52.3667, lon: 4.8945 },
    { name: 'Québec, CA', lat: 46.8137, lon: -71.2084 },
    { name: 'Kyoto, JP', lat: 35.021, lon: 135.7556 },
    { name: 'New York, US', lat: 40.7127, lon: -74.006 },
    { name: 'California, US', lat: 38.6287, lon: -92.566 },
    { name: 'Los Angeles, US', lat: 34.0537, lon: -118.2428 },
    { name: 'Moscow, RU', lat: 55.754, lon: 37.6204 },
];

const LOCAL_STORAGE_LASTSEARCHED_KEY = 'weatherapp.lastSearched';
const lastSearched = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LASTSEARCHED_KEY)) || ['London'];

const updateLastSearched = (name) => {
    lastSearched.splice(0, 1, name);
    localStorage.setItem(LOCAL_STORAGE_LASTSEARCHED_KEY, JSON.stringify(lastSearched));
};

const createLocation = (name, lat, lon) => {
    return { name, lat, lon };
};

const checkStorage = (name) => {
    return storedLocations.some((obj) => {
        return obj.name === name;
    });
};

const saveLocation = (name, lat, lon) => {
    const exists = checkStorage(name);

    if (exists) {
        animateBookmark(exists);
        return renderError(`Already saved ${name}`);
    }

    const newLocation = createLocation(name, lat, lon);
    storedLocations.unshift(newLocation);
    storedLocations.pop();
    localStorage.setItem(LOCAL_STORAGE_LOCATION_KEY, JSON.stringify(storedLocations));
    return undefined;
};

export { storedLocations, lastSearched, updateLastSearched, checkStorage, saveLocation };
