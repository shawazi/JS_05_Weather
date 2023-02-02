
const apiKey = '551d063b1baee0e6f3941c289e31d68f';

function cToF(celsius) {
    return (celsius * 9/5) + 32;
  }

function fToC(fahrenheit) {
return (fahrenheit - 32) * (5/9);
}
  
async function getLocation(location) {
    const geo = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`;

    const response = await fetch(geo);

    const data = await response.json();

    // console.log(data);
    // console.log(data[0].lat)
    // console.log(data[0].lon)

    return {
        lat: data[0].lat,
        lon: data[0].lon
    };
};

async function getWeather(lat, lon) {
    const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    const response = await fetch(weather);

    return await response.json();
};

function display(data) {
    const weatherCont = document.createElement("div");
    document.getElementById('appender').appendChild(weatherCont);
    

    weatherCont.classList.add('weather-cont');

    const location = document.createElement('h3');

    location.textContent = data.name;

    const temp = document.createElement('p');
    
   
    let tempF = data.main.temp.toFixed(2);
    let tempC = fToC(data.main.temp).toFixed(2);

    console.log(data);
    // console.log(tempC);



    temp.textContent = `Temperature: ${tempF} F; ${tempC} C`;


    const real_feel = document.createElement('p');
    let perceived = data.main.feels_like.toFixed(2);
    let perceivedC = fToC(data.main.feels_like).toFixed(2);

    real_feel.textContent = `Perceived: ${perceived} F; ${perceivedC} C`;
    
    // console.log(data.weather[0].main)

    const conditions = data.weather[0].main;

    const atmos = document.createElement('p');

    atmos.textContent = `Atmospheric Condition: ${conditions}`;

    console.log(data.wind.speed)

    const windSpeed = data.wind.speed.toFixed(2);

    const wind = document.createElement('p');

    wind.textContent = `Wind Speed: ${windSpeed}`



    weatherCont.appendChild(location);
    weatherCont.appendChild(temp);
    weatherCont.appendChild(real_feel);
    weatherCont.appendChild(atmos);
    weatherCont.appendChild(wind)

};

const searched = new Set();

async function handleSearch(event) {
    event.preventDefault();

    const input = document.querySelector('input').value;

    const val = document.getElementById('validation');

    searched.add(input.toLowerCase());
    
    const location = await getLocation(input);

    const weather = await getWeather(location.lat, location.lon);

    display(weather);
};

let errorDisp = false;

function errorMsg() {

    const check = document.getElementById('error');
    if (!errorDisp) {
    
    

        const error = document.createElement('p');

        error.innerHTML = "<span style='color: red;'>"+ "You already have data for this location.</span>"
        
        error.classList.add('error');

        document.getElementById('error').appendChild(error);

        errorDisp = true;
    }

};


const form = document.getElementById('weather-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = document.querySelector('input').value;

    if (searched.has(input.toLowerCase())) {
        errorMsg();
        return;
    }

    searched.add(input.toLowerCase());

    const location = await getLocation(input);
    const weather = await getWeather(location.lat, location.lon);
    display(weather);
});


