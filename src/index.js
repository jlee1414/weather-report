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

//Q: are separate increaseTemp and decreaseTemp variables needed here or can I put these under on changeTemp const?

const increaseTemp = (event) => {
  // const newTemp = document.createElement('span');
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
  state.tempCount += 1;
  changeTempColor();
};

const decreaseTemp = (event) => {
  const tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = `${state.tempCount}`;
  state.tempCount -= 1;
  changeTempColor();
};

function changeTempColor() {
  let temp = state.tempCount;
  let color = 'black';
  if (temp <= 49) {
    temp.color = 'teal';
  }
};

// wave 3, city name must update every time there is a text input

const cityInput = () => {
  let inputValue = document.getElementById('cityTemp').value;
  const city = document.getElementById('cityName');
  city.textContent = inputValue;
};

//wave 05
const skyDropDown = () => {
  document.getElementById('skyTypes').classList.toggle('show');
}

function junnieGoToSleep() { HAHAHHAHAHAHA
  console.log('zZzZ...:)')
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


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
