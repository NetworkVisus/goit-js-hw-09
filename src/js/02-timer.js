import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysCnt: document.querySelector('[data-days]'),
  hoursCnt: document.querySelector('[data-hours]'),
  minutesCnt: document.querySelector('[data-minutes]'),
  secondsCnt: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate.getTime() >= selectedDates[0].getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
  },
};

const flatpickrInstance = flatpickr(refs.datePicker, options);
refs.startBtn.addEventListener('click', handleStart);

function handleStart(event) {
  let diffData =
    flatpickrInstance.selectedDates[0].getTime() -
    options.defaultDate.getTime();
  const initialDiffData = convertMs(diffData);
  assingCounter(initialDiffData);
  const counterID = setInterval(() => {
    if (diffData - 1000 <= 0) {
      clearInterval(counterID);
      return;
    }
    diffData -= 1000;
    const convertedDiffData = convertMs(diffData);
    assingCounter(convertedDiffData);
  }, 1000);
}

function assingCounter(dataObj) {
  refs.daysCnt.textContent = addLeadingZero(dataObj.days);
  refs.hoursCnt.textContent = addLeadingZero(dataObj.hours);
  refs.minutesCnt.textContent = addLeadingZero(dataObj.minutes);
  refs.secondsCnt.textContent = addLeadingZero(dataObj.seconds);
}

function addLeadingZero(str) {
  return str.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
