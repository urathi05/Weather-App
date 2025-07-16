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
  const current = data.current;
  const Icon = weatherCodeToIcon[current.weatherCode];

  return (
    <div className="current-weather">
      <div className="weather-icon-temp">
        {Icon && <Icon size={24} />}
        <h1>{current.temperature2m.toFixed(1)}°C</h1>
      </div>

      <div className="details-grid">
        <p>Feels like: {current.apparentTemperature.toFixed(1)}°C</p>
        <p>Humidity: {current.relativeHumidity2m}%</p>
        <p>Wind: {current.windSpeed10m.toFixed(1)} km/h {degToDir(current.windDirection10m)}</p>
        <p>Precipitation: {current.precipitation.toFixed(1)} mm</p>
      </div>

      <button className="refresh-button" onClick={onRefresh}>Refresh</button>
    </div>

  );
}
