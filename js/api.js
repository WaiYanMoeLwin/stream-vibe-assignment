import apiKey from './config.js';

const cacheStorage = window.localStorage;
const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const saveToCache = (key, data) => {
    const cacheData = {
        data: data,
        cachedTimestamp: new Date().toISOString()
    };
    cacheStorage.setItem(key, JSON.stringify(cacheData));
};

const getFromCache = (key) => {
    const cachedData = cacheStorage.getItem(key);
    if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const cacheTimestamp = new Date(parsedData.cachedTimestamp);
        const now = new Date();
        if ((now - cacheTimestamp) < cacheDuration) {
            return parsedData.data;
        } else {
            cacheStorage.removeItem(key); // Remove expired cache
        }
    }
    return null;
};

const api = {
    fetchMoviesAndShows: async () => {
        const response = await fetch('temp/mock-movie-data.json');
        if (!response.ok) {
            console.error('Failed to fetch movies and shows');
        }
        return response.json();
    },
    fetchFAQs: async () => {
        const response = await fetch('temp/faqs.json');
        if (!response.ok) {
            console.error('Failed to fetch FAQs');
        }
        return response.json();
    },
    fetchDevices: async () => {
        const response = await fetch('temp/devices.json');
        if (!response.ok) {
            console.error('Failed to fetch devices');
        }
        return response.json();
    },
    fetchPricingPlans: async () => {
        const response = await fetch('temp/pricing-plans.json');
        if (!response.ok) {
            console.error('Failed to fetch pricing plans');
        }
        return response.json();
    },
    fetchContentLists: async () => {
        const response = await fetch('temp/mock-content-list.json');
        if (!response.ok) {
            console.error('Failed to fetch content lists');
        }
        return response.json();
    },
    fetchContentDetails: async (name, season=null, episode=null) => {
        const cacheKey = `${name}-${season}-${episode}`;
        const cachedData = getFromCache(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        const url = `https://www.omdbapi.com/?apiKey=${apiKey}&t=${encodeURIComponent(name)}${season ? `&Season=${season}` : ''}${episode ? `&Episode=${episode}` : ''}`;
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Failed to fetch content details');
        }
        const data = await response.json();
        saveToCache(cacheKey, data); // Save the data to cache
        return data;
    },
    fetchContentDetailsById: async (id) => {
        const cacheKey = `id-${id}`;
        const cachedData = getFromCache(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        const url = `https://www.omdbapi.com/?apiKey=${apiKey}&i=${encodeURIComponent(id)}`;
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Failed to fetch content details by ID');
        }
        const data = await response.json();
        saveToCache(cacheKey, data); // Save the data to cache
        return data;
    }
};

export default api;