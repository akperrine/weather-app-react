import "./App.css";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import ForcastList from "./components/ForcastList/ForcastList";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import { faList } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [inputField, setInputField] = useState("");
  const [currTemp, setCurrTemp] = useState("");
  const [weeklyForcast, setWeeklyForcast] = useState([]);
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [cloudGif, setCloudGif] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [city, setCity] = useState("");
  console.log(inputField);
  // console.log(sunrise, sunset, cloudGif, humidity, wind, feelsLike);
  const openKey = process.env.REACT_APP_API_OPEN_WEATHER_KEY;

  const onSearchChange = (event) => {
    const searchString = event.target.value.toLowerCase();
    setInputField(searchString);
  };

  const tempF = (tempK) => {
    const degF = Math.round(tempK * (9 / 5) - 459.67);
    return degF;
  };

  // const dailyTempFetch = (latitude) => {
  //   const dailyTempFetch = fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?lat=33.4484&lon=-112.0740&appid=a38108866a4d31a76f65d9a4f2fa9664
  //       `
  //   // ).then((response) => response.json());
  //   const fiveDayFetch = fetch(
  //     // `https://api.openweathermap.org/data/2.5/forecast?lat=33.4484&lon=-112.0740&appid=a38108866a4d31a76f65d9a4f2fa9664`
  //   // ).then((response) => response.json());

  //   const allData = Promise.all([dailyTempFetch, fiveDayFetch]).then((res) => {
  //     setCurrTemp(tempF(res[0].main.temp));
  //     setCity(res[0].name);
  //     setMax(tempF(res[0].main.temp_max));
  //     setMin(tempF(res[0].main.temp_min));
  //     setSunrise(res[0].sys.sunrise);
  //     setSunset(res[0].sys.sunset);
  //     setCloudGif(res[0].weather[0].main);
  //     setWind(res[0].wind.speed);
  //     setHumidity(res[0].main.humidity);
  //     sortAPIForcastArr(res[1].list);
  //   });
  //   console.log("happened");
  // };

  // async function loadDailyTemp() {
  //   const getLat = async () => {
  //     await navigator.geolocation.getCurrentPosition(
  //       function onSuccess(position) {
  //         const latitude = position.coords.latitude;
  //         console.log(latitude);
  //         dailyTempFetch(latitude);

  //         // const latitude = position.coords.latitude
  //         // const longitude = position.coords.longitude
  //       },
  //       function onError(error) {
  //         console.log("error");
  //       }
  //     );
  //   };
  //   const latitude = getLat();
  // }
  // loadDailyTemp();

  const sortAPIForcastArr = (arr) => {
    const weeklyArr = [];
    for (let i = 0; i < arr.length; i += 8) {
      let highLowObj = {
        avgTemp: tempF(arr[i].main.temp),
      };
      weeklyArr.push(highLowObj);
    }
    setWeeklyForcast(weeklyArr);
  };

  useEffect(() => {
    const dailyTempFetch = (latitude, longitude) => {
      const dailyTempFetch = fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openKey}
          `
      ).then((response) => response.json());
      const fiveDayFetch = fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${openKey}`
      ).then((response) => response.json());

      const allData = Promise.all([dailyTempFetch, fiveDayFetch]).then(
        (res) => {
          setCurrTemp(tempF(res[0].main.temp));
          setCity(res[0].name);
          setMax(tempF(res[0].main.temp_max));
          setMin(tempF(res[0].main.temp_min));
          setSunrise(res[0].sys.sunrise);
          setSunset(res[0].sys.sunset);
          setCloudGif(res[0].weather[0].main);
          setWind(res[0].wind.speed);
          setHumidity(res[0].main.humidity);
          sortAPIForcastArr(res[1].list);
        }
      );
      console.log("happened");
    };

    async function loadDailyTemp() {
      const getLat = async () => {
        await navigator.geolocation.getCurrentPosition(
          function onSuccess(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(latitude, longitude);
            dailyTempFetch(latitude, longitude);

            // const latitude = position.coords.latitude
            // const longitude = position.coords.longitude
          },
          function onError(error) {
            console.log("error");
          }
        );
      };
      const latitude = getLat();
    }
    loadDailyTemp();
    // fetch(`https://api.geoapify.com/v1/geocode/search?text=Phoenix&lang=en&limit=10&type=city&apiKey=${process.env.REACT_APP_API_GEOLOC_KEY}
    // `)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setLat(data.features[0].properties.lat);
    //     setLon(data.features[0].properties.lon);
    //     setCity(data.features[0].properties.city);
    //   });
    //   const options = {
    //     method: "GET",
    //     headers: {
    //       "X-RapidAPI-Key": "c3ce7eb6abmsha60f52485bc4152p19c018jsn0ee12ea33502",
    //       "X-RapidAPI-Host": "spott.p.rapidapi.com",
    //     },
    //   };
    //   fetch(
    //     "https://spott.p.rapidapi.com/places/autocomplete?limit=10&skip=0&country=US,CA,MX&q=scot&type=city",
    //     options
    //   )
    //     .then((response) => response.json())
    //     .then((response) => console.log(response))
    //     .catch((err) => console.error(err));
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "X-RapidAPI-Key": `${process.env.REACT_APP_API_WEATHER_KEY}`,
    //     "X-RapidAPI-Host": "aerisweather1.p.rapidapi.com",
    //   },
    // };
    // const dailyTempFetch = fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?lat=33.4484&lon=-112.0740&appid=a38108866a4d31a76f65d9a4f2fa9664
    //     `
    // ).then((response) => response.json());
    // const fiveDayFetch = fetch(
    //   `https://api.openweathermap.org/data/2.5/forecast?lat=33.4484&lon=-112.0740&appid=a38108866a4d31a76f65d9a4f2fa9664`
    // ).then((response) => response.json());
    // const allData = Promise.all([dailyTempFetch, fiveDayFetch]).then((res) => {
    //   setCurrTemp(tempF(res[0].main.temp));
    //   setCity(res[0].name);
    //   setMax(tempF(res[0].main.temp_max));
    //   setMin(tempF(res[0].main.temp_min));
    //   setSunrise(res[0].sys.sunrise);
    //   setSunset(res[0].sys.sunset);
    //   setCloudGif(res[0].weather[0].main);
    //   setWind(res[0].wind.speed);
    //   setHumidity(res[0].main.humidity);
    //   sortAPIForcastArr(res[1].list);
    // });
  }, []);

  return (
    <div className="app-container">
      <Navigation searchChange={onSearchChange} input={inputField} />
      <div className="display-container">
        <div className="city-container">
          <h2>{city}</h2>
          <div className="current-temp">Current Temp: {currTemp}°F</div>
        </div>

        <ForcastList weeklyForcast={weeklyForcast} />
        <WeatherInfo
          feelsLike={feelsLike}
          max={max}
          min={min}
          humidity={humidity}
          sunrise={sunrise}
          sunset={sunset}
          wind={wind}
        />
      </div>
    </div>
  );
};

export default App;
