// Today.js

function Today({ weatherData, selectedTime, selectedWeather }) {
  if (weatherData === null) {
    return null;
  }

  const hours = selectedTime.getHours();
  const minutes = selectedTime.getMinutes();
  const seconds = selectedTime.getSeconds();
  const day = selectedTime.getDate();
  const month = selectedTime.getMonth() + 1; // Months are zero-indexed
  const year = selectedTime.getFullYear();

  const weather = selectedWeather || weatherData.current;

  return (
      <div className="w-full flex flex-col items-center mt-5">
      <span className="w-full text-center">
        {hours}:{minutes}:{seconds} PM, {day} / {month} / {year}
      </span>
        <div className="w-full flex mt-5">
          <div className="flex-1 h-[120px]  flex justify-center items-center">
            <img alt="Weather Icon" src={weather?.condition?.icon} />
          </div>
          <div className="flex-1 h-[120px]  flex justify-center items-center text-4xl">
          <span className="relative font-bold">
            {weather?.temp_f}
            <span className="absolute text-[10px] top-[-10px] right-[-7px]">
              o
            </span>
            <span className="absolute text-[13px] font-bold top-[-9px] right-[-15px]">
              F
            </span>
          </span>
          </div>
        </div>
        <span className="w-full font-bold text-xl flex justify-center mt-5">
        {weather?.condition?.text}
      </span>
        <nav className="flex justify-between mt-5">
          <ul className="w-[90px]">
            <li className="w-full">Humidity</li>
            <li className="w-full">{weather?.humidity}%</li>
          </ul>
          <ul className="w-[90px]">
            <li className="w-full">Wind speed</li>
            <li className="w-full">{weather?.wind_kph} km/h</li>
          </ul>
        </nav>
      </div>
  );
}

export default Today;
