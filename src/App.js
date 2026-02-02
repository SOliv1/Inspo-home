import React from 'react';
import './App.css';
//import { TodoInput } from './features/todos/components/TodoInput';
//import {TodoList }  from './features/todos/components/TodoList';
import { WeatherPanel } from './features/weather/WeatherPanel';
// import { JournalPanel } from './features/journal/JournalPanel'; // You might uncomment this later
// import { QuoteDisplay } from './features/quotes/QuoteDisplay'; // You might uncomment this later

function App() {
  const hour = new Date().getHours();

    let timeOfDay = "day";
    if (hour >= 5 && hour < 9) timeOfDay = "sunrise";
    else if (hour >= 9 && hour < 17) timeOfDay = "day";
    else if (hour >= 17 && hour < 20) timeOfDay = "sunset";
    else timeOfDay = "night";


    let greeting = "Good Evening";
    if (hour < 12) greeting = "Good Morning";
      else if (hour < 18) greeting = "Good Afternoon";
    else greeting = "Good Evening";

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className='header-left'>
          <p className="app-kicker">{greeting}, Sara!</p>
            <h1 className="title">Daily Checklist</h1>
            <p className='subtitle'>Light, colorful to-dos for a focused day.</p>
        </div>
          {/* You might put TimeDisplay here later */}
        <WeatherPanel timeOfDay={timeOfDay} />

          {/* Example: <WeatherPanel /> */}
        {/* Potentially other header content like navigation or user info */}
      </header>


        {/* ================================================ */}
        {/* Journal Section - Active JSX */}
        {/* ================================================ */}
        {/*<section className="card card--input" aria-label="Add a new task">
          {/*<TodoInput />
        </section>

          {/*<form className="journal-form" id="journal-form">
            <label className="field">
              <span className="field__label">Title</span>
              <input
                type="text"
                id="journal-title-input"
                className="field__input"
                placeholder="Give this entry a short title"
                maxLength="80" // Corrected: max_length in JSX is maxLength
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
            </label>*/}

            {/* You'd typically have a submit button here for the form */}
            {/* <button type="submit" className="button">Save Entry</button>
          </form>*/}

          {/* This is where individual JournalEntry components would be rendered */}
          {/* For now, it's just a placeholder */}
          <div className="journal-entries">
            <p>Your journal entries will appear here.</p>
          </div>

        {/* ================================================ */}
        {/* Todo List Section - Active JSX (assuming you want to add this back) */}
        {/* ================================================ */}
        {/* If you already have a TodoList component, you'd just use it like this: */}
        {/*<TodoList />
        {/* Otherwise, you'd put its HTML structure here, similar to the Journal section */}

        {/* Closing the main content area */}

      {/* ================================================ */}
      {/* Footer Section (Quotes) - Active JSX */}
      {/* ================================================ */}
      <footer className="QuotesFooter">
        {/* Your actual QuoteDisplay component would go here */}
        {/* For example: <QuoteDisplay /> */}
        <p className="quote-text">"The only way to do great work is to love what you do."</p>
        <p className="quote-author">- Steve Jobs</p>
        {/* You could add a "New Quote" button here */}
      </footer>
    </main>
  );
}

export default App;
