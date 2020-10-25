let key = "0e573fd4dea4803d1538fdac2ccb7c50";
let h1 = document.querySelector("h1");
let temperature = document.querySelector("#temperature");
let description = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");

function showCity(event) {
    event.preventDefault(); //preventing form being reloaded
    let serachInput = document.querySelector("#search-text-input");
    //console.log(serachInput.value);
    h1.innerHTML = serachInput.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${serachInput.value}&appid=${key}&units=metric`;


axios.get(apiUrl).then(function (response) {
    console.log(response.data.main.temp);
    temperature.innerHTML = Math.round(response.data.main.temp);
    description.innerHTML = response.data.weather[0].main;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = response.data.wind.speed;
})

}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);


window.onload = function() {
 
    date = new Date();
    console.log(date);
    let dateToUpdate = document.querySelector("#date");
    let days = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
    if (date.getMinutes() < 10) {
        dateToUpdate.innerHTML = `${days[date.getDay()]} ${date.getHours()}:0${date.getMinutes()}`;
    } else {
        dateToUpdate.innerHTML = `${days[date.getDay()]} ${date.getHours()}:${date.getMinutes()}`;
    }


};

function showPosition(position) {
    
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let lApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    axios.get(lApiUrl).then(function (response) {
        
    h1.innerHTML = response.data.name;  
    temperature.innerHTML = Math.round(response.data.main.temp);
    description.innerHTML = response.data.weather[0].main;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = response.data.wind.speed;

    })


}

function askPermision(){
navigator.geolocation.getCurrentPosition(showPosition);
}

let buttom = document.querySelector("#current-location-button");
buttom.addEventListener("click",askPermision);
