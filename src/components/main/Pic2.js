import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import image1 from '../../image/joy4.png';
import image2 from '../../image/joy2.png';
import image3 from '../../image/joy3.png';
import image4 from '../../image/news1.png';
import image5 from '../../image/news2.png';
import image6 from '../../image/news3.png';
import { NavLink } from 'react-router-dom';

function Pic2() {
	const [currentTab, clickTab] = useState(0);
	const menuArr = [
		{
			name: '01',
			image: image1,
			image2: image4,
			text1:
				'Here you can add another fun or interesting fact about yourself. Tell your audience something interesting that relates to your line of work such as why you love doing what you do. This is a great opportunity to connect.',
		},
		{
			name: '02',
			image: image2,
			image2: image5,

			text1:
				'Got a hobby? Share that with your audience.This is an opportunity to show common ground with your audience and allow them to fall in love with you and say "Yes! I totally resonate." Connection matters.',
		},
		{
			name: '03',
			image: image3,
			image2: image6,
			text1:
				'Here you can add another fun or interesting fact about yourself. Tell your audience something interesting that relates to your line of work such as why you love doing what you do. This is a great opportunity to connect.',
		},
	];

	const selectMenuHandler = (index) => {
		// parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
		// 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
		clickTab(index);
	};
	return (
		<>
			<div className='pic2'>
				<p>BASED IN JOSHUA TREE, CALIFORNIA</p>
				<h2>MEET SUNDAY</h2>
				<tabmenu className='inner'>
					{/* <li className='submenu'>{menuArr[0].name}</li>
					<li className='submenu'>{menuArr[1].name}</li>
					<li className='submenu'>{menuArr[2].name}</li> */}
					{menuArr.map((el, index) => (
						<li
							className={index === currentTab ? 'submenu focused' : 'submenu'}
							onClick={() => selectMenuHandler(index)}
						>
							{el.name}
						</li>
					))}
				</tabmenu>
				<desc className='content'>
					<div className='inner2'>
						<NavLink to='/about'>
							get to know me &nbsp;
							<FontAwesomeIcon icon={faArrowRightLong}>
								{faArrowRightLong}
							</FontAwesomeIcon>
						</NavLink>
						<img src={menuArr[currentTab].image2} alt='' />
						<p>{menuArr[currentTab].text1}</p>
					</div>

					<img src={menuArr[currentTab].image} alt='' />
				</desc>
				<h1>
					The Dreamer Behind
					<br /> The Magic
				</h1>
			</div>
		</>
	);
}

export default Pic2;
