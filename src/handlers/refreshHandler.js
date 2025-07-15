import fetchWeather from "../api/fetchWeather";

export default async function handleRefresh(coords, setAppState, setWeatherData) {
    console.log("REFRESH CLICKED");
    console.log(coords);
    console.log(`${coords.latitude}, ${coords.longitude}`);

    setAppState("refreshing");

    setTimeout(() => { }, 1000);

    const data = await fetchWeather(coords.latitude, coords.longitude)

    setWeatherData(data);
    setAppState("weather");
}