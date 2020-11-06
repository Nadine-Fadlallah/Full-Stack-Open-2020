import React, { useState, useEffect } from "react"
import axios from "axios"


const Weather = ({ capital }) => {
    const [weather, setWeather] = useState([])

    const weatherAPI = "http://api.weatherstack.com/current"
    const params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: capital
    }

    useEffect(() => {
        axios
            .get(weatherAPI, { params })
            .then(response => setWeather(response.data.current))
    }, [])

    return (
        <>
            <h3>Weather in {capital}</h3>
            <div><b>temperature: </b>{weather.temperature} Celcius</div>
            <img src={weather.weather_icons} />
            <div><b>wind: </b> {weather.wind_speed} mphs direction {weather.wind_dir}</div>

        </>
    )
}

export default Weather