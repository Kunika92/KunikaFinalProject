/* global document, difference, multiply, sum */
function bindCalc() {
  const numA = document.getElementById('numA');
  const numB = document.getElementById('numB');
  const operator = document.getElementById('operator');

  const calc = () => {
    const log = message => console.log(message); // eslint-disable-line no-console
    let math = sum;

    if (operator.value === 'Subtract') math = difference;
    if (operator.value === 'Multiply') math = multiply;

    log(math(numA.value, numB.value));
  };


  function calcListeners() {
    numA.addEventListener('change', calc);
    numB.addEventListener('change', calc);
    operator.addEventListener('change', calc);
  }

  calcListeners();

  // $('#numA, #numB, #operator').change(() => {
  //   const numA = $('#numA').val();
  //   const numB = $('#numB').val();
  //   const operator = $('#operator').val();

  //   const math = (operator === 'Add') ? sum : difference;
  //   log(math(numA, numB));
  // });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    bindCalc,
  };
}
