import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Masonry from 'react-masonry-component';
//npm i react-masonry-component

function Gallery() {
	const frame = useRef(null);
	const input = useRef(null);
	const [Items, setItems] = useState([]);
	const [Loading, setLoading] = useState(true);

	const getFlicker = async (opt) => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = '317a304fd6fe37a1323995ca69db0b06';
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		const method_user = 'flickr.people.getPhotos';
		const num = 9;
		// const url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		let url = '';

		if (opt.type === 'interest')
			url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (opt.type === 'search')
			url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
		if (opt.type === 'user')
			url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

		// axios.get(url).then((json) => {
		// 	setItems(json.data.photos.photo);
		// });
		//Promise then 보다 async await방식 동기화 함수를 많이 사용
		const result = await axios.get(url);

		//flickr로 반환한 데이터 배열값이 0개일때 (결과 이미지가 없을때) 기존 Items state를 변경하지 않고 이전 갤러리화면 다시 보이게 처리
		if (result.data.photos.photo.length === 0) {
			frame.current.classList.add('on');
			setLoading(false);
			return alert('해당 검색어의 결과 이미지가 없습니다.');
		}
		setItems(result.data.photos.photo);

		setTimeout(() => {
			setLoading(false);
			frame.current.classList.add('on');
		}, 500);
	};

	const showInterest = () => {
		frame.current.classList.remove('on');
		setLoading(true);
		getFlicker({ type: 'interest' });
	};

	const showMine = () => {
		frame.current.classList.remove('on');
		setLoading(true);
		getFlicker({ type: 'user', user: '197645453@N02' });
	};

	const showUser = (e) => {
		frame.current.classList.remove('on');
		setLoading(true);
		//사용자 아이디 클릭시 해당 span요소의 아이디명을 가져와서 user키값에 등록후 데이터 요청
		getFlicker({ type: 'user', user: e.target.innerText });
	};

	const showSearch = () => {
		const result = input.current.value.trim();
		if (!result) return alert('검색어를입력하세요.');
		input.current.value = '';
		frame.current.classList.remove('on');
		setLoading(true);
		getFlicker({ type: 'search', tags: result });
	};

	useEffect(() => {
		getFlicker({ type: 'interest' });
		//getFlicker({ type: 'search', tags: '하늘' });
		//getFlicker({ type: 'user', user: '197645453@N02' });
	}, []);

	return (
		<Layout name='Gallery'>
			<div className='controls'>
				<div className='searchBox'>
					{/* input요소에서 키보드 이벤트 발생시 이벤트가 발생한 키이름이 'Enter'면 showSearch 함수 호출*/}
					<input
						type='text'
						placeholder='검색어를 입력하세요.'
						ref={input}
						onKeyUp={(e) => e.key === 'Enter' && showSearch()}
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
				{/* 반복볼면서 float된 article요소들을 Masomry컴포넌트로 wrapping후 elementType지정 */}
				<Masonry elementType={'div'} options={{ transitionDuration: '0.3s' }}>
					{Items.map((item, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<div className='pic'>
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
											//해당 이미지에 에러 발생시 해당 이미지의 src속성값을 대체이미지url로 변경
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
	);
}

export default Gallery;
