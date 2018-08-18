/* global document, utils */

function calculateTax(data) {
  let taxTotal = data.taxes[0].tax;
  if (data.taxes.length === 2) {
    taxTotal += data.taxes[1].tax;
  }

  return taxTotal.toFixed(2); // fix decical to cents
}

// function displayProvinces(salesTaxData) {
//   const provincesDropdown = $('#provinces');

//   $.each(salesTaxData.provinces, (provinceAbbr, provinceData) => {
//     const tax = calculateTax(provinceData);
//     provincesDropdown.append(`<option value="${tax}">${provinceData.name}</option>`);
//   });
// }

function displayProvinces(salesTaxData) {
  const provincesDropdown = document.querySelector('#provinces');

  const html = Object.values(salesTaxData.provinces)
    .map((item) => {
      const tax = calculateTax(item);
      return `<option value="${tax}">${item.name}</option>`;
    });

  $(provincesDropdown).append(html);
}

function outputTotalPrice(price) {
  const priceGrouped = price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  const currency = `$${priceGrouped}`;

  $('#pizzaCost').text(currency);
}

function calculateTotalPrice(salesValue, pizzaValue) {
  const salesTax = 1 + Number(salesValue); // parseInt 10
  const pizzaPrice = Number(pizzaValue);
  outputTotalPrice(salesTax * pizzaPrice);
}

function updatePrice() {
  calculateTotalPrice($('#provinces').val(), $('#price').val());
}

function getSalesData() {
  $.ajax({
    url: 'rates.json',
    success: (response) => {
      displayProvinces(response);
    },
    error: (jqXHR, textStatus, errorMessage) => {
      utils.print(`AJAX error (${errorMessage})`);
    },
  });
}

function pizzaSales() {
  getSalesData();
  $('#price,#provinces').change(updatePrice);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
