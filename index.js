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
    const digitDivs = document.querySelectorAll(querySelector);
    digitDivs.forEach(digitDiv => {
      digitDiv.innerHTML = val;
    });
  }

  // set current time on appropriate divs
  setDigit(".hours .current.digit .front div", time.hoursString);
  setDigit(".minutes .current.digit .front div", time.minutesString);

  // set next minute on appropriate divs
  time.increment();
  setDigit(".hours .current.digit .back div", time.hoursString);
  setDigit(".minutes .current.digit .back div", time.minutesString);
  setDigit(".hours .next.digit .front div", time.hoursString);
  setDigit(".minutes .next.digit .front div", time.minutesString);

  //set time in two minutes on appropriate divs
  time.increment();
  setDigit(".hours .next.digit .back div", time.hoursString);
  setDigit(".minutes .next.digit .back div", time.minutesString);
}

function flipClock(time) {
  //flip digit over
  const upperDigit = document.querySelector(".minutes .current.digit .upper");
  upperDigit.className += " flipped";

  setTimeout(() => {
    //delete unnecessary old card
    const oldDigit = document.querySelector(".minutes .current.digit");
    oldDigit.parentNode.removeChild(oldDigit);

    // re-class existing card
    const curDigit = document.querySelector(".minutes .next.digit");
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
          <div>
            ${nextTime.minutesString}
          </div>
        </figure>
        <figure class="back">
          <div>
            ${nextNextTime.minutesString}
          </div>
        </figure>
        </figure>
        <figure class="lower">
          <figure class="front">
            <div>
              ${nextTime.minutesString}
            </div>
          </figure>
          <figure class="back">
            <div>
              ${nextNextTime.minutesString}
            </div>
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
  flipClock(time.copy());
  setTimeout(updateTimeEveryMinute, 60000);
}

setTimeout(updateTimeEveryMinute, msToMinuteChange);
