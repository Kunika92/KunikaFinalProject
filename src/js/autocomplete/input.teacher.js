/* global document */

let autocompletePosition = 0;
const keys = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

function hightlightSuggestion(direction) {
  if (direction === 'down') {
    autocompletePosition += 1;
  } else if (direction === 'up') {
    autocompletePosition -= 1;
  }

  $('#country_suggestions .hightlight').removeClass('hightlight');
  const hightlightValue = $(`#country_suggestions li:nth-child(${autocompletePosition})`)
    .addClass('hightlight')
    .text();

  $('#country_keywords').val(hightlightValue);
}

function listenForArrows() {
  $(document).keydown((event) => {
    switch (event.which) {
      case keys.up:
        hightlightSuggestion('up');
        break;

      case keys.down:
        hightlightSuggestion('down');
        break;

      default: return; // exit this handler for other keys
    }

    event.preventDefault(); // prevent the default action (scroll / move caret)
  });
}

function toggleSpinner() {
  $('#spinner').toggleClass('hide');
}

function displayCountries(output) {
  toggleSpinner();
  $('#country_suggestions').html(output).addClass('expanded');
}

function formatCountries(countries) {
  // const html = [];
  // $.each(countries, (index, country) => {
  //   html.push(`<li>${country}</li>`);
  // });

  // ES6 advanced code
  const html = countries.map(country => `<li>${country}</li>`);

  displayCountries(html.join(''));
}

function queryService(keyword) {
  toggleSpinner();
  autocompletePosition = 0; // reset the keyboard position
  $.ajax({
    url: '/api/autocomplete',
    data: { keyword },
    success: (response) => {
      formatCountries(response.items);
    },
  });
}

function listenToInput() {
  $('#country_keywords').keyup((event) => {
    if (event.which === keys.up || event.which === keys.down) {
      return;
    }

    const keyword = $(event.target).val();
    queryService(keyword);
  });
}

function autocomplete() {
  listenToInput();
  listenForArrows();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    autocomplete,
  };
}
