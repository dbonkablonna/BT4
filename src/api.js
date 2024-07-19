import axios from "axios";

const API_KEY = "f5ac4be4a19c47d8a3e42522222112";

const fetchWeatherData = async (city) => {
    try {
        const response = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=20&aqi=no&alerts=yes`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

export default fetchWeatherData;
