import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import Menu from './Menu';
/*
Link는 컴포넌트를 이용한 페이지 이동을 해준다
하지만 url개념이 아니라 path의 개념이다
NavLink는  LInk에다가 special version으로  특정 링크에 스타일을 적용해서 넣어줄수 있다

activeStyle, activeClassName속성을 이용해서 스타일을 적용해주는것
리액트 웹의 현재 url과 to가 가르키는 링크가 일치하면 활성화 되면서 적용되고, 그렇지 않으면 비활성화 되는 식의 적용방식
*/
function Header(props) {
	const menu = useRef(null);
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
					{/* props로 전달 받은 참조객체의 setToggle함수 호출 */}
					<FontAwesomeIcon icon={faBars} onClick={() => props.menu.current.setToggle()} />
				</div>
			</header>

			<Menu ref={menu} />
		</>
	);
}

export default Header;

//리액트는 기본이 js문법아래있기 때문에 class라는 문법이 존재합니다
//class는 사용할수 없기 때문에 className으로 사용한다

//a태그는  link로 사용합니다. link중에 NavLink라는 특수한 link를 사용할것
