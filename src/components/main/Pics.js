import { memo } from 'react';
import { useSelector } from 'react-redux';
function Pics() {
	const { flicker } = useSelector((store) => store.flickerReducer);
	console.log(flicker);
	return (
		<section id='pics' className='myScroll'>
			<h1>Flicker</h1>
			{flicker.map((pic, idx) => {
				if (idx >= 4) return null;
				return (
					<img
						key={idx}
						src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
						alt={pic.title}
					></img>
				);
			})}
		</section>
	);
}

export default memo(Pics);
