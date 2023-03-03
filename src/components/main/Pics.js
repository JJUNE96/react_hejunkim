import { memo } from 'react';
import { useSelector } from 'react-redux';
function Pics() {
	const pics = useSelector((store) => store.flickr);
	console.log(pics);

	return (
		<section id='pics' className='myScroll'>
			<h1>Flicker</h1>
		</section>
	);
}

export default memo(Pics);
