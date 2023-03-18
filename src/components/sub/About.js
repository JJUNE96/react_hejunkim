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
