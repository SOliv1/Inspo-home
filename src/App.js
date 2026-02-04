import React from 'react';
import './App.css';
import { WeatherPanel } from './features/weather/WeatherPanel';

function App() {

  // Dynamic greeting logic
  const hour = new Date().getHours();
  let greeting = "Hello";

  if (hour >= 5 && hour < 12) greeting = "Good Morning, Sara";
  else if (hour >= 12 && hour < 17) greeting = "Good Afternoon, Sara";
  else if (hour >= 17 && hour < 22) greeting = "Good Evening, Sara";
  else greeting = "Good Night, Sara";

  return (
    <main className="app-shell">

      {/* Frosted background layer */}
      <div className="frost-overlay"></div>

      {/* All visible UI */}
      <div className="app-content">

        <header className="app-header">
          <div className="header-left">

            {/* Dynamic greeting */}
            <p className="dynamic-greeting">{greeting}</p>

            <h1 className="app-title">Daily Checklist</h1>
            <p className="app-subtitle">Light, colorful to-dos for a focused day.</p>
          </div>

          <WeatherPanel />
        </header>

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
