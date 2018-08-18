function appendCowboyDropdown(characterName, actorName) {
  $('#characters').append(`<option value="${actorName}">${characterName}</option>`);
}

function buildCowboyDropdown(response) {
  response.movies[0].abridged_cast.forEach((castMember) => {
    castMember.characters.forEach(charName => appendCowboyDropdown(charName, castMember.name));
  });
}

function selectCharacter() {
  const actorName = $(this).val();
  $('#actor').text(actorName);
}

function cowboyHomework() {
  $.ajax({
    url: 'cowboy.json',
    success: buildCowboyDropdown,
  });

  $('#characters').change(selectCharacter);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    cowboyHomework,
  };
}
