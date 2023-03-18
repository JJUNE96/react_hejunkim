import { memo, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from '../common/Modal';
import { Keyboard, Pagination, Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
function Pics() {
	const [Index, setIndex] = useState(0);
	const open = useRef(null);

	const { flickr } = useSelector((store) => store.flickrReducer);

	return (
		<>
			<section id='pics' className='myScroll'>
				<h1>SUNDAYMUSE</h1>
				<h2> Best decision you've Ever had</h2>
				<>
					<Swiper
						slidesPerView={4}
						spaceBetween={50}
						loop={true}
						centeredSlides={true}
						navigation={true}
						pagination={{ clickable: true }}
						modules={[Keyboard, Pagination, Navigation]}
					>
						<nav className='controls'></nav>
						{flickr.map((pic, idx) => {
							if (idx >= 7) return null;
							return (
								<>
									<SwiperSlide key={idx}>
										<div className='inner'>
											<div
												className='pic'
												onClick={() => {
													setIndex(idx);
													open.current.setOpen();
												}}
											>
												<img
													key={idx}
													src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
													alt={pic.title}
												/>
											</div>
										</div>
									</SwiperSlide>
								</>
								// <img
								// 	key={idx}
								// 	src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
								// 	alt={pic.title}
								// />
							);
						})}
					</Swiper>
					<NavLink to='/about'>LIST MORE</NavLink>
				</>
			</section>

			<Modal ref={open}>
				<img
					src={`https://live.staticflickr.com/${flickr[Index]?.server}/${flickr[Index]?.id}_${flickr[Index]?.secret}_b.jpg`}
					alt={flickr[Index]?.title}
				/>
			</Modal>
		</>
	);
}

export default memo(Pics);
