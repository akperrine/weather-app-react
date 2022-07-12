import "./App.css";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import ForcastList from "./components/ForcastList/ForcastList";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";

const App = () => {
  const [currTemp, setCurrTemp] = useState("");
  const [weeklyForcast, setWeeklyForcast] = useState([]);
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [cloudGif, setCloudGif] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [weather, setWeather] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [city, setCity] = useState("");
  console.log(sunrise, sunset, cloudGif, humidity, wind, feelsLike, weather);

  const sortAPIForcastArr = (arr) => {
    const weeklyArr = [];
    arr.forEach((day, i) => {
      let highLowObj = {
        max: day.temp_max_f,
        min: day.temp_min_f,
      };
      weeklyArr.push(highLowObj);
    });
    return weeklyArr;
  };

  const weeklyForcastArr = (arr) => {
    console.log(arr);
  };

  console.log(process.env.REACT_APP_API_GEOLOC_KEY);
  useEffect(() => {
    fetch(`https://api.geoapify.com/v1/geocode/search?text=Phoenix&lang=en&limit=10&type=city&apiKey=${process.env.REACT_APP_API_GEOLOC_KEY}
    `)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLat(data.features[0].properties.lat);
        setLon(data.features[0].properties.lon);
        setCity(data.features[0].properties.city);
      });
  }, []);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.REACT_APP_API_WEATHER_KEY}`,
      "X-RapidAPI-Host": "aerisweather1.p.rapidapi.com",
    },
  };
  fetch(`https://aerisweather1.p.rapidapi.com/forecasts/${lat},${lon}`, options)
    .then((response) => response.json())
    .then((data) => {
      const objTraverse = data.response[0].periods[0];
      // console.log("obj:", response.features);
      setCurrTemp(objTraverse.maxFeelslikeF);
      setCloudGif(objTraverse.icon);
      setWind(objTraverse.windSpeedMPH);
      setHumidity(objTraverse.maxHumidity);
      setFeelsLike(objTraverse.maxFeelslikeF);
      setWeather(objTraverse.weather);
      setSunrise(objTraverse.sunrise);
      setSunset(objTraverse.sunset);
      weeklyForcastArr(data.response[0].periods);
    })
    .catch((err) => console.error(err));

  return (
    <div className="app-container">
      <Navigation />
      <div className="display-container">
        <div className="city-container">
          <h2>{city}</h2>
          <div className="current-temp">High of: {currTemp}°F</div>
          <ForcastList weeklyForcast={weeklyForcast} />
          <WeatherInfo />
        </div>
      </div>
    </div>
  );
};

export default App;
