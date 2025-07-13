import React,{useEffect, useState, useRef}from 'react'
import './Weather.css'
import search_icon from '../assets/search_icon1.jpg'
import clear_icon from '../assets/clear_icon.png'
import cloud_icon from '../assets/cloud_icon.png'
import humidity_icon from '../assets/humidity_icon1.png'
import rain_icon from '../assets/rain_icon.webp'
import snow_icon from '../assets/snow_icon.jpeg'
import sunny_icon from '../assets/sunny_icon1.png'
import wind_icon from '../assets/wind_icon1.png'

const Weather = () => {

  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState({
    humidity: null,
    windSpeed: null,
    temperature: null,
    location: null,
    icon: sunny_icon // default icon
  });

  const allIcons = {
    "01d" : clear_icon,
    "01n" : clear_icon,
    "02d" : cloud_icon,
    "02n" : cloud_icon,
    "03d" : cloud_icon,
    "03n" : cloud_icon,
    "04d" : sunny_icon,
    "04n" : sunny_icon,
    "09d" : rain_icon,
    "09n" : rain_icon,
    "10d" : rain_icon,
    "10n" : rain_icon,
    "13d" : snow_icon,
    "13n" : snow_icon,
  }

  const search = async (city) =>{
    if(city === ""){
        alert("Enter City Name");
        return;
    }
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      
      if(!response.ok){
        alert(data.message);
        return;
      }



      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    }catch(error){
      setWeatherData(false);
      console.error("Error in fetching data");
    }
  }

  useEffect(() => {
    search("chennai");
  },[])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input  ref= {inputRef} type="text" placeholder='Search' className='bar1'></input>
        <img className="bar" src={search_icon} alt="" onClick={() => search(inputRef.current.value)}/>        
      </div>
      {weatherData?<>
        <img src={weatherData.icon} alt="Weather Icon" className='weather-icon'/>
      <p>{weatherData.temperature}°c</p>
      <p>{weatherData.location}</p>

      <div className="weather-info">
        <div className="col">
          <img src={humidity_icon} alt="Humidity Icon"/>
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_icon} alt="Wind Icon"/>
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>

      </>:<></>}
    </div>
  )
}

export default Weather;
