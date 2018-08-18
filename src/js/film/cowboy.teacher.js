function appendActor(actor) {
  $('#actors').append(`<option>${actor.name}</option>`);
}

function success(response) {
  // response.movies[0].abridged_cast.forEach(actor => appendActor(actor));

  response.movies.forEach((movie) => {
    movie.abridged_cast.forEach(actor => appendActor(actor));
  });
}

function cowboysDropdown() {
  $.ajax({ success, url: 'cowboy.json' });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    cowboysDropdown,
  };
}
