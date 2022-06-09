'use strict';

/* wave 2 
* to do *
--> element that displays landscape

* question parking lot *
--> are separate increaseTemp and decreaseTemp variables needed or can I put these under one changeTemp const?

--> pros/cons of using queryselector vs getelementbyid?

--> why do the increase/decrease temp buttons have borders?
*/

const state = {
  tempCount: 0,
};

const increaseTemp = (event) => {
  // const newTemp = document.createElement('span');
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
  const temperature = document.querySelector('#tempCount');
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
};

//wave 05
const skyDropDown = () => {
  document.getElementById('skyTypes').classList.toggle('show');
};

function junnieGoToSleep() {
  HAHAHHAHAHAHA;
  console.log('zZzZ...:)');
}

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
  const cityName = document.getElementById('cityTemp');
  cityName.addEventListener('change', cityInput);

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
