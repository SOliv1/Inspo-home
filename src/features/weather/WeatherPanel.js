import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import React from "react";
import "./WeatherCard.css";

import { tickTime, loadWeather } from "../weather/weatherSlice";
import {
  WiDaySunny,
  WiCloud,
  WiCloudy,
  WiStrongWind,
  WiWindy,
  WiSnow,
  WiSnowWind,
  WiSprinkle,
  WiSunrise,
  WiSunset,
  WiRain,
WiThunderstorm } from "react-icons/wi";
import "./WeatherCard.css";

export default function WeatherCard({ tempC, condition, icon }) {
  const getTempColor = () => {
    if (condition.includes("sun")) return "#FFB84C";       // sunny yellow
    if (condition.includes("cloud")) return "#6EC6FF";     // sky blue
    if (condition.includes("rain")) return "#4DA8DA";      // cool blue
    if (condition.includes("snow")) return "#AEE1F9";      // icy blue
    return "#FFD1DC";                                      // soft coral fallback
  };

  return (
    <div className="weather-card fade-scale">
      <div className="weather-icon-wrapper">
        <img src={icon} alt={condition} className="weather-icon" />
      </div>

      <div
        className="temperature"
        style={{ color: getTempColor(), textShadow: `0 0 12px ${getTempColor()}55` }}
      >
        {tempC}°C
      </div>

      <div className="condition">{condition}</div>
    </div>
  );
}

export function WeatherPanel() {
  const dispatch = useDispatch();

  const {
    city,
    tempC,
    tempF,
    condition,
    detail,
    date,
    time,
    status,
  } = useSelector((state) => state.weather);

  const hour = new Date().getHours();
    let timeOfDay = "day";
    if (hour >= 5 && hour < 9) timeOfDay = "sunrise";
    else if (hour >= 9 && hour < 17) timeOfDay = "day";
     else if (hour >= 17 && hour < 20) timeOfDay = "sunset";
    else timeOfDay = "night";


  // Map weather conditions to icons

  const iconMap = {
  Clear:  <WiDaySunny size={64} color="#FFD447" />,
  Sunny:  <WiDaySunny size={64} color="#FFD447" />,
  Clouds: <WiCloudy size={64} color="#6EC6FF" />,
  Cloudy: <WiCloudy size={64} color="#6EC6FF" />,
  Overcast: <WiCloudy size={64} color="#6EC6FF" />,
  "few clouds": <WiCloudy size={64} color="#6EC6FF" />,
  Rain: <WiRain size={64} color="#4A90E2" />,
  Snow: <WiSnow size={64} color="#A8F0E6" />,
  Thunderstorm: <WiThunderstorm size={64} color="#6A5AE0" />,
};

  const fallbackIcon = <WiCloud size={64} color="#6EC6FF" />;

  useEffect(() => {
    dispatch(tickTime());
    dispatch(loadWeather());

    const id = setInterval(() => {
      dispatch(tickTime());
    }, 60_000);

    return () => clearInterval(id);
  }, [dispatch]);
  if (status === "loading") {
    return (
      <section className="weather-panel" aria-label="Today's weather">
        <p>Loading weather…</p>
      </section>
    );
  }

  return (
    <section className={`weather-panel ${timeOfDay}`} aria-label="Today's weather">

      <div className="weather-location-row">
        <span className="weather-city">{city}</span>
        <div className="weather-meta-top">
          <span className="weather-date">{date}</span>
          <span className="weather-time">{time}</span>
        </div>
      </div>

      {/* Weather header with icon */}
      <div className="weather-condition">
        {condition}

      {detail !== condition && (
        <div className="separator">
          <span className="weather-detail">{detail}</span>
        </div>
      )}
      </div>

      <div className="weather-main-row">
        <div className={`weather-temp-block ${condition.toLowerCase()}`}>
          <span className={`weather-temp weather-temp-${timeOfDay}`}>
            {tempC} °C feels like {tempF} °F
          </span>
      </div>



        <div className="weather-meta-block">
          <div className="weather-icon">
            {iconMap[condition] || fallbackIcon}
          </div>

          </div>
      </div>
    </section>
  );

}

//         state.error = action.error.message;
