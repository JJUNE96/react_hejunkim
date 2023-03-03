import Layout from '../common/Layout';
import Modal from '../common/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlickr } from '../../redux/flickrSlice';
import { useEffect, useState, useRef } from 'react';
import Masonry from 'react-masonry-component';

function Gallery() {
	const dispatch = useDispatch(null);
	//검색결과가 없는지 판단시 처음 컴포넌트가 마운트되서 결과값이 없는지 검색후의 결과가 없는지의 구문을 위한 참조객체
	//초기엔 true, 만약 검색 함수가 실행되면 false로 변경
	const init = useRef(true);
	const open = useRef(null);
	const frame = useRef(null);
	const input = useRef(null);

	const [Index, setIndex] = useState(0);
	const [Loading, setLoading] = useState(true);

	const Items = useSelector((store) => store.flickr.data);

	const showInterest = () => {
		frame.current.classList.remove('on');
		setLoading(true);
		dispatch(fetchFlickr({ type: 'interest' }));
	};

	const showMine = () => {
		frame.current.classList.remove('on');
		setLoading(true);
		dispatch(fetchFlickr({ type: 'user', user: '197645453@N02' }));
	};

	const showUser = (e) => {
		frame.current.classList.remove('on');
		setLoading(true);
		dispatch(fetchFlickr({ type: 'user', user: e.target.innerText }));
	};

	const showSearch = () => {
		const result = input.current.value.trim();
		if (!result) return alert('검색어를입력하세요.');
		input.current.value = '';
		frame.current.classList.remove('on');
		setLoading(true);
		dispatch(fetchFlickr({ type: 'search', tags: result }));
		init.current(false);
	};
	let handleKeyUp = (e) => {
		e.key === 'Enter' && showSearch();
	};

	useEffect(() => {
		//init.currnet의 값이 false이고 그와 동시에 검색 결과가 없을때만 경고장 출력
		if (Items.length === 0) {
			dispatch(fetchFlickr({ type: 'user', user: '197645453@N02' }));
			frame.current.classList.remove('on');
			setLoading(true);
			return alert('검색어의 결과 이미지가 없습니다.');
		}

		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
		}, 500);
	}, [Items, dispatch]);

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
						src={`${process.env.PUBLIC_URL}/img/load3.png`}
						alt='loading'
					/>
				)}

				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={{ transitionDuration: '0.3s' }}>
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
					src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_m.jpg`}
					alt={Items[Index]?.title}
				/>
			</Modal>
		</>
	);
}

export default Gallery;
