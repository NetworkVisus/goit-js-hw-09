import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelector('[name = delay]'),
  step: document.querySelector('[name = step]'),
  amount: document.querySelector('[name = amount]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', handleCreation);

function handleCreation(event) {
  event.preventDefault();
  const amountToNumber = Number(refs.amount.value);
  const delayToNumber = Number(refs.delay.value);
  const stepToNumber = Number(refs.step.value);
  if (amountToNumber <= 0 || stepToNumber < 0 || delayToNumber < 0) {
    Notiflix.Notify.failure('Please, check inserted data again!');
    return;
  }
  let delayCounter = delayToNumber;

  for (let i = 1; i <= amountToNumber; i += 1) {
    createPromise(i, delayCounter)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayCounter += stepToNumber;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          position,
          delay,
        });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
