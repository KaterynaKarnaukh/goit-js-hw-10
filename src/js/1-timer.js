import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Отримання посилань на елементи
const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// Змінна для збереження обраної дати користувачем
let userSelectedDate = null;
let timerId = null;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenDate = selectedDates[0];
    
    // Перевірка чи обрана дата в майбутньому
    if (chosenDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight'
      });
      startButton.disabled = true;
      userSelectedDate = null;
    } else {
      userSelectedDate = chosenDate;
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

// Функція для додавання нуля
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція для конвертації мілісекунд в дні, години, хвилини та секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);
 
  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція оновлення таймера
function updateTimer() {
  const currentTime = new Date();
  const timeDifference = userSelectedDate - currentTime;

  // Якщо час вийшов
  if (timeDifference <= 0) {
    clearInterval(timerId);
    daysValue.textContent = '00';
    hoursValue.textContent = '00';
    minutesValue.textContent = '00';
    secondsValue.textContent = '00';
    dateTimePicker.disabled = false;
    return;
  }

  // Оновлення значень
  const time = convertMs(timeDifference);
  daysValue.textContent = addLeadingZero(time.days);
  hoursValue.textContent = addLeadingZero(time.hours);
  minutesValue.textContent = addLeadingZero(time.minutes);
  secondsValue.textContent = addLeadingZero(time.seconds);
}

startButton.addEventListener('click', () => {
  if (!userSelectedDate) return;

  // Вимкнути кнопку та поле вводу під час роботи таймера
  startButton.disabled = true;
  dateTimePicker.disabled = true;

  updateTimer();
  timerId = setInterval(updateTimer, 1000);
});