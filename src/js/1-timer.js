import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

let selected_date = new Date();
let interval_id = null;

const days_element = document.querySelector('span[data-days]');
const hours_element = document.querySelector('span[data-hours]');
const minutes_element = document.querySelector('span[data-minutes]');
const seconds_element = document.querySelector('span[data-seconds]');
const start_batton = document.querySelector('button[data-start]');
const input_element = document.querySelector('#datetime-picker');

const on_close_action = selectedDates => {
  const selected_date_for_check = selectedDates[0];

  if (selected_date_for_check.getTime() < Date.now()) {
    iziToast.error({
      message: 'Please choose a date in the future',
      position: 'topRight',
      color: '#ef4040',
    });

    start_batton.disabled = true;
  } else {
    start_batton.disabled = false;
  }

  selected_date = selected_date_for_check;
};

const on_start_action = event => {
  input_element.disabled = true;
  start_batton.disabled = true;

  if (selected_date.getTime() < Date.now()) {
    iziToast.error({
      message: 'Please choose a date in the future',
      position: 'topRight',
      color: '#ef4040',
    });
  } else {
    interval_id = setInterval(() => {
      const seconds_left = selected_date.getTime() - Date.now();

      if (seconds_left <= 0) {
        clearInterval(interval_id);
        input_element.disabled = false;
        start_batton.disabled = false;
      } else {
        const { days, hours, minutes, seconds } = convertMs(seconds_left);

        days_element.textContent = addLeadingZero(days);
        hours_element.textContent = addLeadingZero(hours);
        minutes_element.textContent = addLeadingZero(minutes);
        seconds_element.textContent = addLeadingZero(seconds);
      }
    }, 1000);
  }
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: on_close_action,
};

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(input_element, options);

start_batton.addEventListener('click', on_start_action);
