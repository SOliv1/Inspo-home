import React, { useEffect, useState } from "react";
import "./App.css";
import { WeatherPanel } from "./features/weather/WeatherPanel";

function App() {
  // 1. STATE
  const [greetingMode, setGreetingMode] = useState("whimsical");


  const [entries, setEntries] = useState([]);
  const [journalText, setJournalText] = useState("");

  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);


  // 2. TIME
  const hour = new Date().getHours();

  // 3. GREETING SETS
  const greetingSets = {
    whimsical: {
      sunrise: "A soft sunrise for you, Sara",
      day: "Hope the day feels kind to you, Sara",
      sunset: "The light is softening for you, Sara",
      night: "A quiet night for you, Sara",
      lateNight: "Winding down, Sara?",
      earlyMorning: "Early morning calm, Sara"
    },
    minimal: {
      sunrise: "Morning, Sara",
      day: "Hello, Sara",
      sunset: "Evening, Sara",
      night: "Good night, Sara",
      lateNight: "Still awake, Sara",
      earlyMorning: "Up early, Sara"
    },
    poetic: {
      sunrise: "The light arrives softly for you, Sara",
      day: "The day opens its hands to you, Sara",
      sunset: "The sky is folding into gold for you, Sara",
      night: "The quiet gathers around you, Sara",
      lateNight: "The late hours drift gently with you, Sara",
      earlyMorning: "The world is hushed and waiting, Sara"
    }
  };

  // 4. MOODS
  const moods = {
    night: { class: "greeting-night", icon: () => "🌌" },
    lateNight: { class: "greeting-latenight", icon: () => "✨" },
    earlyMorning: { class: "greeting-earlymorning", icon: () => "⭐" },
    sunrise: { class: "greeting-sunrise", icon: () => "🌅" },
    day: { class: "greeting-day", icon: () => "☀️" },
    sunset: { class: "greeting-sunset", icon: () => "🌇" }
  };

  // 5. MOOD LOGIC
  let moodKey;
  if (hour >= 2 && hour < 5) moodKey = "earlyMorning";
  else if (hour >= 5 && hour < 12) moodKey = "sunrise";
  else if (hour >= 12 && hour < 17) moodKey = "day";
  else if (hour >= 17 && hour < 22) moodKey = "sunset";
  else if (hour >= 22 && hour < 23) moodKey = "night";
  else moodKey = "lateNight";

  const mood = moods[moodKey];

  // 6. GREETING MACHINE
  let greeting = greetingSets[greetingMode][moodKey];
  if (testGreeting) greeting = `${testGreeting}, Sara`;

  const greetingClass = mood.class;
  const greetingIcon = mood.icon(hour);

  // 7. SCROLL FADE EFFECT
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-on-scroll");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
          else entry.target.classList.remove("visible");
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);


  // 8. RETURN UI
  return (
  <div className={`app-body ${greetingClass}`}>
    <main className="app-shell">
      <div className="frost-overlay"></div>
      <div className="app-content">
        <div className="main-grid">

          {/* LEFT COLUMN */}
          <div className="left-column">

            <header className="app-header">
              <div className={greetingClass}>
                <p className="dynamic-greeting">
                  <span className="greeting-icon">{greetingIcon}</span>
                  {greeting}
                </p>

                {/* TOGGLE BUTTONS RESTORED */}
                <div className="greeting-mode-toggle" data-mode={greetingMode}>
                  <button
                    data-mode={greetingMode}
                    className={greetingMode === "whimsical" ? "active" : ""}
                    onClick={() => setGreetingMode("whimsical")}
                  >
                    Whimsical
                  </button>

                  <button
                    data-mode={greetingMode}
                    className={greetingMode === "minimal" ? "active" : ""}
                    onClick={() => setGreetingMode("minimal")}
                  >
                    Minimal
                  </button>

                  <button
                    data-mode={greetingMode}
                    className={greetingMode === "poetic" ? "active" : ""}
                    onClick={() => setGreetingMode("poetic")}
                  >
                    Poetic
                  </button>
                </div>
              </div>

              <h1 className="app-title">Daily Checklist</h1>
              <p className="app-subtitle">Light, colourful to-dos for a focused day.</p>
            </header>

            {/* NEW TASK BAR */}
            <div className={`new-task-bar ${moodKey}`}>
              <input
                type="text"
                placeholder="Add a new task…"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button
                onClick={() => {
                  if (newTask.trim()) {
                    setTasks([...tasks, { text: newTask, completed: false }]);
                    setNewTask("");
                  }
                }}
              >
                Add
              </button>
            </div>

            {/* ACTIVE TASKS */}
            <div className="task-list">
              {tasks.map((task, index) => (
                <div
                key={index}
                className={`todo-chip ${moodKey} ${task.completed ? "completed" : ""}`}
              >
                <span
                  className="chip-check"
                  onClick={() => {
                    const updated = [...tasks];
                    updated[index].completed = true;
                    setTasks(updated);

                    setTimeout(() => {
                      setCompletedTasks([...completedTasks, task.text]);
                      setTasks(tasks.filter((_, i) => i !== index));
                    }, 500);
                  }}
                >
                  ✓
                </span>

                <span className="task-text">{task.text}</span>

                <button
                  className="delete-task"
                  onClick={() => {
                    setTasks(tasks.filter((_, i) => i !== index));
                  }}
                >
                  ✕
                </button>
              </div>

              ))}
            </div>

            {/* COMPLETED TASKS */}
            <div className="completed-list">
              {completedTasks.map((task, index) => (
                <div key={index} className="completed-item">
                  {task}
                </div>
              ))}
            </div>

            {/* JOURNAL INPUT */}
            <div className={`journal-input ${moodKey}`}>
              <input
                type="text"
                placeholder="Write a little thought…"
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
              />
              <button
                onClick={() => {
                  if (journalText.trim()) {
                    setEntries([...entries, journalText]);
                    setJournalText("");
                  }
                }}
              >
                Add
              </button>
            </div>

            {/* JOURNAL ENTRIES */}
            <section className="journal-entries">
              {entries.map((entry, index) => (
                <div key={index} className={`journal-puff ${moodKey}`}>
                  <span className="journal-text">{entry}</span>

                  <button
                    className="delete-entry"
                    onClick={() => {
                      setEntries(entries.filter((_, i) => i !== index));
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}

            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            <WeatherPanel />
          </div>

        </div>

        <footer className="QuotesFooter">
          <p className="inspo-quote fade-on-scroll">
            “The only way to do great work is to love what you do.”
          </p>
          <p className="quote-author">– Steve Jobs</p>
        </footer>
      </div>
    </main>
  </div>
);

}

export default App;