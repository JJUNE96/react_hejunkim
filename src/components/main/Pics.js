import { memo } from 'react';
import { useState, useRef } from 'react';

import { useSelector } from 'react-redux';
import Modal from '../common/Modal';

function Pics() {
	const [Index, setIndex] = useState(0);
	const open = useRef(null);

	const { flickr } = useSelector((store) => store.flickrReducer);
	console.log(flickr);

	return (
		<>
			<section id='pics' className='myScroll'>
				<h1>Flickr</h1>

				{flickr.map((pic, idx) => {
					if (idx >= 4) return null;
					return (
						<article key={idx}>
							<div className='inner'>
								<div
									className='pic'
									onClick={() => {
										open.current.setOpen();
										setIndex(idx);
									}}
								>
									<img
										key={idx}
										src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
										alt={pic.title}
									/>
								</div>
							</div>
						</article>
						// <img
						// 	key={idx}
						// 	src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
						// 	alt={pic.title}
						// />
					);
				})}
			</section>

			<Modal ref={open}>
				<img
					src={`https://live.staticflickr.com/${flickr[Index]?.server}/${flickr[Index]?.id}_${flickr[Index]?.secret}_b.jpg`}
					alt={flickr[Index]?.title}
				/>
			</Modal>
		</>
	);
}

export default memo(Pics);
