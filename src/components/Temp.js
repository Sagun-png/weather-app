import React, { useEffect, useState } from "react";
import "./style.css";
import WeatherCard from "./WeatherCard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Bengaluru");
  const [tempInfo, setTempInfo] = useState({});
  const [cities, setCities] = useState([]);

  const getCityNames = async () => {
    try {
      let url = "https://countriesnow.space/api/v0.1/countries";
      let city = [];
      let res = await fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          for (var i = 0; i < data.data.length; i++) {
            city.push(...data.data[i].cities)
          }
          setCities(city)
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=941b8f6e5557d2194e623caee41f8771`;

      let res = await fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          const { temp, humidity, pressure } = data.main;
          const { main: weathermood } = data.weather[0];
          const { name } = data;
          const { speed } = data.wind;
          const { country, sunset } = data.sys;

          const myNewWeatherInfo = {
            temp,
            humidity,
            pressure,
            weathermood,
            name,
            speed,
            country,
            sunset,
          };

          setTempInfo(myNewWeatherInfo);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCityNames();
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoComplete={cities}
          />

          <button
            className="searchButton"
            onClick={getWeatherInfo}
            type="button"
          >
            Search
          </button>
        </div>
      </div>

      {/* Our Temp Card */}
      <WeatherCard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
