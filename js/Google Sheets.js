const scriptURL = 'https://script.google.com/macros/s/AKfycbx0x3UbIuT6nSzuRjs1mULfKXBFjrthpbpw9S8zZJ0jDAJC8OnBioFzuMr3WOz1B6uCnA/exec'

const form = document.forms['google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => alert("Danke! Deine Eingabe wurde weitergeleitet!"))
    .then(() => {window.location.reload(); })
    .catch(error => console.error('Error!', error.message))
})