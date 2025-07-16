import { handleLocationSuccess } from "./locationHandlers";

export async function handleCitySelect(city, setAppState, setWeatherData, setLocation) {
    const coords = {latitude: city.latitude, longitude: city.longitude}
    setLocation(coords);
    await handleLocationSuccess(coords, setAppState, setWeatherData);
}