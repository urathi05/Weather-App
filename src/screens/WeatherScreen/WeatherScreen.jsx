import CurrentWeather from '../../components/WeatherScreen/CurrentWeather/CurrentWeather';
import ForecastWeather from '../../components/WeatherScreen/ForecastWeather/ForecastWeather';
import "./WeatherScreen.css";

export default function WeatherScreen({ data, onRefresh }) {
  return (
    <div className="weather-screen">
      <div className="weather">
        <CurrentWeather data={data} onRefresh={onRefresh}/>
        <ForecastWeather data={data} />
      </div>
    </div>
  );
}
