import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// Отримання посилання на форму
const form = document.querySelector('.form');

// Обробник сабміту форми
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Отримання даних з форми
  const formData = new FormData(event.target);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  // Створення промісу
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Обробка промісу
  promise
    .then((delay) => {
      const message = `✅ Fulfilled promise in ${delay}ms`;
      console.log(message);
      
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        timeout: 5000,
      });
    })
    .catch((delay) => {
      const message = `❌ Rejected promise in ${delay}ms`;
      console.log(message);
      
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 5000,
      });
    });
});