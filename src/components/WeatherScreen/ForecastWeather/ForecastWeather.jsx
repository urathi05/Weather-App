import "./ForecastWeather.css";
import weatherCodeToIcon from "../../../const/weatherIcons";
import { WiDayShowers } from "react-icons/wi";

function normalizeHourlyField(field) {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === "object") return Object.values(field);
  return [];
}

export default function ForecastWeather({ data }) {
  if (!data || !data.hourly) {
    return <div className="forecast-weather">Loading forecast...</div>;
  }

  const hourly = data.hourly;

  // Normalize fields safely
  const time = normalizeHourlyField(hourly.time);
  const temperature2m = normalizeHourlyField(hourly.temperature2m);
  const apparentTemp = normalizeHourlyField(hourly.apparentTemperature);
  const precipitationProbability = normalizeHourlyField(hourly.precipitationProbability);
  const weatherCode = normalizeHourlyField(hourly.weatherCode);

  console.log("ForecastWeather data check:", { time, temperature2m });

  if (!time.length || !temperature2m.length) {
    return <div className="forecast-weather">Loading forecast...</div>;
  }

  const now = new Date();
  const startIndex = time.findIndex(t => new Date(t).getTime() >= now.getTime());

  if (startIndex === -1) {
    return <div className="forecast-weather">No upcoming forecast available.</div>;
  }

  const forecastTime = time.slice(startIndex, startIndex + 4);
  const forecastTemp = temperature2m.slice(startIndex, startIndex + 4);
  const forecastApparent = apparentTemp.slice(startIndex, startIndex + 4);
  const forecastPrecip = precipitationProbability.slice(startIndex, startIndex + 4);
  const forecastWMO = weatherCode.slice(startIndex, startIndex + 4);

  return (
    <div className="forecast-weather">
      {forecastTime.map((t, i) => {
        const Icon = weatherCodeToIcon[forecastWMO[i]];
        return (
          <div key={i} className="hour-block">
            <p className="forecast-time">
              {new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
            <div className="weather-icon">
              {Icon && <Icon size={24} />}
            </div>
            <p className="temperature">{forecastTemp[i].toFixed(0)}°C</p>
            <p className="apparent-temp">Feels like: {forecastApparent[i].toFixed(0)}°C</p>
            <p className="precipitation"><WiDayShowers size={12}/>{forecastPrecip[i]}%</p>
          </div>
        );
      })}
    </div>
  );
}
