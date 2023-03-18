import { memo } from 'react';
// import video from '../../image/main.mp4';
import React, { useState, useEffect } from 'react';
import image1 from '../../image/main1.png';
import image2 from '../../image/main2.png';
import image3 from '../../image/main3.png';

function Visual() {
	const [activeTab, setActiveTab] = useState(0);
	const [activeBoxIndex, setActiveBoxIndex] = useState(0);

	const tabs = [
		{
			title: 'BRAND NEW\nEXPERIENCE',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem voluptates molestiae deleniti velit officia, voluptatem sequi quis temporibus accusantium dicta aut, similique modi enim recusandae? Ducimus architecto at voluptatibus quisquam.',
			buttonText: 'VIEW DETAIL',
			backgroundImage: image1,
		},
		{
			title: 'EXPLORE OUR\nBRANDS',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas reprehenderit atque laboriosam error? Nam iure assumenda iusto doloribus quis veniam, minima quas perspiciatis, quo ex molestias id accusamus. Laboriosam, recusandae.',
			buttonText: 'VIEW DETAIL',
			backgroundImage: image2,
		},
		{
			title: 'BECOME VIP\nMEMBER',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, laudantium. Asperiores sint vel dicta tempora placeat suscipit saepe cupiditate repudiandae assumenda corporis? Velit eveniet soluta dicta excepturi culpa saepe amet?',
			buttonText: 'VIEW DETAIL',
			backgroundImage: image3,
		},
	];

	//const frame = document.querySelector('.frame');
	const bgs = document.querySelectorAll('.frame .bg');
	const lines = document.querySelectorAll('.frame .line');

	const btns = document.querySelectorAll('.btns span');
	const boxs = document.querySelectorAll('article');
	const header = document.querySelector('header');

	const num = 10;
	const changeDelay = 500;

	insertDivs(0.05);
	insertLine();

	// btns.forEach((btn, idx) => {
	// 	btn.addEventListener('click', (e) => {
	// 		e.preventDefault();
	// 		for (const el of btns) el.classList.remove('on');
	// 		for (const el of boxs) el.classList.remove('on');

	// 		//btns[idx].classList.add('on');
	// 		//setTimeout(() => boxs[idx].classList.add('on'), changeDelay);

	// 		setTimeout(() => setActiveBoxIndex(0), changeDelay);
	// 	});
	// });

	function insertDivs(interval) {
		bgs.forEach((bg) => {
			let tags = '';
			for (let i = 0; i < num; i++) {
				tags += `<div style='transition-delay: ${interval * i}s; clip-path: polygon(${(100 / num) * i}% 0%, ${
					(100 / num) * (i + 1)
				}% 0%, ${(100 / num) * (i + 1)}% 100%,  ${(100 / num) * i}% 100%)'></div>`;
			}
			bg.innerHTML = tags;
		});
	}

	function insertLine() {
		lines.forEach((line) => {
			let tags = '';
			for (let i = 0; i < num; i++) tags += `<div style='width:${100 / num}%; left:${(100 / num) * i}%'></div>`;
			line.innerHTML = tags;
		});
	}

	const handleClick = (index) => {
		setActiveTab(index);
		setActiveBoxIndex(index);
		const newBoxs = [...boxs];
		newBoxs.forEach((box) => box.classList.remove('on'));
		newBoxs[index].classList.add('on');
	};

	useEffect(() => {
		setTimeout(() => setActiveBoxIndex(0), changeDelay);
		setTimeout(() => {
			const header = document.querySelector('header');
			header.classList.add('on');
		}, 400);
	}, []);

	return (
		// <figure id='visual' className='myScroll'>
		// 	<video loop autoPlay muted>
		// 		<source src={video} type='video/mp4' />
		// 	</video>
		// 	{/* <img src={`${process.env.PUBLIC_URL}/img/main2.png`} alt='img' /> */}
		// </figure>
		<figure>
			<section className='frame'>
				{tabs.map((tab, index) => (
					<article key={index}>
						{/* <div className='bg' style=></div> */}
						<img className='bg' src={tab.backgroundImage} alt='' />
						<aside className='line'></aside>
						<div className='txt'>
							<h2>{tab.title}</h2>
							<p>{tab.description}</p>

							<div className='bar'>
								<ul>
									<li>
										<span>reservation</span>
									</li>
									<li>
										<span>tour guide</span>
									</li>
								</ul>
								<button>{tab.buttonText}</button>
							</div>
						</div>
					</article>
				))}
			</section>

			<nav className='btns'>
				{tabs.map((tab, index) => (
					<span key={index} className={activeTab === index ? 'on' : ''}>
						<p onClick={() => handleClick(index)}>{tab.title}</p>
					</span>
				))}
			</nav>
		</figure>
	);
}

export default memo(Visual);
