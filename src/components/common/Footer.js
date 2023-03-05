import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTwitter,
	faYoutube,
	faSpotify,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons';
function Footer(props) {
	const active = { color: 'black' };
	return (
		<footer className={props.type}>
			<>
				<ul id='gnb'>
					<li>
						<NavLink to='/about' activeStyle={active}>
							About
						</NavLink>
					</li>
					<li>
						<NavLink to='/gallery' activeStyle={active}>
							Gallery
						</NavLink>
					</li>
					<li>
						<NavLink to='/board' activeStyle={active}>
							Board
						</NavLink>
					</li>
					<li>
						<NavLink to='/youtube' activeStyle={active}>
							Youtube
						</NavLink>
					</li>
					<li>
						<NavLink to='/join' activeStyle={active}>
							Join
						</NavLink>
					</li>
					<li>
						<NavLink to='/location' activeStyle={active}>
							Location
						</NavLink>
					</li>
				</ul>
				<div className='photo'>
					<p>stay in the know</p>
					<h2>GET THE NEWSLETTER</h2>
					<img src={`${process.env.PUBLIC_URL}/img/footer1.png`} alt='footer1' />
					<img src={`${process.env.PUBLIC_URL}/img/footer2.png`} alt='footer2' />
					<img src={`${process.env.PUBLIC_URL}/img/footer3.png`} alt='footer3' />
					<ul className='brands'>
						<li>
							<FontAwesomeIcon icon={faYoutube} />
						</li>
						<li>
							<FontAwesomeIcon icon={faTwitter} />
						</li>
						<li>
							<FontAwesomeIcon icon={faSpotify} />
						</li>
						<li>
							<FontAwesomeIcon icon={faInstagram} />
						</li>
					</ul>
				</div>
				<div className='inner'>
					<address>
						address: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, ipsam!
						TEL : +82-010-2968-5070 FAX : +82-010-2968-5070
					</address>
					<p>Copyright &copy; 2023 HE JUN ALL Right reserved</p>
				</div>
			</>
		</footer>
	);
}

export default memo(Footer);
