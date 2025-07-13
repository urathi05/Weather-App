import { handleLocationSuccess } from "./locationHandlers";

export async function handleCitySelect(city, setAppState, setWeatherData) {
    const coords = {latitude: city.latitude, longitude: city.longitude}
    await handleLocationSuccess(coords, setAppState, setWeatherData);
}