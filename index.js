class Time {
  constructor(date = new Date()) {
    this.hours = date.getHours();
    if (this.hours === 0) {
      this.hours = 12;
    } else if (this.hours > 12) {
      this.hours -= 12;
    }
    this.minutes = date.getMinutes();
  }

  get hoursString() {
    return this.hours.toString();
  }

  get minutesString() {
    let minutesString = this.minutes.toString();
    if (minutesString.length === 1) {
      minutesString = "0" + minutesString;
    }
    return minutesString;
  }

  copy() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  increment() {
    this.minutes++;
    if (this.minutes === 60) {
      this.minutes = 0;
      this.hours++;
      if (this.hours === 13) {
        this.hours = 1;
      }
    }
    return this;
  }
}

function setInitialTime(time) {
  function setDigit(querySelector, val) {
    const digitFigures = document.querySelectorAll(querySelector);
    digitFigures.forEach(digitFigure => {
      digitFigure.innerHTML = val;
    });
  }

  // set current time on appropriate figures
  setDigit(".hours .current.digit .front figure", time.hoursString);
  setDigit(".minutes .current.digit .front figure", time.minutesString);

  // set next minute on appropriate figures
  time.increment();
  setDigit(".hours .current.digit .back figure", time.hoursString);
  setDigit(".minutes .current.digit .back figure", time.minutesString);
  setDigit(".hours .next.digit .front figure", time.hoursString);
  setDigit(".minutes .next.digit .front figure", time.minutesString);

  //set time in two minutes on appropriate figures
  time.increment();
  setDigit(".hours .next.digit .back figure", time.hoursString);
  setDigit(".minutes .next.digit .back figure", time.minutesString);
}

function flipClock(time, containerDivClass, timeGetter) {
  //flip digit over
  const upperDigit = document.querySelector(
    `${containerDivClass} .current.digit .upper`
  );
  upperDigit.className += " flipped";
  console.log(time.minutesString);

  //if we're at the hour mark we also have to flip the hour digit
  if (containerDivClass !== ".hours" && time.minutesString === "00") {
    flipClock(time.copy(), ".hours", "hoursString");
  }

  setTimeout(() => {
    //delete unnecessary old card
    const oldDigit = document.querySelector(
      `${containerDivClass} .current.digit`
    );
    oldDigit.parentNode.removeChild(oldDigit);

    // re-class existing card
    const curDigit = document.querySelector(`${containerDivClass} .next.digit`);
    curDigit.className = "current digit";

    // create next card
    const nextDigit = document.createElement("figure");
    nextDigit.className = "next digit";
    curDigit.parentNode.insertBefore(nextDigit, curDigit);

    // fill nextDigit HTML

    const nextTime = time.copy().increment();
    const nextNextTime = nextTime.copy().increment();

    nextDigit.innerHTML = `
      <figure class="upper">
        <figure class="front">
          <figure>
            ${nextTime[timeGetter]}
          </figure>
        </figure>
        <figure class="back">
          <figure>
            ${nextNextTime[timeGetter]}
          </figure>
        </figure>
        </figure>
        <figure class="lower">
          <figure class="front">
            <figure>
              ${nextTime[timeGetter]}
            </figure>
          </figure>
          <figure class="back">
            <figure>
              ${nextNextTime[timeGetter]}
            </figure>
          </figure>
        </figure>
    `;
  }, 2000);
}

const time = new Time();
setInitialTime(time.copy());

const jsDate = new Date();
const msToMinuteChange =
  60000 - (jsDate.getSeconds() * 1000 + jsDate.getMilliseconds());

function updateTimeEveryMinute() {
  time.increment();
  flipClock(time.copy(), ".minutes", "minutesString");
  setTimeout(updateTimeEveryMinute, 60000);
}

setTimeout(updateTimeEveryMinute, msToMinuteChange);
