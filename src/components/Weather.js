import React from 'react'
import { useState } from 'react';
import Clock from 'react-live-clock'
import './Weather.css';
import rectangle from '../components/img/Rectangle.png'
import search from '../components/img/Search.png'
import location from '../components/img/Location.png'
import sunriseIcon from '../components/img/Sunrise.png'
import sunsetIcon from '../components/img/Sunset.png'
import sunIcon from '../components/img/Sun.png'

const Weather = () => {
  const [weatherData, setWeatherData] = useState('');
  const [city, setCity] = useState('');
  const [apiKey] = useState('ccf5109e04a1727bc94e962ebc893242');

const handleChange = (event) => {
  setCity(event.target.value);
};

const handleClick = () => {
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

let dt;
if (weatherData && weatherData.sys) {
  dt = weatherData.sys.timezone;
}

var day = new Date(dt * 1000);

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
        {weatherData && (
        <h1 className='tempe'>{(Math.floor(weatherData.main.temp))}°C</h1>
        )}
        <div className="w-[530px] h-[330px] background-det location-time ml-[50px] mt-[30px]">
          <div className='mt-[40px]'>
            <div className=''>
              {weatherData && (
                <h2 className='text-5xl'>{weatherData.name},</h2>
              )}
              {weatherData && (
                <h2>{weatherData.sys.country}</h2>
              )}
            </div>
            {/* Date and time*/}
            <div className="time date-time">
              <div className="dmy">
                <div id="txt"></div>
                <div className="current-time">
                  {/* <Clock
                    format={'h:mmA'}
                    style={{fontSize: '1.5em'}}
                    ticking={true}
                  /> */}
                  {weatherData && (
                  <h1>{day}</h1>
                  )}
                </div>
                {/* Date and Day */}
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
            </div>
          </div>
        </div>
      
        {/*  ------   Weather Detail  -------- */}

        <div className='w-[780px] h-[330px] background-det flex-shrink-0 mt-[30px] ml-[100px]'>

          {/*   --------  Weather Div  -------- */}
          <div className='w-[204px] h-[291.023px] flex-shrink-0'>
            <div className='w-[204px] h-[77px] mt-[15px] ml-[30px] flex-shrink-0 font-poppins'>
              {weatherData && (
                <h1 className='tempe'>{(Math.floor(weatherData.main.temp))}°C</h1>
              )}

              <div className="like-temp ml-[2px] mt-[-20px]">
                <div className='feel-txt'>Feels like : {weatherData && (
                  <div className='like-temp-cel ml-[90px] mt-[-26.5px]'>
                    {(Math.floor(weatherData.main.feels_like))}°C
                  </div>
                  )}
                </div>
            </div>

            {/*  ------   Sunrise and Sunset   -------  */} 

            <div className='mt-[25px]'>
              {/* Sunrise */}
              <div className='sun w-[48px] h-[48px] ml-[20px]'>
                <img src={sunriseIcon} alt="" />
                <div className='w-[84.402px] h-[61.023] ml-[50px] mt-[-50px]'>
                  <h1 className='w-[91.849px] h-[30.512px]'>Sunrise</h1>
                  <h1 className='time-sun w-[94.332px] h-[24.155px] flex-shrink-0'>soon</h1>
                </div>
              </div>
              {/* Sunset */}
              <div className='sun w-[48px] h-[48px] mt-[30px] ml-[20px]'>
                <img src={sunsetIcon} alt="" />
                <div  className='w-[84.402px] h-[61.023] ml-[50px] mt-[-50px]'>
                  <h1 className='w-[84.402px] h-[61.023]'>Sunset</h1>
                  <h1 className='time-sun w-[94.332px] h-[24.155px] flex-shrink-0'>soon</h1>
                </div>
              </div>
            </div>
          </div>

          </div>


          {/* --------  Weather Icon  -------- */}
            
          <div>
            <div className='w-[270px] h-[270px] flex-shrink-0 mt-[-310px] ml-[225px]'>
              <img src={sunIcon} alt="" />
            </div>
            <div className='w-[129px] h-[53px] ml-[265px] mt-[-30px] flex flex-col '>
              <h1 className='text-[#fff] text-center font-poppins text-[32px] font-semibold'>Sunny</h1>
            </div>
          </div>
        </div>

        

      </div>
      {/* <div id="openweathermap-widget-11"></div> */}
  </div>
  )
}

export default Weather
