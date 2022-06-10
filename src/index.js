'use strict';

const state = {
  tempCount: 0,
  cityName: '',
  latitude: 0,
  longitude: 0,
};

function convertTempKtoF(tempInK) {
  return Math.round(1.8 * (tempInK - 273) + 32);
}

const getCityCoordinates = () => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.cityName,
      },
    })
    .then((response) => {
      state.latitude = response.data[0].lat;
      state.longitude = response.data[0].lon;
      console.log('Success: ', response.data);

      // call the weather API here
      const getCityTemp = () => {
        axios
          .get('http://127.0.0.1:5000/weather', {
            params: {
              lat: state.latitude,
              lon: state.longitude,
            },
          })
          .then((response) => {
            console.log(response.data.current.temp);
            state.tempCount = convertTempKtoF(response.data.current.temp);
            changeTempColor();
            populateLandscape();
          })
          .catch((error) => {
            console.log('Error: ', error);
          });
      };

      getCityTemp();
    })
    .catch((error) => {
      console.log('Error: ', error.response);
    });
};

const increaseTemp = (event) => {
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
  state.tempCount += 1;
  changeTempColor();
  populateLandscape();
};

const decreaseTemp = (event) => {
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
  state.tempCount -= 1;
  changeTempColor();
  populateLandscape();
};

function changeTempColor() {
  const temperature = document.getElementById('tempCount');
  temperature.textContent = `${state.tempCount}`;
  if (state.tempCount < 50) {
    temperature.style.color = 'purple';
  } else if (state.tempCount > 49 && state.tempCount < 60) {
    temperature.style.color = 'blue';
  } else if (state.tempCount > 59 && state.tempCount < 70) {
    temperature.style.color = 'green';
  } else if (state.tempCount > 69 && state.tempCount < 80) {
    temperature.style.color = 'orange';
  } else if (state.tempCount > 79) {
    temperature.style.color = 'red';
  }
}

function populateLandscape() {
  const landscape = document.getElementById('landscape');
  if (state.tempCount < 49) {
    landscape.textContent = '❄️🌲⛄️🌲⛄️❄️🌲❄️🌲🌲⛄️❄️🌲🌲';
  } else if (state.tempCount >= 50 && state.tempCount < 60) {
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.tempCount >= 60 && state.tempCount < 70) {
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.tempCount >= 70 && state.tempCount < 80) {
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.tempCount >= 80) {
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
}

// wave 3, city name must update every time there is a text input

const cityInput = () => {
  let inputValue = document.getElementById('userInputCity').value;
  let city = document.getElementById('cityName');
  city.textContent = inputValue;
  state.cityName = inputValue;
};

function resetCityInput() {
  let city = document.getElementById('cityName');
  let inputContainer = document.getElementById('userInputCity')
  inputContainer.value = ''
  city.textContent = '';
}

// // //wave 05
function populateSky() {
  const skyContainer = document.getElementById('changeTheSky');
  const sky = document.getElementById('sky');
  switch (skyContainer.value) {
    case 'sunny':
      sky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️ ☁️ ';
      break;
    case 'cloudy':
      sky.textContent = '☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
      break;
    case 'rainy':
      sky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
      break;
    case 'snowy':
      sky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
      break;
    case 'catsanddogs':
      sky.textContent = '🌨🐶🐱🐶🐱🐶🐱🐶🐱🐶🐱🐶🌨';
      break;
  }
}

const registerEventHandlers = (event) => {
  changeTempColor();
  populateLandscape();
  populateSky();

  const cityName = document.getElementById('userInputCity');
  cityName.addEventListener('change', cityInput);

  const clearCityName = document.getElementById('clearButton');
  clearCityName.addEventListener('click', resetCityInput);

  const getRealTempButton = document.querySelector('#getRealTempButton');
  getRealTempButton.addEventListener('click', getCityCoordinates);

  const increaseTempButton = document.querySelector('#increaseTempButton');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.querySelector('#decreaseTempButton');
  decreaseTempButton.addEventListener('click', decreaseTemp);

  const selectTheSky = document.querySelector('#changeTheSky');
  selectTheSky.addEventListener('change', populateSky);
};

if (document.readyState !== 'loading') {
  registerEventHandlers();
} else {
  document.addEventListener('DOMContentLoaded', registerEventHandlers);
}
