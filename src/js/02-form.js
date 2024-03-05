"use strict";

const formEl = document.querySelector('.feedback-form');

const localStorageKey = 'feedback-form-state';

function getLocalStorageData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch (error) {
    console.error('PARSE FORM STORAGE ERROR', error);
    return {};
  }
}

function setLocalStorageData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

const initialFormData = getLocalStorageData(localStorageKey);
Array.from(formEl.elements).forEach(element => {
  element.value = initialFormData[element.name] || '';
});

const userFeedback = { email: '', message: '' };

formEl.addEventListener('input', () => {
  const data = new FormData(formEl);
  data.forEach((value, key) => {
    userFeedback[key] = value.trim();
  });
  setLocalStorageData(localStorageKey, userFeedback);
});

formEl.addEventListener('submit', e => {
  e.preventDefault();
  const login = formEl.elements.email.value.trim();
  const message = formEl.elements.message.value.trim();

  if (!login || !message) {
    alert('All form fields must be filled in');
  } else {
    console.log(userFeedback);
    localStorage.removeItem(localStorageKey);
    formEl.reset();
  }
});

