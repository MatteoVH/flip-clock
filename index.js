function updateTime() {
  const time = new Date();

  let ampm = "am";

  let hours = time.getHours();
  if (hours >= 12) {
    ampm = "pm";
  }

  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }

  const minutes = time.getMinutes();
  let minutesString = minutes.toString();
  if (minutesString.length === 1) {
    minutesString = "0" + minutesString;
  }

  const [hoursContainer, minutesContainer] = document.getElementsByClassName(
    "digit"
  );

  hoursContainer.innerHTML = hours;
  minutesContainer.innerHTML = minutesString;
}

updateTime();

const timeToMinuteChange =
  60000 - (new Date().getSeconds() * 1000 + new Date().getMilliseconds());

function updateTimeEveryMinute() {
  updateTime();
  setTimeout(updateTimeEveryMinute, 60000);
}

setTimeout(updateTimeEveryMinute, timeToMinuteChange);
