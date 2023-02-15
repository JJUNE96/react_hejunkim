import Layout from '../common/Layout';
import Modal from '../common/Modal';
import axios from 'axios';
import { useState, useEffect } from 'react';
function Youtube() {
	const [Vids, setVids] = useState([]);
	const [Open, setOpen] = useState(false);
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

	useEffect(() => {
		console.log(Vids);
	}, [Vids]);
	return (
		<>
			<Layout name={'Youtube'}>
				{Vids.map((el, index) => {
					const tit = el.snippet.title;
					const desc = el.snippet.description;
					const date = el.snippet.publishedAt;

					return (
						<article key={el.id}>
							<div
								className='pic'
								onClick={() => {
									setOpen(true);
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
			{Open && (
				<Modal setOpen={setOpen}>
					<iframe
						title={Vids[0].id}
						src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`}
					></iframe>
					{/* Modal.js의 props.children으로 들어가는 값 */}
				</Modal>
			)}
			{/* open이 참이면 && 뒤의 부분이 실행 */}
		</>
	);
}

export default Youtube;
