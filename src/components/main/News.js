import { useEffect, useState } from 'react';

function News({ Scrolled, Pos }) {
	//로컬스토리지의 데이터를 반환하는 함수
	//로컬스토리지의 값이 있으면 해당 값을 다시 json형태로 변경해서 반환
	//로컬스토리지의 값이 없으면 빈 배열을 반환
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		const dummys = [
			{ title: 'Article1', content: 'Here comes descriptionin detail' },
			{ title: 'Article2', content: 'Here comes descriptionin detail' },
			{ title: 'Article3', content: 'Here comes descriptionin detail' },
		];
		if (data) return JSON.parse(data);
		else return dummys;
	};

	const [Posts] = useState(getLocalData());

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, []);

	return (
		<section id='news' className='myScroll'>
			<h1 style={{ transform: `translateX(${Scrolled - Pos}px)` }}>BREAKING</h1>
			<h2 style={{ transform: `translateX(${(Scrolled - Pos) / 3}px)` }}>NEWS</h2>

			{Posts.map((post, idx) => {
				if (idx >= 4) return null;
				return (
					<article key={idx}>
						<h3>{post.title}</h3>
						<p>{post.content}</p>
					</article>
				);
			})}
		</section>
	);
}

export default News;
