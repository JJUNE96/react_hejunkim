import { memo, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function BtnRolling() {
	const swiper = useSwiper();
	const btnRun = useRef(null);
	const btnPause = useRef(null);

	// swiper.on('autoplayPaused', () => {
	// 	btnRun.current.classList.remove('on');
	// 	btnPause.current.classList.add('on');
	// });
	return (
		<nav className='controls'>
			<FontAwesomeIcon
				className='on'
				ref={btnRun}
				icon={faPlay}
				onClick={() => {
					if (!swiper.autoplay.paused) return;
					swiper.autoplay.run();
					btnRun.current.classList.add('on');
					btnPause.current.classList.remove('on');
				}}
			/>
			<FontAwesomeIcon
				ref={btnPause}
				icon={faPause}
				onClick={() => {
					if (swiper.autoplay.paused) return;
					swiper.autoplay.pause();
					btnRun.current.classList.remove('on');
					btnPause.current.classList.add('on');
				}}
			/>
		</nav>
	);
}
function Vids() {
	const Vids = useSelector((store) => store.youtube.data);

	return (
		<section id='vids' className='myScroll'>
			<Swiper
				navigation={true}
				grabCursor={true}
				modules={[Autoplay, Navigation, Pagination]}
				slidesPerView={1}
				spaceBetween={50}
				loop={true}
				centeredSlides={true}
				pagination={{ clickable: true }}
				autoplay={{
					delay: 4000,
					disableOnInteraction: true,
				}}
				// breakpoints={{
				// 	1200: {
				// 		slidesPerView: 3,
				// 		spaceBetween: 50,
				// 	},
				// }}
			>
				<li>
					<NavLink to='/youtube'>VIEW OUR YOUTUBE</NavLink>
				</li>
				<BtnRolling />
				{Vids.map((vid, idx) => {
					if (idx >= 6) return null;

					return (
						<SwiperSlide key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img src={vid.snippet.thumbnails.maxres.url} alt={vid.snippet.title} />
								</div>
								<h2>
									{vid.snippet.title.length >= 30
										? vid.snippet.title.substr(0, 40) + '...'
										: vid.snippet.title}
								</h2>
								<p>
									{vid.snippet.description.length >= 150
										? vid.snippet.description.substr(0, 150) + '...'
										: vid.snippet.description}
								</p>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</section>
	);
}

export default memo(Vids);
