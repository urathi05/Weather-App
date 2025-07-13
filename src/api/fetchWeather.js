import { fetchWeatherApi } from 'openmeteo';
import * as wc from "../utils/weatherCache";

export default async function fetchWeather(latitude, longitude) {
    const key = `weather-cache-${latitude.toFixed(2)}-${longitude.toFixed(2)}`;

    const cachedData = wc.loadWeatherCache(key);

    if (cachedData) {
        return cachedData;
    }

    const params = {
        "latitude": latitude,
        "longitude": longitude,
        "hourly": ["temperature_2m", "weather_code", "precipitation_probability", "apparent_temperature"],
	    "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "weather_code", "precipitation", "wind_speed_10m", "wind_direction_10m"],
        "timezone": "auto"
    };
    const url = "https://api.open-meteo.com/v1/forecast";

    const responses = await fetchWeatherApi(url, params);

    console.log(responses[0]);

    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const lat = response.latitude();
    const long = response.longitude();

    const current = response.current();
    const hourly = response.hourly();

    console.log("WEATHER DATA: ", response);

    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0).value(),
            relativeHumidity2m: current.variables(1).value(),
            apparentTemperature: current.variables(2).value(),
            weatherCode: current.variables(3).value(),
            precipitation: current.variables(4).value(),
            windSpeed10m: current.variables(5).value(),
            windDirection10m: current.variables(6).value(),
        },
        hourly: {
            time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0).valuesArray(),
            weatherCode: hourly.variables(1).valuesArray(),
            precipitationProbability: hourly.variables(2).valuesArray(),
            apparentTemperature: hourly.variables(3).valuesArray(),
        },
    };

    wc.saveWeatherCache(key, weatherData);

    return weatherData;
};