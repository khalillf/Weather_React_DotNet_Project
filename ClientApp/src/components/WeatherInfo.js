import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import './WeatherInfo.css';
import { FaThermometer, FaTint, FaTachometerAlt, FaWind,  FaCompass } from 'react-icons/fa';

const WeatherInfo = () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [additionalWeatherData, setAdditionalWeatherData] = useState({});
    const [userId, setUserId] = useState(localStorage.getItem('userId')); // Get the userId once
    const [submitData, setSubmitData] = useState(false); // State to control data submission

    const [cityList, setCityList] = useState([
        { name: 'Casablanca', latitude: 33.5731, longitude: -7.5898 },
        { name: 'Rabat', latitude: 34.0209, longitude: -6.8416 },
        { name: 'Marrakech', latitude: 31.6295, longitude: -7.9811 },
        { name: 'Sale', latitude: 34.0511, longitude: -6.7985 },
        { name: 'Agadir', latitude: 30.4212, longitude: -9.5839 },
        { name: 'Fez', latitude: 34.0181, longitude: -5.0078 },
        { name: 'Tangier', latitude: 35.7721, longitude: -5.8038 },
        { name: 'Meknes', latitude: 33.8955, longitude: -5.5474 },
        { name: 'Oujda', latitude: 34.6784, longitude: -1.9086 },
        { name: 'Kenitra', latitude: 34.2599, longitude: -6.5704 },
        { name: 'Tetouan', latitude: 35.5724, longitude: -5.3674 },
        { name: 'Nador', latitude: 35.1740, longitude: -2.9273 },
        { name: 'El Jadida', latitude: 33.2557, longitude: -8.5016 },
        { name: 'Beni Mellal', latitude: 32.3342, longitude: -6.3554 },
        { name: 'Taza', latitude: 34.2147, longitude: -4.0122 },
        { name: 'Khouribga', latitude: 32.8870, longitude: -6.9063 },
        { name: 'Ouarzazate', latitude: 30.9202, longitude: -6.9107 },
        { name: 'Larache', latitude: 35.1939, longitude: -6.1559 },
        { name: 'Guelmim', latitude: 28.9864, longitude: -10.0567 },
        { name: 'Errachidia', latitude: 31.9292, longitude: -4.4239 },
        { name: 'Lagouira', latitude: 20.9333, longitude: -17.0333 },
        { name: 'Dakhla', latitude: 23.6848, longitude: -15.9566 },

        // Add more cities with their latitude and longitude
    ]);

    useEffect(() => {
        // Automatically post weather data when weatherData is available
        if (weatherData) {
            handlePostWeatherData();
        }
    }, [weatherData]);

    const handlePostWeatherData = () => {
        // Create a data object with the necessary fields
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0]; // Extract YYYY-MM-DD
        const formattedTime = currentDate.toISOString().split('T')[1].substring(0, 8); // Extract HH:MM:SS

        const postData = {
            LocationID: userId, // Use the userId from state
            date: formattedDate,
            time: formattedTime,
            temperature: weatherData.temperature,
            humidity: weatherData.humidity,
            pressure: weatherData.pressure,
            windSpeed: 7,
            windDirection: "N",
            precipitation: 20,
        };


        // Send a POST request to your controller endpoint
        axios
            .post('https://localhost:7128/api/WeatherData', postData)
            .then((response) => {
                // Handle the response if needed
                console.log('Weather data posted successfully:', response.data);
            })
            .catch((error) => {
                console.log(postData);
                console.error('Error posting weather data:', error);
            });
    };

    useEffect(() => {
        // Fetch weather data from the first API endpoint
        if (selectedCity) {
            axios
                .get(
                    `https://localhost:7128/api/WeatherData/getWeatherByLocation/${selectedCity.latitude}/${selectedCity.longitude}`
                )
                .then((response) => {
                    setWeatherData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching weather data:', error);
                });

            // Fetch additional weather data from the second API endpoint
            axios
                .get('https://localhost:7128/api/WeatherData')
                .then((response) => {
                    // Find the data for the selected city in the response
                    const cityWeatherData = response.data.find(
                        (data) => data.locationID === selectedCity.locationID
                    );

                    if (cityWeatherData) {
                        setAdditionalWeatherData(cityWeatherData);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching additional weather data:', error);
                });
        }
    }, [selectedCity]);

    // Retrieve latitude and longitude from localStorage
    const storedLatitude = localStorage.getItem('latitude');
    const storedLongitude = localStorage.getItem('longitude');

    const getSuggestions = (inputValue) => {
        const inputLowerCase = inputValue.trim().toLowerCase();
        return cityList.filter((city) => city.name.toLowerCase().includes(inputLowerCase));
    };

    const getSuggestionValue = (suggestion) => suggestion.name;

    const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onChange = (_, { newValue }) => {
        setValue(newValue);
    };

    const onSuggestionSelected = (_, { suggestion }) => {
        setSelectedCity(suggestion);
    };

    return (
        <div className="weather-info">
            <h2>Weather Information by City</h2>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                    placeholder: 'Type a city',
                    value,
                    onChange,
                    onBlur: () => onSuggestionSelected(null, { suggestion: selectedCity }),
                }}
                onSuggestionSelected={onSuggestionSelected}
            />
            <button onClick={handlePostWeatherData}>Post Weather Data</button>


            {weatherData && additionalWeatherData && (
                <div className="weather-data">
                    <p >
                        <FaThermometer /> Temperature: {weatherData.temperature} C
                    </p>
                    <p >
                        <FaTint /> Humidity: {weatherData.humidity}%
                    </p>
                    <p >
                        <FaTachometerAlt /> Pressure: {weatherData.pressure} hPa
                    </p>
                    <p >
                        <FaWind /> Wind Speed: 6.2 m/s
                    </p>
                    <p >
                        <FaCompass /> Wind Direction: N
                    </p>
                   

                </div>
            )}
        </div>
    );
};

export default WeatherInfo;
