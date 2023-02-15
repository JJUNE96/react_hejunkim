import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect } from 'react';

/*
리액트에서의 기본적인 제작 흐름
process.env.PUBLIC_URL => 퍼블릭폴더까지의 경로를 구하는것
axios로 외부 데이터를 호출해서 useEffect의 의존성배열을 비워서 처음 마운트 될때 한번만 데이터를 요청
useState를 이용해서 state로 데이터를 관리하면서 담겨있는 값으로 동적 가상돔을 생성
*/
function About() {
	const [Members, setMembers] = useState([]);

	//처음 컴포넌트가 마운트 되었을때 한번 외부데이터를 호출해서 state에 담음
	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/member.json`).then((json) => {
			setMembers(json.data.members);
		});
	}, []);

	useEffect(() => {
		console.log(Members);
	}, [Members]);

	return (
		<Layout name={'About / 조직도'}>
			{/* react에서 js문법을 사용할때 {}안에 적는다 */}
			{Members.map((el, index) => {
				return (
					<article key={index}>
						<div className='inner'>
							<div className='pic'>
								<img src={`${process.env.PUBLIC_URL}/img/${el.pic}`} alt={el.name} />
							</div>
							<h3>{el.name}</h3>
							<p>{el.position}</p>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}

export default About;
