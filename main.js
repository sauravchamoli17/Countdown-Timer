let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const start = document.querySelector('.alert_start');
const end = document.querySelector('.alert_end');

function timer(seconds) {
  clearInterval(countdown);
  start.currentTime = 0;
  start.play();
  const now = Date.now(); //Present Time in milliseconds
  const then = (now + seconds * 1000); //Add time to present time
  displayTimeLeft(seconds);
  displayEndTime(then);  
  //Call Function Every Second and Calculate Remaining Seconds
  countdown = setInterval(() => {
  const secondsLeft = Math.round((then - Date.now()) / 1000);
  if (secondsLeft === 0) {
    end.currentTime = 0;
    end.play();
  }  
  if (secondsLeft < 0) {
    clearInterval(countdown);
    return; 
  }
   displayTimeLeft(secondsLeft);    
  }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = (seconds % 60);
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
   const end = new Date(timestamp);    
   const hour = end.getHours();
   const adjustedHour = (hour > 12 ? hour - 12 : hour);  
   const minutes = end.getMinutes();
   endTime.textContent = `Be Back At: ${adjustedHour}:${minutes < 10 ? '0':''}${minutes}`; 
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  if (isNaN(mins)) {
    endTime.textContent = 'Enter Valid Minutes Value.';
    this.reset();
  }
  else {
    timer(mins * 60);
    this.reset();  
  }
});