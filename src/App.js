import React, { useState, useEffect } from 'react';
import './App.css';
import { WeatherPanel } from './features/weather/WeatherPanel';
// import { TodoInput } from './features/todos/components/TodoInput';
// import { TodoList } from './features/todos/components/TodoList';
// import { JournalPanel } from './features/journal/JournalPanel';
// import { QuoteDisplay } from './features/quotes/QuoteDisplay';

function App() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    let message = "";
    if (hour < 6) message = "Good early morning";
    else if (hour < 12) message = "Good morning";
    else if (hour < 17) message = "Good afternoon";
    else if (hour < 21) message = "Good evening";
    else message = "Good night";

    setGreeting(message);
  }, []);

  const hour = new Date().getHours();
  let timeOfDay = "day";
  if (hour >= 5 && hour < 9) timeOfDay = "sunrise";
  else if (hour >= 9 && hour < 17) timeOfDay = "day";
  else if (hour >= 17 && hour < 20) timeOfDay = "sunset";
  else timeOfDay = "night";

  return (
    <main className="app-shell">

      <header className="app-header">
        <div className="header-left">
          <p className="app-kicker">{greeting}, Sara!</p>
          <h1 className="title">Daily Checklist</h1>
          <p className="subtitle">Light, colorful to-dos for a focused day.</p>
        </div>

        <WeatherPanel timeOfDay={timeOfDay} />
      </header>

      {/* ================================================ */}
      {/* Journal Section */}
      {/* ================================================ */}

      {/* <section className="card card--input" aria-label="Add a new task">
        <TodoInput />
      </section> */}

      {/* <form className="journal-form" id="journal-form">
        <label className="field">
          <span className="field__label">Title</span>
          <input
            type="text"
            id="journal-title-input"
            className="field__input"
            placeholder="Give this entry a short title"
            maxLength="80"
          />
        </label>

        <label className="field">
          <span className="field__label">Today&apos;s thoughts</span>
          <textarea
            id="journal-input"
            className="field__input field__input--textarea"
            rows="5"
            placeholder="What&apos;s on your mind right now?"
          ></textarea>
        </label>
      </form> */}

      {/* <div className="journal-entries">
        <p>Your journal entries will appear here.</p>
      </div> */}

      {/* ================================================ */}
      {/* Todo List Section */}
      {/* ================================================ */}

      {/* <TodoList /> */}

      {/* ================================================ */}
      {/* Footer Section */}
      {/* ================================================ */}

      <footer className="QuotesFooter">
        {/* <QuoteDisplay /> */}
        <p className="quote-text">"The only way to do great work is to love what you do."</p>
        <p className="quote-author">- Steve Jobs</p>
      </footer>

    </main>
  );
}

export default App;
