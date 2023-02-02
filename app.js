
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

    const locationDiv = document.createElement('div');
    locationDiv.classList.add('center-header');

    const location = document.createElement('h3');
    locationDiv.appendChild(location);

    location.textContent = data.name;

    const temp = document.createElement('p');
    
   
    let tempF = data.main.temp.toFixed(2);
    let tempC = fToC(data.main.temp).toFixed(2);

    // console.log(data);
    // console.log(tempC);



    temp.textContent = `Temperature: ${tempF} F; ${tempC} C`;


    const real_feel = document.createElement('p');
    let perceived = data.main.feels_like.toFixed(2);
    let perceivedC = fToC(data.main.feels_like).toFixed(2);

    real_feel.textContent = `Perceived: ${perceived} F; ${perceivedC} C`;
    
    // console.log(data.weather[0].main)

    const conditions = data.weather[0].main;
    console.log(conditions);

    if (data.weather[0].main == "Clouds") {
        weatherCont.classList.add("clouds");
    } else if (data.weather[0].main == "Mist") {
        weatherCont.classList.add("mist");
    } else if (data.weather[0].main == "Rain") {
        weatherCont.classList.add("rain");
    } else if (data.weather[0].main == "Snow") {
        weatherCont.classList.add("snow");
    } else if (data.weather[0].main == "Clear") {
        weatherCont.classList.add("clear");
    } else if (data.weather[0].main == "Smoke") {
        weatherCont.classList.add("smoke");
    } else if (data.weather[0].main == "Thunderstorm") {
        weatherCont.classList.add("thunder");
    } else if (data.weather[0].main == "Drizzle") {
        weatherCont.classList.add("drizzle");
    } else if (data.weather[0].main == "Fog") {
        weatherCont.classList.add("fog");
    } else if (data.weather[0].main == "Haze") {
        weatherCont.classList.add("Haze");
    } else if (data.weather[0].main == "Dust") {
        weatherCont.classList.add("dust");
    } else if (data.weather[0].main == "Ash") {
        weatherCont.classList.add("ash");
    } else if (data.weather[0].main == "Tornado") {
        weatherCont.classList.add("tornado");
    } else if (data.weather[0].main == "Squall") {
        weatherCont.classList.add("squall");
    }

    // console.log(weatherCont);
    const atmos = document.createElement('p');
    atmos.setAttribute("id", "conditions");

    // console.log(data.weather[0].icon)

    const icon = data.weather[0].icon;
    // console.log(icon);

    let symbol = "http://openweathermap.org/img/wn/";
    let ext = ".png";
    
    const imageURL = symbol + icon + ext;

    // console.log(imageURL);

    // http://openweathermap.org/img/wn/ 

    // .png

    // const weatherImage = document.createElement("img");
    // weatherImage.src = imageURL;

    // console.log(weatherImage);

    // atmos.insertAdjacentElement("afterbegin", weatherImage);

    // atmos.appendChild(weatherImage);

    // atmos.innerHTML = `<img src="${imageURL}"`

    // console.log(atmos);


    atmos.textContent = `Atmospheric Condition: ${conditions}`;

    // console.log(data.wind.speed)

    const windSpeed = data.wind.speed.toFixed(2);

    const wind = document.createElement('p');

    wind.textContent = `Wind Speed Miles/Hour: ${windSpeed}`;





    weatherCont.appendChild(locationDiv);
    weatherCont.appendChild(temp);
    weatherCont.appendChild(real_feel);
    weatherCont.appendChild(atmos);
    weatherCont.appendChild(wind);



    // weatherImage.addEventListener("error", function() {
    //     console.error("Failed to load image");
    // });

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

    // const errorMessage = document.querySelector('.error');


    // I DON'T KNOW HOW TO FIX THIS ERROR HANDLING 
    if (!(searched.has(input.toLowerCase()))) {
        // errorMessage.remove();
        errorDisp = false;
    };
};

let errorDisp = false;

function errorMsg() {

    // const check = document.getElementById('error');

    if (!errorDisp) {
    
    

        const error = document.createElement('p');

        error.innerHTML = "<span style='color: red;'>"+ "You already have data for this location, or it isn't a valid location name.</span>"
        
        error.classList.add('error');

        document.getElementById('weather-form').appendChild(error);

        errorDisp = true;

    }

};


const form = document.getElementById('weather-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = document.querySelector('input').value;
    const errorMessage = document.querySelector('.error');


    if (searched.has(input.toLowerCase())) {
        errorMsg();
        return;
    } 
    


    const location = await getLocation(input);

    if (errorMessage) {
        errorMessage.remove();
        errorDisp = false;
    };

    searched.add(input.toLowerCase());

    const weather = await getWeather(location.lat, location.lon);
    display(weather);
    document.getElementById("weather-form").reset();


});


