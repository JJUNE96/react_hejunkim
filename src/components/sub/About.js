import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect } from 'react';
function About() {
	//useDiapatch로 dispatch함수 활성화

	const [Members, setMembers] = useState([]);

	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/member.json`).then((json) => {
			setMembers(json.data.members);
		});
	}, []);

	useEffect(() => {
		console.log(Members);
	}, [Members]);

	return (
		<Layout name={'About'}>
			<>
				<h2>
					SUNDAYMUSE <br />
					is based in
					<br /> SEOUL, founded in 2005.
				</h2>
				<h3>
					We have been working with world top models, agencies, clients around the world.
					<br /> We are always looking for the most modern and unique models for the markets.
					<br /> Our models will be the BEST you have EVER worked with.
				</h3>
				<div className='icon'>
					<img src={`${process.env.PUBLIC_URL}/img/icon10.png`} alt='pic' />
				</div>
			</>
			{Members.map((el, index) => {
				return (
					<article key={index}>
						<div className='inner'>
							<div className='pic'>
								<img src={`${process.env.PUBLIC_URL}/img/${el.pic}`} alt={el.name} />
								<div className='contents'>
									{el.name}
									<br />
									{el.height}
									<br />
									{el.Shoes}
									<br />
									{el.hair}
								</div>
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
