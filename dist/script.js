const MILLISECOND = 1000;
const SECOND = MILLISECOND * 60;
const MINUTE = SECOND * 60;
const DAY = MINUTE * 24;
const YEAR = DAY * 365;

document.getElementById("seconds").onchange = function() {myFunction();};

function myFunction() {
  console.log('hello');
}

let getTimerBin = (distance) => {
  let y2038 = Math.pow(2, 31) - 1;
  let now = Math.floor(y2038 - (distance/MILLISECOND));
  return now.toString(2).padStart(32, '0');
}

let getCalendarTimer = (distance) => {
  // Time calculations for years, days, hours, minutes and seconds
  let years = Math.floor(distance / (YEAR));
  let days = Math.floor((distance % (YEAR)) / (DAY));
  let hours = Math.floor((distance % (DAY)) / (MINUTE)).toString().padStart(2, '0');
  let minutes = Math.floor((distance % (MINUTE)) / (SECOND)).toString().padStart(2, '0');
  let seconds = Math.floor((distance % (SECOND)) / MILLISECOND).toString().padStart(2, '0');
  
  
  // return `${years}y ${days}d ${hours}h ${minutes}m ${seconds}s`;
  return {years, days, hours, minutes, seconds};
}

let updateCalendarTimer = (distance) => {
  let timer = getCalendarTimer(distance)
  document.getElementById("years").innerHTML = `${timer.years}y `;
  document.getElementById("days").innerHTML = `${timer.days}d `;
  document.getElementById("hours").innerHTML = `${timer.hours}h `;
  document.getElementById("minutes").innerHTML = `${timer.minutes}m `;
  document.getElementById("seconds").innerHTML = `${timer.seconds}s `;
}

let updateDOM = (distance) => {
  updateCalendarTimer(distance);
  document.getElementById("timer-bin").innerHTML = getTimerBin(distance);
}

let updater = (countDownDate) => () => {
  // Find the distance between now and the count down date
  let distance = countDownDate - new Date().getTime();
  
  updateDOM(distance);
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer-calendar").innerHTML = "EXPIRED";
  }
}

let startCountdown = (countDownDate) => {
  let updateCountdown = updater(countDownDate);
  
  updateCountdown();
  let x = setInterval(updateCountdown, 1000);
}

// Set the date we're counting down to
let countDownDate = new Date("Jan 18, 2038 16:14:00"); // GMT-08 of y2038

startCountdown(countDownDate);