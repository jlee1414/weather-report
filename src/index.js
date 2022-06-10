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
  if (state.tempCount < 50) {
    landscape.textContent = '❄️🌲⛄️🌲⛄️❄️🌲❄️🌲🌲⛄️❄️🌲🌲';
  } else if (state.tempCount > 49 && state.tempCount < 60) {
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.tempCount > 59 && state.tempCount < 70) {
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.tempCount > 69 && state.tempCount < 80) {
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.tempCount > 79) {
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
}

// wave 3, city name must update every time there is a text input

const cityInput = () => {
  let inputValue = document.getElementById('cityTemp').value;
  const city = document.getElementById('cityName');
  city.textContent = inputValue;
  state.cityName = inputValue;
};

//wave 05
const skyDropDown = () => {
  document.getElementById('skyTypes').classList.toggle('show');
};

// function junnieGoToSleep() {
//   HAHAHHAHAHAHA;
//   console.log('zZzZ...:)');
// }

window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

const registerEventHandlers = (event) => {
  changeTempColor();
  populateLandscape();

  const cityName = document.getElementById('cityTemp');
  cityName.addEventListener('change', cityInput);

  const getRealTempButton = document.querySelector('#getRealTempButton');
  getRealTempButton.addEventListener('click', getCityCoordinates);

  const increaseTempButton = document.querySelector('#increaseTempButton');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.querySelector('#decreaseTempButton');
  decreaseTempButton.addEventListener('click', decreaseTemp);

  //const skyDropDown = document.getElementById('skyTypes');
};

if (document.readyState !== 'loading') {
  registerEventHandlers();
} else {
  document.addEventListener('DOMContentLoaded', registerEventHandlers);
}
