import Layout from '../common/Layout';
import Modal from '../common/Modal';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function Youtube() {
	//컴포넌트 마운트시 일단 전역 state에 있는 빈 배열값을 가져옴
	//추후 useEffect axios가 유튜브 데이터를 가져오면 dispatch로 데이터가 이듀서로 전달되고
	//두번째 렌더링 사이클에서 해당 데이터로 유튜브 데이터 랜더링
	//console.log(Vids);
	const open = useRef(null);
	const [Vids, setVids] = useState([]);
	const [Index, setIndex] = useState(0);

	useEffect(() => {
		const key = 'AIzaSyCmBr12Dx2_ZogVZDwezHZ3TDnPw6syC4Q';
		const playlistId = 'PL3DX3fAees627svxgQJYNHQrosJBEm0uc';
		const num = 12;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

		axios.get(url).then((json) => {
			// console.log(json);
			setVids(json.data.items);
		});
	}, []);
	return (
		<>
			<Layout name={'Youtube / 유튜브'}>
				{Vids.map((el, index) => {
					const tit = el.snippet.title;
					const desc = el.snippet.description;
					const date = el.snippet.publishedAt;

					return (
						<article key={el.id}>
							<div
								className='pic'
								onClick={() => {
									open.current.setOpen();
									setIndex(index);
								}}
							>
								<img src={el.snippet.thumbnails.high.url} alt={el.snippet.title} />
							</div>
							<div className='txt'>
								<h3>{tit.length > 20 ? tit.substr(0, 20) + '...' : tit}</h3>
								<p>{desc.length > 60 ? desc.substr(0, 60) + '...' : desc}</p>
								<span>{date.split('T')[0]}</span>
							</div>
						</article>
					);
				})}
			</Layout>

			{/* 모달을 여는 함수를 open참조객체에 연결 */}
			<Modal ref={open}>
				{/* youtube 컴포넌트 첨 마운트시 Modal컴포넌트 자체는 동작되기 때문에 첫번쨰 랜더링 싸이클일때 Vids[Index]값이 비어있으므로 에러 따라서 Optional Chaining으로 해당 객체값이 비어있을떄는 id값을 읽지 않고 값이 담겨 있을때만 실행 */}
				<iframe
					title={Vids[0]?.id}
					src={`https://www.youtube.com/embed/${Vids[Index]?.snippet.resourceId.videoId}`}
				></iframe>
			</Modal>
			{/* open이 참이면 && 뒤의 부분이 실행 */}
		</>
	);
}

export default Youtube;
