import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.target;

  let firstDelay = Number(delay.value);
  const stepDelay = Number(step.value);
  const amountPromises = Number(amount.value);

  for (let position = 1; position <= amountPromises; position += 1) {
    createPromise(position, firstDelay);
    firstDelay += stepDelay;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
}