

// Alert to user that the city name's spelling would be correct
alert("Please enter the correct spelling of city name.")




//Getting the Elements 
const openSearchBar = document.querySelector("#showBox");
const searchInputBox = document.querySelector(".searchInput");
const bg = document.querySelector(".result-box");
const userInput = document.querySelector("#userInput");
const resultBox = document.querySelector(".result-box");
const resetBnt = document.querySelector(".reset");
const errorMessage = document.querySelector(".errorMessage");
const temp = document.querySelector("#temprature");
const condition = document.querySelector("#condition");
const address = document.querySelector("#location");
const humidity = document.querySelector("#humidity");
const speed = document.querySelector("#speed");
const currentImg = document.querySelector("#currentImg");





openSearchBar.addEventListener("click", openTheBar);
userInput.addEventListener("keypress", showWeather);
resetBnt.addEventListener("click", resetTheWeather);












// opening the search bar
function openTheBar() {
    searchInputBox.classList.toggle("showSearchInput");
}



async function getData() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your Weather API key
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=f866b96f500b4af493f133924240507&q=${cityName}&aqi=yes`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('City not found');
    }
    return await response.json();
}

async function showWeather(event) {
    const value = userInput.value;
    errorMessage.classList.remove("showError");
    if(event.key === "Enter"){
    try {
        let result = await getData(value);
        address.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
        temp.innerText = `${result.current.temp_c}°C`;
        condition.innerText = `${result.current.condition.text}`;
        humidity.innerText = `${result.current.humidity}%`;
        let spd = `${Math.floor(result.current.wind_mph * 1.609344)} Km/h`;
        speed.innerText = spd;

        resultBox.classList.add("show-results");
        errorMessage.innerText = ''; // Clear any previous error messages
        userInput.value = "";

        // Show Images according to conditions
        showImages();
    } catch (error) {
        errorMessage.classList.add("showError");
        errorMessage.innerText = "Error404: NOT_FOUND , City name's spelling will be correct.";
        resultBox.classList.remove("show-results"); // Hide results if there's an error
    }}
}







// Show Images

function showImages(){
    
    if (condition.innerText === "Drizzle") {
        currentImg.setAttribute("src", "https://cdn-icons-png.flaticon.com/128/1146/1146869.png");
    } else if (condition.innerText === "Sunny" || condition.innerText === "Clear") {
        currentImg.setAttribute("src", "https://cdn-icons-png.flaticon.com/128/4814/4814268.png");
    } else if (condition.innerText === "Partly cloudy") {
        currentImg.setAttribute("src", "https://cdn-icons-png.flaticon.com/128/414/414927.png");
    } else if (condition.innerText === "Cloud" || condition.innerText === "Overcast") {
        currentImg.setAttribute("src", "https://cdn-icons-png.flaticon.com/128/1163/1163624.png")
    } else if (condition.innerText === "Light rain" || condition.innerText === "Moderate rain" || condition.inner === "Heavy rain" || condition.innerText === "Rain" || condition.innerText === "Showers") {
        currentImg.setAttribute("src", "https://cdn-icons-png.flaticon.com/128/4088/4088981.png");
    } else if (condition.innerText === "Thunderstorm" || condition.innerText === "Severe thunderstorm") {
        currentImg.setAttribute("src", "https://cdn-icons-png.flaticon.com/128/1779/1779927.png");
    }else if(condition.innerText === "Light snow" || condition.innerText === "Moderate snow" || condition.innerText === "Heavy snow" || condition.innerText === "Snow Showers"){
        currentImg.setAttribute("src","https://cdn-icons-png.flaticon.com/128/1779/1779887.png");
    }else if(condition.innerText === "Fog" || condition.innerText === "Mist"){
        currentImg.setAttribute("src","https://cdn-icons-png.flaticon.com/128/4814/4814293.png");
    }else if(condition.innerText === "Sleet" || condition.innerText === "Hail"){
        currentImg.setAttribute("src","https://cdn-icons-png.flaticon.com/128/1779/1779887.png");
    }else if(condition.innerText === "Blizzard"){
        currentImg.setAttribute("src","https://cdn-icons-png.flaticon.com/128/7334/7334205.png");
    }else if(condition.innerText === "Light freezing rain" || condition.innerText === "Moderate or heavy freezing rain"){
        currentImg.setAttribute("src","https://cdn-icons-png.flaticon.com/128/1779/1779887.png");
    }else if(condition.innerText === "Tornado"){
        currentImg.setAttribute("src","https://cdn-icons-png.flaticon.com/128.png");
    }else if(condition.innerText === "Hurricane" || condition.innerText === "Tropical storm"){
        currentImg.setAttribute("src","https://cdn-icons-png.flaticon.com/128/7334/7334205.png");
    }else if(condition.innerText === "Dust storm" || condition.innerText === "Sandstorm"){
        currentImg.setAttribute("src","https://cdn-icons-png.flaticon.com/128/2044/2044028.png");
    }else if(condition.innerText === "Patchy rain nearby"){
        currentImg.setAttribute("src","https://cdn-icons-png.flaticon.com/128/1779/1779887.png");
    }else{
        currentImg.setAttribute("src","https://cdn-icons-png.flaticon.com/128/4814/4814293.png"); // default image for unknown condition
    }

}



// Reset the search input
function resetTheWeather() {
    resultBox.classList.remove("show-results");
}


// functon to get weather api data
async function getData(cityName) {
    const promise = await fetch(`https://api.weatherapi.com/v1/current.json?key=f866b96f500b4af493f133924240507&q=${cityName}&aqi=yes`);
    return await promise.json();
};