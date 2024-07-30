"use client";

import { useState } from "react";

export default function Page() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  async function getWeather() {
    const res = await fetch(`/api/chat/message`);
    const data = await res.json();
    setCity(data.weather.name);
    setWeather(data.weather.weather[0].main);
  }

  return (
    <div className="text-center mt-8">
      <input
        type="text"
        placeholder="Enter city name"
        className="border p-2 mr-3 mb-5"
        onChange={(e) => {
          setCity(e.target.value);
        }}
        value={city}
      />
      <button className="bg-gray-200 p-2" onClick={getWeather}>
        Get weather info
      </button>
      <h1>City: {city}</h1>
      <p>Weather: {weather}</p>
    </div>
  );
}
