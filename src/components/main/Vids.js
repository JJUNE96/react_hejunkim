import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Vids() {
	const Vids = useSelector((store) => store.youtube.data);

	return (
		<section id='vids' className='myScroll'>
			<Swiper
				navigation={true}
				grabCursor={true}
				modules={[Autoplay, Navigation, Pagination]}
				//slidesPerView={3}
				spaceBetween={50}
				loop={true}
				centeredSlides={true}
				pagination={{ clickable: true }}
				autoplay={{
					delay: 2000,
					disableOnInteraction: true,
				}}
				observer={true}
				observeParents={true}
			>
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
								<li>
									<NavLink to='/youtube'>VIEW OUR YOUTUBE</NavLink>
								</li>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</section>
	);
}

export default memo(Vids);
