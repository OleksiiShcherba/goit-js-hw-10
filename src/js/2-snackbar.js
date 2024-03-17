import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form_element = document.querySelector('form');

form_element.addEventListener('submit', event => {
  event.preventDefault();

  let delay = 0;
  let state_value = 'fulfilled';

  for (let form_element of event.target.elements) {
    if (form_element.name == 'delay') {
      delay = form_element.value;
    }

    if (form_element.name == 'state' && form_element.checked) {
      state_value = form_element.value;
    }
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state_value == 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${value}ms`,
        position: 'topRight',
        icon: null,
      });
    })
    .catch(value => {
      iziToast.error({
        message: `❌ Rejected promise in ${value}ms`,
        position: 'topRight',
        icon: null,
      });
    });
});
