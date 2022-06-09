'use strict';

/* wave 2 
--> element that displays temp
--> 2 clickable elements: 
    +1 degree on click and 
    -1 degree on click 
--> element that displays landscape
*/

const state = {
  tempCount: 0,
};

const increaseTemp = (event) => {
  // const newTemp = document.createElement('span');
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
  state.tempCount += 1;
};

const decreaseTemp = (event) => {
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
  state.tempCount -= 1;
};

// wave 3, city name must update every time there is a text input

const cityInput = () => {
  let inputValue = document.getElementById('cityTemp').value;
  const city = document.getElementById('cityName');
  city.textContent = inputValue;
};

const registerEventHandlers = (event) => {
  const cityName = document.getElementById('cityTemp');
  cityName.addEventListener('change', cityInput);

  // increase temp event handler
  const increaseTempButton = document.querySelector('#increaseTempButton');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.querySelector('#decreaseTempButton');
  decreaseTempButton.addEventListener('click', decreaseTemp);

};

if (document.readyState !== 'loading') {
  registerEventHandlers();
} else {
  document.addEventListener('DOMContentLoaded', registerEventHandlers);
}
