import React from 'react';
import './App.css';
import { WeatherPanel } from './features/weather/WeatherPanel';

function App() {

  // Dynamic greeting logic
  const hour = new Date().getHours();
  let greeting = "";
  let greetingClass = "";

if (hour >= 5 && hour < 12) {
  greeting = "Good Morning, Sara";
  greetingClass = "greeting-sunrise";
} else if (hour >= 12 && hour < 17) {
  greeting = "Good Afternoon, Sara";
  greetingClass = "greeting-day";
} else if (hour >= 17 && hour < 22) {
  greeting = "Good Evening, Sara";
  greetingClass = "greeting-sunset";
} else {
  greeting = "Good Night, Sara";
  greetingClass = "greeting-night";
}

/* Icon selection based on time of day */

let greetingIcon = "";

if (hour >= 5 && hour < 12) {
  greetingIcon = "🌅"; // sunrise
} else if (hour >= 12 && hour < 17) {
  greetingIcon = "☀️"; // day sun
} else if (hour >= 17 && hour < 22) {
  greetingIcon = "🌇"; // sunset
} else {
  greetingIcon = "🌙"; // night moon
}


  return (
    <main className="app-shell">

      {/* Frosted background layer */}
      <div className="frost-overlay"></div>

      {/* All visible UI */}
      <div className="app-content">

        <header className="app-header">
          <div className="header-left">

            {/* Dynamic greeting */}
            <p className={`dynamic-greeting ${greetingClass}`}>
              <span className="greeting-icon">{greetingIcon}</span>
              {greeting}
            </p>

            <h1 className="app-title">Daily Checklist</h1>
            <p className="app-subtitle">Light, colourful to-dos for a focused day.</p>
          </div>

          <WeatherPanel />
        </header>
        <div className="header-divider"></div>

        <section className="journal-entries">
          <p>Your journal entries will appear here.</p>
        </section>

        <footer className="QuotesFooter">
          <p className="quote-text">
            "The only way to do great work is to love what you do."
          </p>
          <p className="quote-author">– Steve Jobs</p>
        </footer>

      </div>
    </main>
  );
}

export default App;
