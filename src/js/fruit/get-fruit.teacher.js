/* global document */
function appendFruit(fruitName, colour) {
  $('#fruits')
    .append(`<li style="background-color: ${colour}">${fruitName}</li>`);
}

function parseFruitResponse(response) {
  Object.keys(response).forEach((fruitName) => {
    appendFruit(fruitName, response[fruitName]);
  });
}

function hideSpinner() {
  // $('#fruits li:first').hide();
  // $('#fruits li').first().hide();
  // $('#fruits li:nth-child(0)').hide();
  // $('#fruits li:first-child').hide();
  // $('#fruits li:first-child').attr('style', 'display: none');
  // $('#fruits li:first-child').css('display', 'none');
  // document.getElementById('fruits').children[0].style.display = 'none'
  document.querySelector('#fruits li').style.display = 'none';
}

function getFruitData() {
  $.ajax({
    url: '/api/slow-fruit',
    dataType: 'json',
    success: (response) => {
      hideSpinner();
      parseFruitResponse(response);
    },
    // success: parseFruitResponse,
  });
}

function fruitWithSpinner() {
  getFruitData();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    fruitWithSpinner,
  };
}
