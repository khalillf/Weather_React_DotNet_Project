import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherHistory.css'; // Import your CSS file

const WeatherHistory = () => {
    const [weatherHistory, setWeatherHistory] = useState([]);
    const userId = localStorage.getItem('userId'); // Get the user ID from localStorage

    useEffect(() => {
        // Fetch historical weather data for the user by location ID
        axios
            .get(`https://localhost:7128/api/WeatherData/getWeatherByLocationID/${userId}`)
            .then((response) => {
                setWeatherHistory(response.data);
            })
            .catch((error) => {
                console.error('Error fetching historical weather data:', error);
            });
    }, [userId]); // Add userId to the dependency array

    return (
        <div className="weather-history">
            <h2>Weather History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Temperature (C)</th>
                        <th>Humidity (%)</th>
                        <th>Pressure (hPa)</th>
                        <th>Wind Speed (m/s)</th>
                        <th>Wind Direction</th>
                        <th>Precipitation</th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {weatherHistory.map((entry) => (
                        <tr key={entry.id}>
                            <td>{entry.date}</td>
                            <td>{entry.time}</td>
                            <td>{entry.temperature}</td>
                            <td>{entry.humidity}</td>
                            <td>{entry.pressure}</td>
                            <td>{entry.windSpeed}</td>
                            <td>{entry.windDirection}</td>
                            <td>{entry.precipitation}</td>
                            {/* Add more cells for additional data */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WeatherHistory;
