
const apiKey = 'ad9dfdc03ebb6528152c4dee7145e7e0';


function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  $.get(apiUrl, function(data) {
    const weatherList = data.list;
    let weatherHTML = '';

    for (let i = 0; i < weatherList.length; i += 8) {
      var weather = weatherList[i];
      var date = new Date(weather.dt_txt);
      var icon = weather.weather[0].icon;
      var temperature = Math.round(weather.main.temp - 273.15);
      var humidity = weather.main.humidity;
      var windSpeed = weather.wind.speed;

      weatherHTML += `
        <div class="card">
          <div class="card-divider">
            ${date.toLocaleDateString()}
          </div>
          <div class="card-section">
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png">
            <p>Temperature: ${temperature}&deg;C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
          </div>
        </div>
      `;
    }

    $('#weatherContainer').html(weatherHTML);
  });
}


$('#searchForm').submit(function(event) {
  event.preventDefault();
  const city = $('#cityInput').val();


  const searchHistory = localStorage.getItem('searchHistory') || '[]';
  const historyArray = JSON.parse(searchHistory);
  historyArray.push(city);
  localStorage.setItem('searchHistory', JSON.stringify(historyArray));





  fetchWeather(city);
});


