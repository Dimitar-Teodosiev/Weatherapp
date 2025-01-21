document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '349c13944523bda87047448c7c77c5b6';
    const searchIcon = document.querySelector('.search-icon');
    const cityInput = document.getElementById('cityInput');
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherCaption = document.getElementById('weatherCaption');

    searchIcon.addEventListener('click', function() {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please enter a city name.');
        }
    });

    cityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeather(city);
            } else {
                alert('Please enter a city name.');
            }
        }
    });

    function fetchWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.cod === 200) {
                    document.querySelector('.location').textContent = data.name;
                    document.querySelector('.temperature').textContent = `${Math.round(data.main.temp)}°C`;
                    document.querySelector('.humidity').textContent = `Humidity: ${data.main.humidity}%`;
                    document.querySelector('.wind-speed').textContent = `Wind Speed: ${data.wind.speed} km/h`;

                    const iconCode = data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                    weatherIcon.src = iconUrl;

                    const description = data.weather[0].description;
                    weatherCaption.textContent = description;
                } else {
                    alert('City not found. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Failed to fetch weather data. Please check your connection and try again.');
            });
    }

    fetchWeather('New York');
});