const apiKey = "8sK6tAhMGdvAuR8AKZI2skFpN8xEA8EE";
const locationKeyUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";
const currentConditionsUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
const tempText = document.getElementById("temp");
const cityText = document.getElementById("city");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener('click', GetLocationKey)

function GetLocationKey()
{
    const city = document.getElementById("city-input").value;
    const queryRequest = `${locationKeyUrl}?apikey=${apiKey}&q=${city}`;

    if (city == "")
    {
        alert("Please Enter A City");
        return;
    }

    fetch(queryRequest)
    .then((response) => response.json())
    .then((data) => {GetLocationWeather(data[0]);})
}

function GetLocationWeather(locationData)
{
    const queryRequest = `${currentConditionsUrl}${locationData.Key}?apikey=${apiKey}`

    fetch(queryRequest)
    .then((response) => response.json())
    .then((data) => {SetUiInfo(data[0])});
}

function SetUiInfo(locationWeatherData)
{
    console.log(locationWeatherData);
}