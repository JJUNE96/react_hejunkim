import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masonry from 'react-masonry-component';
import Modal from '../common/Modal';
import * as types from '../../redux/actionType';

function Gallery() {
	const dispatch = useDispatch();
	const Items = useSelector((store) => store.flickrReducer.flickr);
	const open = useRef(null);
	const frame = useRef(null);
	const input = useRef(null);
	const [Index, setIndex] = useState(0);
	const [Loading, setLoading] = useState(true);
	const [Opt, setOpt] = useState({ type: 'user', user: '197645453@N02' });

	const showInterest = () => {
		frame.current.classList.remove('on');
		setLoading(true);
		setOpt({ type: 'interest' });
	};

	const showMine = () => {
		frame.current.classList.remove('on');
		setLoading(true);
		setOpt({ type: 'user', user: '197645453@N02' });
	};

	const showUser = (e) => {
		frame.current.classList.remove('on');
		setLoading(true);
		setOpt({ type: 'user', user: e.target.innerText });
	};

	const showSearch = () => {
		const result = input.current.value.trim();
		if (!result) return alert('검색어를 입력하세요.');
		input.current.value = '';
		frame.current.classList.remove('on');
		setLoading(true);
		setOpt({ type: 'search', tags: result });
	};

	let handleKeyUp = (e) => {
		e.key === 'Enter' && showSearch();
	};

	useEffect(() => {
		dispatch({ type: types.FLICKR.start, Opt });
	}, [Opt, dispatch]);

	useEffect(() => {
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
		}, 500);
	}, [Items]);

	return (
		<>
			<Layout name='Gallery'>
				<div className='controls'>
					<div className='searchBox'>
						<input
							type='text'
							placeholder='검색어를 입력하세요.'
							ref={input}
							onKeyPress={handleKeyUp}
						/>
						<button onClick={showSearch}>Search</button>
					</div>

					<nav>
						<button onClick={showInterest}>Interest Gallery</button>
						<button onClick={showMine}>My Gallery</button>
					</nav>
				</div>

				{Loading && (
					<img
						className='loader'
						src={`${process.env.PUBLIC_URL}/img/load1.png`}
						alt='loading'
					/>
				)}

				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
						{Items.map((item, idx) => {
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
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
												alt={item.title}
											/>
										</div>
										<h2>{item.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
												alt={item.owner}
												onError={(e) => {
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span onClick={showUser}>{item.owner}</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>

			<Modal ref={open}>
				<img
					src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`}
					alt={Items[Index]?.title}
				/>
			</Modal>
		</>
	);
}

export default Gallery;
