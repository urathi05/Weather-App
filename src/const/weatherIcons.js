// weatherIcons.js
import {
  WiDaySunny,
  WiCloudy,
  WiDayCloudy,
  WiFog,
  WiRain,
  WiShowers,
  WiSnow,
  WiThunderstorm,
  WiNa
} from "react-icons/wi";

const weatherCodeToIcon = {
  0: WiDaySunny,                  // Clear
  1: WiDaySunny,                  // Mainly clear
  2: WiDayCloudy,                 // Partly cloudy
  3: WiCloudy,                    // Overcast
  45: WiFog, 48: WiFog,           // Fog
  51: WiShowers, 53: WiShowers, 55: WiShowers,  // Drizzle
  56: WiRain, 57: WiRain,         // Freezing drizzle
  61: WiRain, 63: WiRain, 65: WiRain,           // Rain
  66: WiRain, 67: WiRain,         // Freezing rain
  71: WiSnow, 73: WiSnow, 75: WiSnow, 77: WiSnow, // Snow
  80: WiShowers, 81: WiShowers, 82: WiShowers,   // Rain showers
  85: WiSnow, 86: WiSnow,         // Snow showers
  95: WiThunderstorm,
  96: WiThunderstorm,
  99: WiThunderstorm
};

export default weatherCodeToIcon;
