function Hello() {
	var css = { color: 'green' };
  return <div style={css}>Hello from React.js</div>;
}

ReactDOM.render(
  <Hello />,
  document.getElementById('container')
);
