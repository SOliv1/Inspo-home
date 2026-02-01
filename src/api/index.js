const API_BASE = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.REACT_APP_WEATHER_KEY;

fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`)
  .then(res => res.json())
  .then(data => console.log(data));

// Evesham, GB (you can change q= to another city)
export async function fetchCurrentWeather(city = 'Evesham,GB') {
  const url = `${API_BASE}/weather?q=${encodeURIComponent(
    city
  )}&units=metric&appid=${API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Weather request failed: ${res.status}`);
  }

  const data = await res.json();
  return data;
}
