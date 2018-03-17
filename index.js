const time = new Date();

let ampm = 'am';

let hours = time.getHours();
if (hours >= 12) {
  ampm = 'pm'
}

if (hours === 0) {
  hours = 12;
} else if (hours > 12) {
  hours -= 12;
}

const minutes = time.getMinutes();
const minutesString = minutes.toString();
if (minutesString.length === 1) {
  minutesString = '0' + minutesString;
}

const [hoursContainer, minutesContainer] = document.getElementsByClassName('digit');

console.log('hours', hoursContainer)

hoursContainer.innerHTML = hours;
minutesContainer.innerHTML = minutesString;
