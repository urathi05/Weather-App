import fetchWeather from "../api/fetchWeather";

export async function handleLocationSuccess(coords, setAppState, setWeatherData) {
    console.log("Handling location success:", coords);

    const { latitude, longitude } = coords;

    try {
        const weatherData = await fetchWeather(latitude, longitude);
        console.log("Weather data fetched:", weatherData);
        setWeatherData(weatherData);
        setAppState("weather");
    }
    catch (error) {
        console.error("Error fetching weather:", error);
        setAppState("manual");
    }
}


export function handleLocationFail(setAppState){
    setAppState("manual");
}