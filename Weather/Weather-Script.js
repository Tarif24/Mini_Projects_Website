const apiKey = "kEUYLlJPWhmzqHuoQ86iaHYRiD5V1ASv";
const locationKeyUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";
const currentConditionsUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
const hourlyConditionsUrl = "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/";

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
    .then((data) => 
        {
            GetLocationWeather(data[0]);
            GetHourlyLocationWeather(data[0]);
        })
    .catch(error => 
    {
        alert("Please Enter A Valid City");
        document.getElementById("city-input").value = "";
    })

}

function GetLocationWeather(locationData)
{
    const queryRequest = `${currentConditionsUrl}${locationData.Key}?apikey=${apiKey}`

    fetch(queryRequest)
    .then((response) => response.json())
    .then((data) => {DisplayWeatherInfo(data[0], locationData.LocalizedName, locationData.Country.LocalizedName)});
}

function GetHourlyLocationWeather(locationData)
{
    const queryRequest = `${hourlyConditionsUrl}${locationData.Key}?apikey=${apiKey}`

    fetch(queryRequest)
    .then((response) => response.json())
    .then((data) => {DisplayHourlyWeather(data)});
}

function DisplayWeatherInfo(locationWeatherData, city, country)
{
    const tempText = document.getElementById("temp");
    const cityText = document.getElementById("city");

    tempText.innerText = `${locationWeatherData.Temperature.Metric.Value}\u00B0${locationWeatherData.Temperature.Metric.Unit}`;
    document.getElementById("mini-description").innerText = locationWeatherData.WeatherText;
    cityText.innerText = `${city}, ${country}`;
}

function DisplayHourlyWeather(locationHourlyData)
{
    let hourlyContainer = document.getElementById("hourly-weather-info");

    hourlyContainer.innerHTML = "";

    locationHourlyData.forEach((element, index) => 
    {
        const dateTime = new Date (element.EpochDateTime * 1000);
        let time = dateTime.getHours();
        let temp = 0;
        let timePostFix = ""

        if (element.Temperature.Unit = "F")
        {
            temp = ((Number(element.Temperature.Value) - 32) * (5/9)).toFixed(1);
        }
        else
        {
            temp = element.Temperature.Value;
        }

        if (time > 12)
        {            
            time -= 12;
            timePostFix = "PM"
        }
        else if (time == 0)
        {
            time = 12;
            timePostFix = "AM"
        }
        else
        {
            timePostFix = "AM"
        }
        

        hourlyContainer.innerHTML += 
        `
        <div class = "hour-info">
            <h4>${time}:00${timePostFix}</h4>
            <h4>${temp}°C</h4>
        </div>
        `;
    });
}