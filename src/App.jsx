import { useState, useCallback, useEffect } from 'react';
import { handleLocationSuccess, handleLocationFail } from './handlers/locationHandlers';
import { handleCitySelect } from './handlers/manualInputHandler';
import fetchCities from './api/fetchCities';
import './App.css';
import LoadingScreen from './screens/LoadingScreen/LoadingScreen';
import WeatherScreen from './screens/WeatherScreen/WeatherScreen';
import ManualScreen from './screens/ManualScreen/ManualScreen';
import handleRefresh from './handlers/refreshHandler';
import RefreshingScreen from './screens/RefreshingScreen/RefreshingScreen';

function App() {
  const [appState, setAppState] = useState("loading");
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    console.log("appState: ", appState);
    console.log("Weather data: ", weatherData);
    console.log("Location: ", location);
  }, [appState, weatherData, location]);

  const locationSuccessHandler = useCallback(async (coords) => {
    setLocation(coords);
    await handleLocationSuccess(coords, setAppState, setWeatherData);
  }, []);

  const locationFailHandler = useCallback(() => {
    handleLocationFail(setAppState);
  }, []);

  if (appState === "loading") {
    return (
      <LoadingScreen
        onLocationSuccess={locationSuccessHandler}
        onLocationFail={locationFailHandler}
      />
    );
  }

  if (appState === "refreshing") {
    return <RefreshingScreen/>;
  }

  if (appState === "weather") {
    return (
      <WeatherScreen data={weatherData} onRefresh={() => handleRefresh(location, setAppState, setWeatherData)}/>
    );
  }

  if (appState === "manual") {
    return (
      <ManualScreen searchApi={fetchCities} onCitySelect={handleCitySelect} setAppState={setAppState} setWeatherData={setWeatherData} />
    )
  }
}

export default App
