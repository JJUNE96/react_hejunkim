import { memo } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../common/Modal';
import { useState, useRef } from 'react';

function Pics() {
	const pics = useSelector((store) => store.flickr.data);
	const [Index, setIndex] = useState(0);
	const open = useRef(null);

	return (
		<>
			<section id='pics' className='myScroll'>
				<h1>Flicker</h1>
				<ul>
					{pics.map((pic, idx) => {
						if (idx >= 6) return null;
						return (
							<li
								key={idx}
								onClick={() => {
									setIndex(idx);
									open.current.setOpen();
								}}
							>
								<img
									src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
									alt={pic.title}
								/>
							</li>
						);
					})}
				</ul>
			</section>
			<Modal ref={open}>
				<img
					src={`https://live.staticflickr.com/${pics[Index]?.server}/${pics[Index]?.id}_${pics[Index]?.secret}_m.jpg`}
					alt={pics[Index]?.title}
				/>
			</Modal>
		</>
	);
}

export default memo(Pics);
