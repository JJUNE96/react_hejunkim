import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<App />
		</HashRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

//npm i redux react-redux

/*
--redux--
store: 어떤 컴포넌트에서든 자유롭게 데이터를 가져다 쓸 수 있는 컴포넌트 외부의 독립적인 전역 데이터 공간
reducer: store의 데이터를 변경하는 변형자 (dispatch로 전달되는 action 객체를 통해서만 store데이터를 변경 가능)
action : 컴포넌트에서 reducer에 데이터 변경 요청을 할 때 쓰이는 특별한 객체


--react-redux--
useSelector: 컴포넌트에서 store전역 데이터를 가져올때 쓰는 함수
useDispatch: 컴포넌트에서 reducer에 데이터변경 요청을 위해 action객체를 전달해주는 함수
*/
