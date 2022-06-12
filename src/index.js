// 'use strict';
import 'regenerator-runtime/runtime';
import axios from 'axios';

const state = {
  tempCount: 60,
  cityName: 'Seattle',
  latitude: 0,
  longitude: 0,
};

function convertTempKtoF(tempInK) {
  return Math.round(1.8 * (tempInK - 273) + 32);
}

const getCityCoordinates = () => {
  axios
    .get('https://fast-dawn-95769.herokuapp.com/location', {
      params: {
        q: state.cityName,
      },
    })
    .then((response) => {
      state.latitude = response.data[0].lat;
      state.longitude = response.data[0].lon;
      console.log('Success: ', response.data);

      const getCityTemp = () => {
        axios
          .get('https://fast-dawn-95769.herokuapp.com/weather', {
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
            console.log('Error: ', error.response);
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
  if (state.tempCount <= 32) {
    temperature.style.color = '#4f0e99';
  } else if (state.tempCount >= 33 && state.tempCount < 45) {
    temperature.style.color = '#0e2c99';
  } else if (state.tempCount >= 46 && state.tempCount < 55) {
    temperature.style.color = '#0e8299';
  } else if (state.tempCount >= 56 && state.tempCount < 65) {
    temperature.style.color = '#4a7d04';
  } else if (state.tempCount >= 66 && state.tempCount < 75) {
    temperature.style.color = '#c46410';
  } else if (state.tempCount >= 75) {
    temperature.style.color = '#c42510';
  }
}

function populateLandscape() {
  const landscape = document.getElementById('landscape');
  if (state.tempCount <= 32) {
    landscape.textContent = '❄️ 🌲 ⛄️ 🌲⛄️ ❄️ 🌲 ❄️ 🌲 ⛄️ ❄️ 🌲';
  } else if (state.tempCount >= 33 && state.tempCount < 45) {
    landscape.textContent = '🌲 🌲 🌲 🍂 🌲 🍁 🌲 🌲 🍂 🌲';
  } else if (state.tempCount >= 56 && state.tempCount < 65) {
    landscape.textContent = '🌾 🌿  🌾 🌳 🌾 🍃 🌾 🌳 🌾 🍃';
  } else if (state.tempCount >= 66 && state.tempCount < 75) {
    landscape.textContent = '🌸 🌿 🌼 🌴 🌷 🌻 🌿 ☘️ 🌱 🌻 🌷';
  } else if (state.tempCount >= 75) {
    landscape.textContent = '🌵 🐍 ♨️ 🌵 🔥 🌵 🐍 🏜 ♨️';
  }
}

const cityInput = () => {
  let inputValue = document.getElementById('userInputCity').value;
  let city = document.getElementById('cityName');
  city.textContent = inputValue;
  state.cityName = inputValue;
};

function resetCityInput() {
  let city = document.getElementById('cityName');
  let inputContainer = document.getElementById('userInputCity');
  inputContainer.value = '';
  city.textContent = '';
}

function populateSky() {
  const skyContainer = document.getElementById('changeTheSky');
  const sky = document.getElementById('sky');
  switch (skyContainer.value) {
    case 'sunny':
      sky.textContent = '😎 😎 😎 😎 ☀️ 😎 😎 😎 😎';
      break;
    case 'cloudy':
      sky.textContent = '☁️ ☁️  ☁️☁️ ☁️ 🌤 ☁️ ☁️ ☁️☁️☁️';
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

const registerEventHandlers = () => {
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
