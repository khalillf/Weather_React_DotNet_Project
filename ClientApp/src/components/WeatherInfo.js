import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

const WeatherInfo = () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cityList, setCityList] = useState([
        { name: 'Casablanca', latitude: 33.5731, longitude: -7.5898 },
        { name: 'Rabat', latitude: 34.0209, longitude: -6.8416 },
        { name: 'Marrakech', latitude: 31.6295, longitude: -7.9811 },
        // Add more cities with their latitude and longitude
    ]);

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

    const getWeatherByLocation = async () => {
        try {
            const response = await axios.get(
                `https://localhost:7128/api/WeatherData/getWeatherByLocation/${selectedCity.latitude}/${selectedCity.longitude}`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        // Use latitude and longitude from localStorage
        if (storedLatitude && storedLongitude) {
            const matchedCity = cityList.find(
                (city) =>
                    city.latitude === parseFloat(storedLatitude) &&
                    city.longitude === parseFloat(storedLongitude)
            );

            if (matchedCity) {
                setSelectedCity(matchedCity);
                setValue(matchedCity.name);
                getWeatherByLocation(); // Fetch weather data for the user's location
            }
        }
    }, [cityList]);

    return (
        <div>
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
            <button onClick={getWeatherByLocation} disabled={!selectedCity}>
                Get Weather
            </button>

            {weatherData && (
                <div>
                    <h3>Weather Data for {selectedCity.name}</h3>
                    <p>Temperature: {weatherData.temperature} °C</p>
                    <p>Humidity: {weatherData.humidity}%</p>
                    <p>Pressure: {weatherData.pressure} hPa</p>
                    {/* Add other weather data fields as needed */}
                </div>
            )}
        </div>
    );
};

export default WeatherInfo;
