import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { memo } from 'react';
import Menu from './Menu';

function Header(props) {
	const active = { color: '#8b8b8c' };

	const menu = useRef(null);
	//const active = { color: 'pink' };
	return (
		<>
			<header className={props.type}>
				<div className='inner'>
					<h1>
						<NavLink to='/'>SUNDAYMUSE</NavLink>
					</h1>
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
						{/* <li>
							<NavLink to='/login' activeStyle={active}>
								Login
							</NavLink>
						</li> */}
					</ul>

					{/* <ul id='util'>
						<li>
							<NavLink to='/location' activeStyle={active}>
								Location
							</NavLink>
						</li>
						<li>
							<NavLink to='/login' activeStyle={active}>
								Login
							</NavLink>
						</li>
					</ul> */}
					<FontAwesomeIcon icon={faBarsStaggered} onClick={() => props.menu.current.setToggle()} />
				</div>
			</header>
			<Menu ref={menu} />
		</>
	);
}

export default memo(Header);
