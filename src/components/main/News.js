function News({ Scrolled, Pos }) {
	return (
		<section id='news' className='myScroll'>
			<h1 style={{ transform: `translateX(${(Scrolled - Pos) / 2}px)` }}>News</h1>
			<h2 style={{ transform: `translateX(${(Scrolled - Pos) * 3}px)` }}>News</h2>
			{/* 곱하기를 하면 속도가 배로 빨라지고, 나누기를 하면 그만큼 느려진다. */}

			<article></article>
			<article></article>
			<article></article>
			<article></article>
		</section>
	);
}

export default News;
