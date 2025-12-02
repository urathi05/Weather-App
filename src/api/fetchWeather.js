import axios from 'axios';
import * as wc from "../utils/weatherCache";
import normalizeWeatherData from '../utils/normalizeWeather';

export default async function fetchWeather(latitude, longitude) {
    const key = `weather-cache-${latitude.toFixed(2)}-${longitude.toFixed(2)}`;

    const cachedData = wc.loadWeatherCache(key);

    if (cachedData) {
        return normalizeWeatherData(cachedData);
    }

    const apiKey = import.meta.env.VITE_TOMORROW_API_KEY;
    const forecastURL = `https://api.tomorrow.io/v4/weather/forecast?location=${latitude}%20${longitude}&apikey=${apiKey}`;
    const currentURL = `https://api.tomorrow.io/v4/weather/realtime?location=${latitude}%20${longitude}&apikey=${apiKey}`;

    try {
        const [forecastResponse, currentResponse] = await Promise.all([
            axios.get(forecastURL),
            axios.get(currentURL)
        ]);

        const forecastData = forecastResponse.data;
        const currentData = currentResponse.data;

        const hourly = forecastData.timelines.hourly;

        const weatherData = {
            current: currentData,
            hourly
        }

        wc.saveWeatherCache(key, weatherData);
        return normalizeWeatherData(weatherData);
    }   
    catch (error) {
        console.error("Error fetching weather data:", error);
    }
}