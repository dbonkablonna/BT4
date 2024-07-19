import React, { useState } from "react";
import { LineChart } from "@mui/x-charts";
import classNames from "classnames";

function Days({ weatherData, onTimeChange }) {
    const [day, setDay] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedMetric, setSelectedMetric] = useState("uv"); // Start with UV

    // Get today's date
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    // Function to add a day to a given date string in format YYYY-MM-DD
    const addOneDay = (dateStr) => {
        const date = new Date(dateStr);
        date.setDate(date.getDate() + 1);
        return date.toISOString().split('T')[0];
    };

    const handleClick = (index) => {
        setSelectedDay(index);
        setDay(index);
        // Update the selected time and weather data
        const selectedHour = weatherData.forecast.forecastday[index].hour[0];
        onTimeChange(new Date(selectedHour.time), selectedHour);
    };

    const handleMetricChange = () => {
        // Cycle through the metrics
        setSelectedMetric((prevMetric) => {
            if (prevMetric === "uv") return "temperature";
            if (prevMetric === "temperature") return "humidity";
            return "uv";
        });
    };

    if (!weatherData) return null;

    // Prepare data
    const data = weatherData.forecast.forecastday[day].hour.map((hour) => ({
        temperature: hour.temp_c,
        uv: hour.uv,
        humidity: hour.humidity,
        time: hour.time
    }));

    const metricValues = data.map((point) => point[selectedMetric]);

    // Chart options
    const options = {
        scales: {
            x: { grid: { display: false }, ticks: { display: false } },
            y: { grid: { display: false }, ticks: { display: false } },
        },
        plugins: { legend: { display: false } },
        layout: {
            padding: { left: 0, right: 0, top: 0, bottom: 0 },
        },
    };

    // Update forecast days to adjust the date
    const forecastDays = weatherData.forecast.forecastday.map((dayData, index) => {
        const dayDate = dayData.date;
        if (dayDate !== today) {
            return { ...dayData, date: addOneDay(dayDate) };
        }
        return dayData;
    });

    return (
        <div className="w-full h-full flex flex-col justify-between p-4">
            <div className="w-full h-[180px] bg-[#fff] p-2 flex justify-between border-[1px]">
        <span onClick={handleMetricChange} className="cursor-pointer text-lg w-[30px]">
          {selectedMetric === "uv"
              ? "UV"
              : selectedMetric === "temperature"
                  ? "temperature"
                  : "humidity"}
        </span>
                <LineChart
                    series={[
                        {
                            data: metricValues,
                            area: true,
                            backgroundColor: "transparent",
                            borderColor:
                                selectedMetric === "uv"
                                    ? "red"
                                    : selectedMetric === "temperature"
                                        ? "blue"
                                        : "green",
                            borderWidth: 2,
                        },
                    ]}
                    width={600}
                    height={200}
                    options={options}
                />
            </div>
            <div className="w-full h-[160px] bg-[#fff] p-2 flex justify-between">
                <div
                    onClick={() => onTimeChange(new Date(), weatherData.current)} // Update to current time
                    className="w-[135px] h-full bg-[#fff] border-[1px] rounded-md flex flex-col items-center justify-between py-2 cursor-pointer"
                >
                    <span>Today</span>
                    <div className="w-[60px] h-[60px] bg-[#fff]">
                        <img
                            alt="Weather Icon"
                            src={weatherData?.current?.condition?.icon}
                            className="w-full h-full"
                        />
                    </div>
                    <ul className="w-full text-[12px]">
                        <li className="w-full text-center">Humidity</li>
                        <li className="w-full text-center">{weatherData?.current?.humidity}%</li>
                    </ul>
                </div>
                {forecastDays.map((day, index) => (
                    <div
                        onClick={() => handleClick(index)}
                        key={index}
                        className={classNames(
                            "w-[135px] h-full border-[1px] rounded-md flex flex-col items-center justify-between py-2 cursor-pointer",
                            {
                                "bg-[#0048ff] text-[#fff]": selectedDay === index,
                                "bg-[#fff]": selectedDay !== index,
                            }
                        )}
                    >
                        <span>{day.date}</span>
                        <div className="w-[60px] h-[60px] bg-[transparent]">
                            <img
                                alt="Weather Icon"
                                src={day.day.condition.icon}
                                className="w-full h-full"
                            />
                        </div>
                        <ul className="w-full text-[12px]">
                            <li className="w-full text-center">Humidity</li>
                            <li className="w-full text-center">{day.day.avghumidity}%</li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Days;
