import { useEffect, useState } from 'react';

function News({ Scrolled, Pos }) {
	const getLocalData = () => {
		const dummys = [
			{ title: 'Article9', content: 'Here comes description in detail.' },
			{ title: 'Article8', content: 'Here comes description in detail.' },
			{ title: 'Article7', content: 'Here comes description in detail.' },
			{ title: 'Article6', content: 'Here comes description in detail.' },
			{ title: 'Article5', content: 'Here comes description in detail.' },
			{ title: 'Article4', content: 'Here comes description in detail.' },
			{ title: 'Article3', content: 'Here comes description in detail.' },
			{ title: 'Article2', content: 'Here comes description in detail.' },
			{ title: 'Article1', content: 'Here comes description in detail.' },
		];
		const data = localStorage.getItem('post');

		if (data) return JSON.parse(data);
		else return dummys;
	};

	const [Posts] = useState(getLocalData());

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<section id='news' className='myScroll'>
			<h1 style={{ transform: `translateX(${Scrolled - Pos}px)` }}>BREAKING</h1>
			<h2 style={{ transform: `translateX(${(Scrolled - Pos) / 3}px)` }}>NEWS</h2>

			{Posts.map((post, idx) => {
				const con = post.content;
				if (idx >= 4) return null;
				return (
					<article key={idx}>
						<h3>{post.title}</h3>
						<p>{post.content >= 50 ? con.substr(0, 50) + '...' : post.content}</p>
					</article>
				);
			})}
		</section>
	);
}

export default News;
