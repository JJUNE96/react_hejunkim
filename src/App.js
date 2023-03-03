import { Route, Switch } from 'react-router-dom';
//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Menu from './components/common/Menu';
//main
import Main from './components/main/Main';

//sub
import Board from './components/sub/Board';
import About from './components/sub/About';
import Gallery from './components/sub/Gallery';
import Location from './components/sub/Location';
import Join from './components/sub/Join';
import Youtube from './components/sub/Youtube';
import Login from './components/sub/Login';

//sass
import './scss/style.scss';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchFlickr } from './redux/flickrSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
/*
switch는 좀더 자세하게 적은 (exact) 내용을 먼저 채택하고 예외로 그렇지 않는 내용을 처리

*/
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchYoutube());
		dispatch(fetchFlickr({ type: 'user', user: '197645453@N02' }));
	}, [dispatch]);

	return (
		<>
			<Switch>
				{/* 전역으로 모바일 패널열고 닫는 state값을 관리하기 때문에 props로 값전달할 필요없음 */}
				<Route exact path='/' component={Main} />

				<Route path='/' render={() => <Header type={'sub'} />}></Route>
			</Switch>

			<Route path='/about'>
				<About />
			</Route>

			<Route path='/youtube'>
				<Youtube />
			</Route>

			<Route path='/gallery'>
				<Gallery />
			</Route>

			<Route path='/board'>
				<Board />
			</Route>

			<Route path='/location'>
				<Location />
			</Route>

			<Route path='/login'>
				<Login />
			</Route>

			<Route path='/join'>
				<Join />
			</Route>

			<Footer />
			{/* w전역으로 데이터를 관리하므로 Menu로부터 특정값을 forwarderef을 */}
			<Menu />
		</>
	);
}

export default App;

/*
SSR vs CSR

SSR = Server side Rendering
-페이지 이동시마다 일일 서버쪽에 출력될  html 파일을 요청하는 방법
-장점 : 초기 로딩속도가 빠른편, 검색최적화된 방법
-단점 : 페이지 이동시, 같은 페이지 안에서 컨텐츠가 동적으로 바뀌어야 될때 사용성이 낮아서 불편

CSR = Client side Rendering
- 초기에 화면에 출력될 모든 정보 데이터를 chunk단위로 모두 불러옴
-장점 : 같은 페이지 안에서 서로 다른 컨텐츠를 실시간으로 변경하면서 출력되므로 속도가 빠름(다른컨텐츠를 실시간으로 보여주는 속도)
-단점 : 초기 로딩속도가 느림, 검색엔진 비최적화

jsx문법

1. html문법안에 자바스크립트 문법을 사용할 때는 중괄호를 안에 넣어야한다
<div className="li" onClick={()=>{ console.log('click')}}>li</div>

2. class는 js의 객체지향에서의 사용되는 문법으로 사용할수 없어서, className을 사용한다

3.jsx문법에는 모든 태그는 스스로 닫을 수 있습니다  <div></div> => <div />

4. fragment 모든 요소를 감싸는 최상위 요소
의미없는 <div></div> 감싸는 것이 아니라 <></> 

5. 컴포넌트 함수를 만들때 반드시 첫글자는 대문자이어야 한다
컴포넌트란 반복적인 애용들이 필요할때 기본틀을 이안에 분리해서 호출하는 식으로 사용할때 각 기능적 단위가 되는 것

6.컴포넌트 함수를 외부로 보낼때는 export하고, 해당 컴포넌트를 호출할때는 import해야한다


*/
