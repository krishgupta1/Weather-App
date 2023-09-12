import React from 'react'
import { useState } from 'react';
import Clock from 'react-live-clock'
import './Weather.css';
import rectangle from '../components/img/Rectangle.png'
import search from '../components/img/Search.png'
import location from '../components/img/Location.png'
import sunrise from '../components/img/Sunrise.png'


const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [apiKey] = useState('ccf5109e04a1727bc94e962ebc893242'); // Replace with your API key
  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleClick = () => {
    // 👇 "message" stores input field value
    // setUpdated(city);
        const fetchData = async () => {
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
    
            if (!response.ok) {
              throw new Error('Weather data not available');
            }
    
            const data = await response.json();
            setWeatherData(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        if (city !== '') {
          fetchData();
        }
  };
  let temperature = {weatherData.main.temp};
  console.log(Math.floor(temperature));

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day}, ${date} ${month}`;
  };



  return (
    <div>
      {/* Dark Mode Button */}
      <div className='mt-[20px] ml-[22px] w-[100px] h-[38.608px] shrink-0 rounded-3xl'>
        <img src={rectangle} alt="" />
      </div>
      <div className='ml-[25px] mt-[-35px] w-[30px] h-[30px] shrink-0'>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="15" fill="#111111"/>
        </svg>
        <h1 className='ml-[-2.5px] mt-[3px] w-[100px] h-[17px] shrink-0 text-white text-lg extrabold'>Dark Mode</h1>
      </div>
      
      {/* Search Bar */}
      <div className='w-[803px] h-[62px] shrink-0 mt-[-35px] ml-[260px] rounded-[40px] bg-[#444] shadow-lg shadow-[rgba(0,0,0,0.25)]'>
        <div>
          <img src={search} className='w-[40px] h-[46px] shrink-0 bg-cover bg-no-repeat ml-5' alt="" />
        </div>
        <div className='mt-[-30px]'>
            <input
            type="text" 
            className='text-white w-[621px] h-[28px] bg-transparent flex-shrink-0 text-[rgba(255, 255, 255, 0.60)] text-[18px]'
            placeholder='Search for your preffered city...'
            id="city"
            name="city"
            onChange={handleChange}
            value={city}
          />
        </div>
        <button className='w-[100px]'>Search</button>
      </div>

      {/* Current Location Bar */}

      <div className='ml-[1150px] mt-[-60px]'>
        <button onClick={handleClick} className='w-[292px] h-[62px] flex-shrink-0 bg-[#4CBB17] border'>
          <div className=''>
            <img src={location} alt="" className='w-[35px] h-[35px] mt-3 ml-[25px] mb-[50px] location' />
            <h1 className='location-cur ml-[65px] mt-[-82px]'>
              Current Location
            </h1>
          </div>
        </button>
      </div>

    {/* Location and Time */}
      {/* {weatherData && ( */}
    <div className='flex h-[330px]'>
      <div className="w-[530px] h-[330px] background-det location-time ml-[50px] mt-[30px]">
        <div className='mt-[40px]'>
          <div className=''>
            <h2 className='text-5xl'>{/* {weatherData.name}, {weatherData.sys.country} */}Kanpur,</h2>
            <h2>{/* {weatherData.name}, {weatherData.sys.country} */}India</h2>
          </div>
          {/* Date and time*/}
          <div className="time date-time">
            <div className="dmy">
              <div id="txt"></div>
              <div className="current-time">
                <Clock
                  format={'h:mmA'}
                  style={{fontSize: '1.5em'}}
                  ticking={true}
                />
              </div>
              {/* Date and Day */}
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
          </div>
        </div>
      </div>
    
      {/* Weather Detail */}
      <div className='w-[780px] h-[330px] background-det flex-shrink-0 mt-[30px] ml-[100px]'>
        {/* Weather Div */}
        <div className='w-[204px] h-[291.023px] flex-shrink-0'>
          <div className='w-[204px] h-[77px] flex-shrink-0 font-poppins'>
            {weatherData && (
              <h1 className='tempe'>{weatherData.main.temp}°C</h1>
            )}

          <div className="like-temp">
            <h1 className='feel-txt'>Feels like : {weatherData && (
              <h1 className='like-temp-cel ml-[90px] mt-[-26.5px]'>{weatherData.main.temp - 2}°C</h1>
            )}</h1>
          </div>
          {/* Sunrise and Sunset */}
          <div>
            {/* Sunrise */}
            <div className='sunrise'>
              <img src={sunrise} alt="" />
            </div>
          </div>
          </div>
        </div>
        
      </div>
    </div>
    
  </div>
  )
}

export default Weather
