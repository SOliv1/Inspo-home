/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import React from "react";
import "./WeatherCard.css";

import { tickTime, loadWeather } from "../weather/weatherSlice";
import {
  WiDaySunny,
  WiCloudy,
  WiSnow,
  WiRain,
  WiThunderstorm,
  WiFog
  } from "react-icons/wi";
import "./WeatherCard.css";

export default function WeatherCard({ tempC, condition, icon }) {
  const getTempColor = () => {
    if (condition.includes("sun")) return "#FFB84C";       // sunny yellow
    if (condition.includes("cloud")) return "#6EC6FF";     // sky blue
    if (condition.includes("rain")) return "#4DA8DA";      // cool blue
    if (condition.includes("snow")) return "#AEE1F9";      // icy blue
    if (condition.includes("fog"))  return "#AFC4D6";      // foggy gray-blue
    if (condition.includes("Thunderstorm")) return "#A8B4FF"; // electric lavender
    if (condition.includes("mist")) return "#B0C4DE";
    // misty gray-blue"
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

export function WeatherPanel({ timeOfDay }) {
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


  const iconColorMap = {
    sunrise: "#FFB38A",   // peach
    day: "#6EC6FF",       // sky blue
    sunset: "#FF8FA3",    // coral pink
    night: "#C8D6FF",     // moonlit silver
  };

  const iconColor = iconColorMap[timeOfDay];

  // Map weather conditions to icons


  const iconMap = {
  Clouds: <WiCloudy size={64} color={iconColor} />,
  Rain: <WiRain size={64} color={iconColor} />,
  Snow: <WiSnow size={64} color={iconColor} />,
  Mist: <WiFog size={64} color={iconColor} />,
  Clear: <WiDaySunny size={64} color={iconColor} />,
  Thunderstorm: <WiThunderstorm size={64} color="#A8B4FF" />,
};

  const fallbackIcon = <WiCloudy size={64} color={iconColor} />


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
    <section className={`weather-panel ${condition.toLowerCase()} ${timeOfDay}`} aria-label="Today's weather">
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

      <div className="time-of-day-icon">
        {timeOfDay === "sunrise" && <span>🌅</span>}
        {timeOfDay === "day" && <span>☀️</span>}
        {timeOfDay === "sunset" && <span>🌇</span>}
        {timeOfDay === "night" && <span>🌙</span>}
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

//state.error = action.error.message;
