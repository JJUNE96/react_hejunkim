import { memo } from 'react';
import { useSelector } from 'react-redux';
function Pics() {
	const { flickr } = useSelector((store) => store.flickrReducer);
	console.log(flickr);
	return (
		<section id='pics' className='myScroll'>
			<h1>flickr</h1>
			{flickr.map((pic, idx) => {
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
