import hotBg from "./assets/hot.jpg";

import cold1Bg from "./assets/cold.png";
import mediumBg from "./assets/medium.png"
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city, setCity] = useState("Kolkata");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      // const threshold = units === "metric" ? 20 : 60;
      // if (data.temp <= threshold) setBg(coldBg);
      // else setBg(hotBg);



      const threshold1 = units === "metric" ? 20 : 60;
      const threshold2 = units === "metric" ? 0 : 20;
      if (data.temp < 0) {
        setBg(cold1Bg)
      } else if (data.temp <= threshold1 && data.temp >= threshold2) {
        setBg(mediumBg);
      } else {
        setBg(hotBg);
      }

    };

    fetchWeatherData();
  }, [units, city]);

  // const handleUnitsClick = (e) => {
  //   const button = e.currentTarget;
  //   const currentUnit = button.innerText.slice(1);

  //   const isCelsius = currentUnit === "C";
  //   button.innerText = isCelsius ? "°F" : "°C";
  //   setUnits(isCelsius ? "metric" : "imperial");
  // };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              {/* <button onClick={(e) => handleUnitsClick(e)} class="btn-shine"><span>°F</span></button> */}
              <button class="btn-shine"><span>°C</span></button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"
                  }`}</h1>
              </div>
            </div>

            {/* bottom description */}
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
