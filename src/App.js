import React, { useState, useEffect } from "react";
import "./App.css";
import Today from "./components/today";
import Days from "./components/days";
import fetchWeatherData from "./api";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [value, setValue] = useState("hanoi"); // Set default city to "hanoi"
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedWeather, setSelectedWeather] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData(value);
        setWeatherData(data);
      } catch (error) {
        setWeatherData(null);
      }
    };

    fetchData();
  }, [value]);

  useEffect(() => {
    if (weatherData) {
      const defaultTime = new Date(weatherData.current?.last_updated);
      setSelectedTime(defaultTime);
      setSelectedWeather(weatherData.current);
    }
  }, [weatherData]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const city = e.target.value.trim();
      if (city !== "") {
        setValue(city);
      }
    }
  };

  const handleTimeChange = (time, weather) => {
    setSelectedTime(time);
    setSelectedWeather(weather);
  };

  return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-[900px] h-96 border-2 flex items-center">
          <div className="w-[250px] h-full flex flex-col items-center bg-[#fff] py-5 px-5">
            {/* search */}
            <div className="flex items-center">
              <span className="text-sm mr-2">Your city</span>
              <div className="w-32 pl-3 py-1 bg-white border-2 rounded-md">
                <input
                    className="w-full"
                    type="text"
                    value={value} // Set the input value to the state
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter city"
                />
              </div>
            </div>
            <Today weatherData={weatherData} selectedTime={selectedTime} selectedWeather={selectedWeather} />
          </div>
          <div className="flex-1 h-full">
            <div className="w-full h-full flex flex-col justify-between">
              <Days weatherData={weatherData} onTimeChange={handleTimeChange} />
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
