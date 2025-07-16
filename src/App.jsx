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

  let screen;

  if (appState === "loading") {
    screen = (
      <LoadingScreen
        onLocationSuccess={locationSuccessHandler}
        onLocationFail={locationFailHandler}
      />
    );
  } else if (appState === "refreshing") {
    screen = <RefreshingScreen />;
  } else if (appState === "weather") {
    screen = (
      <WeatherScreen
        data={weatherData}
        onRefresh={() => handleRefresh(location, setAppState, setWeatherData)}
      />
    );
  } else if (appState === "manual") {
    screen = (
      <ManualScreen
        searchApi={fetchCities}
        onCitySelect={handleCitySelect}
        setAppState={setAppState}
        setWeatherData={setWeatherData}
      />
    );
  }

  return <div className="app-screen">{screen}</div>;
}

export default App;
