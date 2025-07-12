import CurrentWeather from '../../components/WeatherScreen/CurrentWeather/CurrentWeather';
import ForecastWeather from '../../components/WeatherScreen/ForecastWeather/ForecastWeather';

export default function WeatherScreen({ data, onRefresh }) {
  return (
    <div className="weather-screen">
      <CurrentWeather data={data} onRefresh={onRefresh}/>
      <ForecastWeather data={data} />
    </div>
  );
}
