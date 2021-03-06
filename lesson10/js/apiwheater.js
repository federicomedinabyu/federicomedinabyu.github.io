const apiURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=da923bb8ec61575a7dfe5e3106bb43c1";

fetch(apiURL)
 .then((response) => response.json())
 .then((town) => {
   console.log(town);
   let description = town.weather[0].description;
   document.getElementById('currently').innerHTML = description.charAt(0).toUpperCase() + description.slice(1);
   document.getElementById('temp').innerHTML = Math.round(town.main.temp);
   document.getElementById('humidity').innerHTML = town.main.humidity;
   document.getElementById('windspeed').innerHTML = Math.round(town.wind.speed);
 
   // Weather Summary
const apiURL_weather = 'https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=b1c4009595630e2651d3712160a3c1f6&units=imperial';

fetch(apiURL_weather)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {

        let temp = jsonObject.main.temp;
        let tempHigh = jsonObject.main.temp_max;
        let windspeed = jsonObject.wind.speed;

        document.getElementById('currently').textContent = jsonObject.weather[0].description;
        document.getElementById('temp').textContent = Math.round(temp);
        document.getElementById('humidity').textContent = jsonObject.main.humidity;
        document.getElementById('windspeed').textContent = Math.round(windspeed);

        //windchill
        
        let output = "N/A"
        if (temp <= 50 && windspeed > 3) {
            output = Math.round(35.74 + 0.6215 * temp - 35.75 * windspeed ** 0.16 + 0.4275 * temp * windspeed ** 0.16);
            output += " \xB0F";
        }

        document.getElementById("windchill").textContent = output;

    });

// 5 day forecast

const apiURL_forecast = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&APPID=da923bb8ec61575a7dfe5e3106bb43c1"

fetch(apiURL_forecast)
   .then(response => response.json())
   .then((jsObject) => {
       console.log(jsObject);
       const forecastData = jsObject.list.filter((element)=>element.dt_txt.includes('18:00:00'));

  console.log(forecastData);

  const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

   let day = 0;
  forecastData.forEach(forecast => {
    let x = new Date(forecast.dt_txt);
   document.getElementById('temp'+(day+1)).textContent = Math.round(forecast.main.temp) + ' °F';
   document.getElementById('img'+(day+1)).src = "https://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png";
   document.getElementById('img'+(day+1)).alt = forecast.weather[0].description
  document.getElementById('day'+(day+1)).textContent = weekdays[x.getDay()];
  day++;	  
  });
});
 })
