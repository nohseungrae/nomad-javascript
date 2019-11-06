const COORDS = "coords";
const API_KEY = "6a154b382391c1c660aea8bc3189fb04";
const weather = document.querySelector(".js-weather");
const getWeather = (lat, lng) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);
      const temp = json.main.temp;
      const place = json.name;
      weather.innerHTML = `${temp} @ ${place}`;
    });
};

const saveCoords = coordsObj => {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

const handleGeoSucess = position => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
};

const handleGeoError = () => {
  console.log("Can't access geoLocation");
};

const askForCoords = () => {
  navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError);
};

const loadCoords = () => {
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
};

const init5 = () => {
  loadCoords();
};
init5();
