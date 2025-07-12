import "./ForecastWeather.css";
import weatherCodeToIcon from "../../../const/weatherIcons";

function normalizeHourlyField(field) {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === "object") return Object.values(field);
  return [];
}

export default function ForecastWeather({ data }) {
  const hourly = data.hourly;

  // Normalize each field
  const time = normalizeHourlyField(hourly.time);
  const temperature2m = normalizeHourlyField(hourly.temperature2m);
  const precipitationProbability = normalizeHourlyField(hourly.precipitationProbability);
  const weatherCode = normalizeHourlyField(hourly.weatherCode);

  if (!time.length) {
    return <div className="forecast-weather">Loading forecast...</div>;
  }

  const now = new Date();
  const startIndex = time.findIndex(t => new Date(t).getTime() >= now.getTime());

  // Guard for no future time found
  if (startIndex === -1) return <div className="forecast-weather">No upcoming forecast available.</div>;

  const forecastTime = time.slice(startIndex, startIndex + 4);
  const forecastTemp = temperature2m.slice(startIndex, startIndex + 4);
  const forecastPrecip = precipitationProbability.slice(startIndex, startIndex + 4);
  const forecastWMO = weatherCode.slice(startIndex, startIndex + 4);

  return (
    <div className="forecast-weather">
      {forecastTime.map((time, i) => {
        const Icon = weatherCodeToIcon[forecastWMO[i]];
        return (
          <div key={i} className="hour-block">
            <p>{new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            <div className="weather-icon">{Icon && <Icon size={32} />}</div>
            <p>{forecastTemp[i].toFixed(1)}°C</p>
            <p>{forecastPrecip[i]}%</p>
          </div>
        );
      })}
    </div>
  );
}
