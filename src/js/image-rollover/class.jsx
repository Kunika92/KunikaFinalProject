class ImageRollover extends React.Component {
  constructor(props) {
    super(props);
 }

  render() {
    return (
      <img
        src="http://cache1.asset-cache.net/xt/146788260.jpg?v=1&g=fs1|0|SKP102|88|260&s=1"
      />
    );
  }
}

ReactDOM.render(
	<ImageRollover />,
  document.getElementById('container')
);
