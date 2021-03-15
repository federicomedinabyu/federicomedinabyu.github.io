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
 
   //windchill//
   let output = "N/A"
        if (temp <= 50 && wind > 3) {
            output = (35.74 + 0.6215 * temp - 35.75 * wind ** 0.16 + 0.4275 * temp * wind ** 0.16).toFixed(1);
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

