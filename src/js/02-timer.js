import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const calendar = document.getElementById('datetime-picker');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');
let deltaTime = 0;

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        const date = new Date(calendar.value);
        if (date.getTime() <= Date.now()) {
          startBtn.disabled = true;

          setTimeout(
            () => Notiflix.Notify.failure('Please select a date future'),
            20
          );
        }else startBtn.disabled = false;
    },
};

flatpickr(calendar, options);

startBtn.addEventListener('click', () => {
    const date = new Date(calendar.value);
    const timerId = setInterval(() => {
      deltaTime = date.getTime() - Date.now();
        if (deltaTime <= 0) {
          deltaTime = 0;
        clearInterval(timerId);
        startBtn.disabled = calendar.disabled = false;
        Notiflix.Notify.success('Finished!!!!');
        }
        updateTimer(deltaTime);
    }, 0);
    
    startBtn.disabled = calendar.disabled = true;
})

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer() {
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    spanDays.textContent = days;
    spanHours.textContent = hours;
    spanMinutes.textContent = minutes;
    spanSeconds.textContent = seconds;
}