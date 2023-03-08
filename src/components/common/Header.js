import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { memo } from 'react';
import Menu from './Menu';

function Header(props) {
	const menu = useRef(null);
	//const active = { color: 'pink' };
	return (
		<>
			<header className={props.type}>
				<div className='inner'>
					<ul id='gnb'>
						<li>
							<NavLink to='/about'>About</NavLink>
						</li>
						<li>
							<NavLink to='/gallery'>Gallery</NavLink>
						</li>
						<li>
							<NavLink to='/board'>Board</NavLink>
						</li>
						<h1>
							<Link to='/'>SUNDAYMUSE</Link>
						</h1>
						<li>
							<NavLink to='/youtube'>Youtube</NavLink>
						</li>
						<li>
							<NavLink to='/join'>Join</NavLink>
						</li>
						<li>
							<NavLink to='/location'>Location</NavLink>
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
					<FontAwesomeIcon
						icon={faBarsStaggered}
						onClick={() => props.menu.current.setToggle()}
					/>
				</div>
			</header>
			<Menu ref={menu} />
		</>
	);
}

export default memo(Header);
