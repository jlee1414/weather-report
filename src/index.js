'use strict';

/* wave 2 
--> element that displays temp
--> 2 clickable elements: 
    +1 degree on click and 
    -1 degree on click 
--> element that displays landscape
*/
const increaseTemp = () => {
  state.tempCount +=1;
};

const decreaseTemp = () => {};

// wave 3, city name must update every time there is a text input

const getCityInput = () => {
  let inputValue = document.getElementById('cityTemp').value;
  const city = document.getElementById('cityName');
  city.textContent = inputValue;
};
const registerEventHandlers = () => {
  const cityName = document.getElementById('cityTemp');
  cityName.addEventListener('change', getValueInput);
}

if (document.readyState !== 'loading') {
  registerEventHandlers();
} else {
  document.addEventListener('DOMContentLoaded', registerEventHandlers);
}
