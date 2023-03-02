import { memo } from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	//순서 8 - 전역에 있는 store데이터를 useSelector로 호출
	const { youtube } = useSelector((store) => store.youtubeReducer);
	console.log(youtube);

	return (
		<section id='vids' className='myScroll'>
			<h1>Youtube</h1>

			{youtube.map((vid, idx) => {
				if (idx >= 4) return null;
				return (
					<article key={vid.id}>
						<div className='pic'>
							<img src={vid.snippet.thumbnails.medium.url} alt={vid.snippet.title} />
						</div>
					</article>
				);
			})}
		</section>
	);
}

export default memo(Vids);
