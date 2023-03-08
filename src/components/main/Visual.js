import { memo } from 'react';
import video from '../../image/main.mp4';

function Visual() {
	return (
		<figure id='visual' className='myScroll'>
			<video loop autoPlay muted>
				<source src={video} type='video/mp4' />
			</video>
		</figure>
	);
}

export default memo(Visual);
