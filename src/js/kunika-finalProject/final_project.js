/* global fetch document alert window jQuery XMLHttpRequest FileReader */
/* eslint quote-props: ["error", "as-needed"] */
/* eslint object-shorthand: [2, "consistent-as-needed"] */
/* eslint-env es6 */

function toggleSpinner() {
  $('#spinner').toggleClass('hide');
}

function processImage(imgUrl, id) {
  const subscriptionKey = 'e3642d97f2754c9eb5f16dbcd082d943';
  const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze';

  // Request parameters.
  const params = {
    visualFeatures: 'Categories,Tags',
    details: '',
    language: 'en',
  };

  // Display the image.
  const sourceImageUrl = imgUrl;
  toggleSpinner();
  // Make the REST API call.
  $.ajax({
    url: `${uriBase}?${$.param(params)}`,

    // Request headers.
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader('Content-Type', 'application/json');
      xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKey);
    },

    type: 'POST',

    // Request body.
    data: `{'url': '${sourceImageUrl}'}`,
  })

    .done((data) => {

    // Show formatted JSON on webpage.
      const dataArr = [];
      for (let index = 0; index < 3; index += 1) {
        if (data.tags[index] !== undefined) {
          dataArr.push(`#${data.tags[index].name}`);
        }
      }
      $(`#imageDiv${id}`).find('textarea').val(jQuery.parseJSON(JSON.stringify(dataArr, null, 4)));
    })

    .fail((jqXHR, textStatus, errorThrown) => {
    // Display error message.
      let errorString = (errorThrown === '') ? 'Error. ' :
        `${errorThrown}(${jqXHR.status}):`;
      errorString += (jqXHR.responseText === '') ? '' :
        jQuery.parseJSON(jqXHR.responseText).message;
      alert(errorString);
    });
}

function generateThumbnail(imgUrl, id) {
  const subscriptionKey = 'e3642d97f2754c9eb5f16dbcd082d943';
  const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/generateThumbnail';

  // Request parameters.
  const params = '?width=150&height=200&smartCropping=true';

  // Display the source image.
  const sourceImageUrl = imgUrl;

  // Create the HTTP Request object.
  const xhr = new XMLHttpRequest();

  toggleSpinner();
  // Identify the request as a POST, with the URL and parameters.
  xhr.open('POST', uriBase + params);

  // Add the request headers.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKey);

  // Set the response type to 'blob' for the thumbnail image data.
  xhr.responseType = 'blob';

  // Process the result of the REST API call.
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // Thumbnail successfully created.
      if (xhr.status === 200) {
        // Show thumbnail image.
        // console.log(response);
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(this.response);
        // console.log(imageUrl);
        document.querySelector(`#thumbnailImage${id}`).src = imageUrl;
      } else {
        const reader = new FileReader();
        // Start reading the blob as text.
        reader.readAsText(xhr.response);
      }
    }
  };

  // Make the REST API call.
  xhr.send(`{'url': '${sourceImageUrl}'}`);
}

async function getImages(fields) {
  const response = await fetch(`/api/finalProject?lat=${fields.lat}&lon=${fields.log}`);
  const payload = await response.json();

  const html = [];

  for (let i = 0; i < 10; i += 1) {
    const element = payload.paths[i];
    html.push(`<div id='imageDiv${i}' class='col-sm-12 col-md-3'>
      <img id='thumbnailImage${i}' />
      <textarea ></textarea>
    </div>`);
    toggleSpinner();
    setTimeout(generateThumbnail(element, i), 5000);
    toggleSpinner();
    setTimeout(processImage(element, i), 4000);
  }
  $('#gallery >div').remove();
  toggleSpinner();
  $('#gallery').append(html.join(''));
}

// Serialize HTML Form to JSON
function toJSON(form) {
  const obj = {};
  const elements = form.querySelectorAll('input, select, textarea');
  elements.forEach((element) => {
    const { id, name, value } = element;

    if (name || id) {
      obj[name || id] = value;
    }
  });

  return obj;
}

function getFlickrPublicImages() {
  $('#location_form').on('submit', (event) => {
    $('.project').css({ display: 'none' });
    const fields = toJSON(document.getElementsByTagName('form')[0]);
    console.log(fields);
    if (fields.lat !== '' && fields.lon !== '') {
      toggleSpinner();
      getImages(fields);
    } else {
      alert('Please enter coordinates!');
    }
    event.preventDefault(); // cancel form action
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getFlickrPublicImages,
    getImages,
  };
}
