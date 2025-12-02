import './CurrentWeather.css';
import DEGREES_TO_CARDINAL from '../../../const/directions';
import weatherCodeToIcon from '../../../const/weatherIcons';

function degToDir(deg) {
  for (const d of DEGREES_TO_CARDINAL) {
    if (deg >= d.start && deg <= d.end) {
      return d.value
    }
  }
}

export default function CurrentWeather({ data, onRefresh }) {
  const current = data.current.data.values;
  console.log("Current Weather Data:", current);
  const Icon = weatherCodeToIcon[current.weatherCode];

  return (
    <div className="current-weather">
      <div className="weather-icon-temp">
        {Icon && <Icon size={24} />}
        <h1>{current.temperature.toFixed(1)}°C</h1>
      </div>

      <div className="details-grid">
        <p>Feels like: {current.temperatureApparent.toFixed(1)}°C</p>
        <p>Humidity: {current.humidity}%</p>
        <p>Wind: {current.windSpeed.toFixed(1)} km/h {degToDir(current.windDirection)}</p>
        <p>Precipitation: {current.rainIntensity.toFixed(1)} mm</p>
      </div>

      <button className="refresh-button" onClick={onRefresh}>Refresh</button>
    </div>

  );
}
