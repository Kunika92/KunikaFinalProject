/* global document, google */
function initMap() {
  const createMap = options => new google.maps.Map(document.getElementById('map'), options);

  const varArts = { lat: 49.282873, lng: -123.115368, title: 'VanArts' };

  const map = createMap({ center: varArts, zoom: 20 });

  const createMarker = location => new google.maps.Marker({
    position: location,
    map,
    title: location.title,
  });

  const addBubble = (pin) => {
    const infobubble = new google.maps.InfoWindow({
      content: '<img src="https://pbs.twimg.com/profile_images/987068971168837632/r1a2mDq0_400x400.jpg">',
    });

    pin.addListener('click', () => infobubble.open(map, pin));
  };

  const marker = createMarker(varArts);

  addBubble(marker);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    initMap,
  };
}
