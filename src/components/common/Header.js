import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { useRef } from 'react';
import { memo } from 'react';
import Menu from './Menu';
import { useDispatch } from 'react-redux';
import { toggle } from '../../redux/menuSlice';

function Header(props) {
	//const menu = useSelector((store) => store.menu.open);
	const dispatch = useDispatch();
	const active = { color: 'black' };
	return (
		<>
			<header className={props.type}>
				<div className='inner'>
					<h1>
						<Link to='/'>JUNE</Link>
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
					</ul>
					{/* 토글메뉴 클릭시 toggle함수로 기존 전역 state값을 반전시킨 뒤 dispatch리듀서에 전달 */}
					<ul id='util'>
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
					</ul>
					<FontAwesomeIcon icon={faBars} onClick={() => dispatch(toggle())} />
				</div>
			</header>

			<Menu />
		</>
	);
}

export default memo(Header);
