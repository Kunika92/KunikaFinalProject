function OrderedList() {
  var red = { color: 'red' };
  var twenty = { fontSize: '20pt' };

  return (
  	<ol id="demo">
      <li>This first bullet should be bold/strong</li>
      <li class={ red, twenty }>Red 20pt font with a dotted underline</li>
      <li class="blue twenty">Blue 20pt font</li>
      <li class="twenty">Normal 20pt font</li>
      <li class="twenty red">Red 20pt font with a dotted underline</li>
      <li class={ red }>Red text</li>
    </ol>
  );
}

ReactDOM.render(
	<OrderedList />,
  document.getElementById('container')
);
