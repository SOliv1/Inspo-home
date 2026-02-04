/* Frosted-glass weather card */
.weather-card {
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  padding: 1.8rem;
  border-radius: 22px;

  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);

  border: 1px solid rgba(255, 255, 255, 0.28);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18);

  display: flex;
  flex-direction: column;
  gap: 1rem;

  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.weather-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.22);
}

/* Temperature */
.weather-temp {
  font-size: 3.4rem;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

/* Condition text */
.weather-condition {
  font-size: 1.2rem;
  font-weight: 500;
  color: #f0f0f0;
  opacity: 0.9;
}

/* Location */
.weather-location {
  font-size: 1rem;
  font-weight: 500;
  color: #e8e8e8;
  opacity: 0.85;
}

/* Icon */
.weather-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

/* Subtle shimmer on hover */
.weather-card:hover .weather-temp {
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.55);
}

/* Layout for details row */
.weather-details {
  display: flex;
  justify-content: space-between;
  margin-top: 0.6rem;
  color: #f5f5f5;
  opacity: 0.85;
  font-size: 0.95rem;
}

/* Background for the whole weather area */
.weather-wrapper {
  padding: 2rem;
  border-radius: 30px;

  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.06)
  );
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);

  box-shadow: inset 0 0 40px rgba(255, 255, 255, 0.08);
}