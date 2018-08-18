function ImageRollover() {
	const css = {};

  function setImgSrc(selector, readAttr) {
  	var path = selector.getAttribute(readAttr);
  	selector.src = path;
  }

  function rollOn(event) {
  	const srcPath = event.target.getAttribute('src');
  	event.target.setAttribute('data-primary', srcPath);

    setImgSrc(event.target, 'data-secondary');
  }

  function rollOff(event) {
  	setImgSrc(event.target, 'data-primary');
  }

  return (
  	<img
      src="http://cache1.asset-cache.net/xt/146788260.jpg?v=1&g=fs1|0|SKP102|88|260&s=1"
      data-secondary="http://cache4.asset-cache.net/xt/122556288.jpg?v=1&g=fs1|0|ING|56|288&s=1"
      onMouseOver={rollOn}
      onMouseOut={rollOff}
      style={css}
    />
  );
}

ReactDOM.render(
	<ImageRollover />,
  document.getElementById('container')
);
