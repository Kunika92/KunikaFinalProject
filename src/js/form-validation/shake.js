/* global document */
function validateForm() {
  document.querySelector('#contact-form input[type=submit]').addEventListener('click', () => {
    $('input:invalid').effect('shake', { distance: 5, times: 2 });
  });

  // $('#contact-form').submit(
  document.querySelector('#contact-form').addEventListener('submit', (event) => {
    const isFormValid = document.querySelector('#contact-form').checkValidity();

    if (!isFormValid) {
      event.preventDefault();
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    validateForm,
  };
}
