
const apiKey = '551d063b1baee0e6f3941c289e31d68f';

function cToF(celsius) {
    return (celsius * 9/5) + 32;
  }

function fToC(fahrenheit) {
return (fahrenheit - 32) * (5/9);
}
  
async function getLocation(location) {
    const geo = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`;

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


   
    let tempF = data.main.temp;
    let tempC = fToC(data.main.temp);

    console.log(tempF);
    console.log(tempC);



    temp.textContent = `(${tempF} F; ${tempC} C)`;

    weatherCont.appendChild(location);
    weatherCont.appendChild(temp);
};

const searched = new Set();

async function handleSearch(event) {
    event.preventDefault();

    const input = document.querySelector('input').value;

    if (searched.has(input.toLowerCase())) {
        
        const error = document.createElement('p');
        
        error.textContent = 'You already have data for this location.';

        error.classList.add('error');
        
        const append = document.getElementById('appender');
        append.appendChild(error);
        return;
    };

    searched.add(input.toLowerCase());

    const location = await getLocation(input);

    const weather = await getWeather(location.lat, location.lon);

    display(weather);
};

const form = document.getElementById('weather-form');

form.addEventListener('submit', handleSearch);

