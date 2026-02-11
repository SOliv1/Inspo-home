import { useState, useEffect } from "react";
import { WeatherPanel } from "./features/weather/WeatherPanel";
import "./App.css";

function App() {
  const [testHour, setTestHour] = useState(null);
  const [testGreeting, setTestGreeting] = useState(null);

  const hour = testHour !== null ? Number(testHour) : new Date().getHours();

  // ✅ PLACE THE MOODS OBJECT RIGHT HERE
  const moods = {
    night: {
      class: "greeting-night",
      icon: () => "🌌",
      tint: "night",
      parallax: "slow",
      shimmer: "cool",
    },
    lateNight: {
      class: "greeting-latenight",
      icon: () =>"✨",
      tint: "latenight",
      parallax: "slow",
      shimmer: "bright",
    },
    earlyMorning: {
      class: "greeting-earlymorning",
      icon: () =>"⭐",
      tint: "early",
      parallax: "medium",
      shimmer: "soft",
    },
    sunrise: {
      class: "greeting-sunrise",
      icon: () =>"🌅",
      tint: "sunrise",
      parallax: "medium",
      shimmer: "warm",
    },
    day: {
      class: "greeting-day",
      icon: () =>"☀️",
      tint: "day",
      parallax: "fast",
      shimmer: "none",
    },
    sunset: {
      class: "greeting-sunset",
      icon: () =>"🌇",
      tint: "sunset",
      parallax: "medium",
      shimmer: "warm",
    }
  };

  // ✅ MOOD SELECTION LOGIC
  let mood;

  if (hour >= 2 && hour < 5) mood = moods.earlyMorning;
  else if (hour >= 5 && hour < 12) mood = moods.sunrise;
  else if (hour >= 12 && hour < 17) mood = moods.day;
  else if (hour >= 17 && hour < 22) mood = moods.sunset;
  else if (hour >= 22 && hour < 23) mood = moods.night;
  else if (hour >= 23 || hour < 2) mood = moods.lateNight;

  let greeting = mood.greeting;
  let greetingClass = mood.class;
  let greetingIcon =
    typeof mood.icon === "function" ? mood.icon(hour) : mood.icon;

  // Greeting override
  if (testGreeting) {
    greeting = testGreeting;
  }



  // Fade-on-scroll effect
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
          else entry.target.classList.remove("visible");
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Apply mood-based CSS variables
  useEffect(() => {
  const root = document.documentElement;

  root.style.setProperty(
    "--parallax-speed",
    mood.parallax === "slow" ? "55s" :
    mood.parallax === "medium" ? "40s" :
    "25s"
  );

  root.style.setProperty(
    "--overlay-drift",
    mood.parallax === "slow" ? "28s" :
    mood.parallax === "medium" ? "20s" :
    "14s"
  );

  root.style.setProperty(
    "--shimmer-strength",
    mood.shimmer === "bright" ? "0.75" :
    mood.shimmer === "warm" ? "0.55" :
    mood.shimmer === "soft" ? "0.35" :
    "0"
  );
}, [mood]);




  return (
    <div className="app-shell app-body">
      <div className={`app-container ${greetingClass}`}>

        {/* Developer Test Panel */}
        {window.location.hostname === "localhost" && (
          <div className="dev-time-panel">

            {/* Time Test */}
            <label>Time test:</label>
            <select
              value={testHour ?? ""}
              onChange={(e) => setTestHour(e.target.value || null)}
            >
              <option value="">Real Time</option>
              <option value="4">Early Morning (04:00)</option>
              <option value="6">Sunrise (06:00)</option>
              <option value="10">Morning (10:00)</option>
              <option value="14">Afternoon (14:00)</option>
              <option value="18">Sunset (18:00)</option>
              <option value="22">Night (22:00)</option>
              <option value="23">Twinkling Stars (23:00)</option>
              <option value="0">Bright Star (00:00)</option>
              <option value="1">Late Night (01:00)</option>
            </select>

            {/* Greeting Test */}
            <div style={{ marginTop: "6px" }}>
              <label>Greeting test:</label>
              <select
                value={testGreeting || ""}
                onChange={(e) => setTestGreeting(e.target.value || null)}
              >
                <option value="">Real Greeting</option>
                <option value="Good Early Morning, Sara">Good Early Morning</option>
                <option value="Good Morning, Sara">Good Morning</option>
                <option value="Good Afternoon, Sara">Good Afternoon</option>
                <option value="Good Evening, Sara">Good Evening</option>
                <option value="Good Night, Sara">Good Night</option>
              </select>
            </div>
          </div>
        )}

        {/* Greeting */}
        <header className="greeting fade-on-scroll">
          <h1 className="greeting-text">
            <span className="star-shimmer">{greetingIcon}</span> {greeting}
          </h1>

        </header>

        {/* Weather Panel */}
        <WeatherPanel />
      </div>
    </div>
  );
}

export default App;
