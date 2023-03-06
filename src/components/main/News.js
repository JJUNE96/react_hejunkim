import { NavLink } from 'react-router-dom';

function News() {
	return (
		<article className='news'>
			<img id='news1' src={`${process.env.PUBLIC_URL}/img/news3.png`} alt='news' />

			<h1>Living In the Magic</h1>
			<h2>
				AND NEVER
				<br /> UNDERESTIMATING <br />
				WHAT CAN HAPPEN
			</h2>

			<p>
				This is where you can introduce yourself to your audience— let them know who you
				are, why you do
				<br /> what you do, and how you can help them. Lorem ipsum dolor sit amet,
				consectetur adipiscing elit,
				<br /> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
				ipsum suspendisse.
			</p>

			<li>
				<NavLink to='/board'>Learn More </NavLink>
			</li>
			<img id='news2' src={`${process.env.PUBLIC_URL}/img/news1.png`} alt='news' />
			<img id='news3' src={`${process.env.PUBLIC_URL}/img/news2.png`} alt='news' />
		</article>
	);
}

export default News;
