import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			{/* 순서7- store데이터가 App컴포넌트를 통해서 전역에 전달됨 */}
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

/*
actionType.js : 각 데이터별로 활용한 문자열 액션타입을 변수처럼 모아놓은 객체 
reducer.js : 전역 state의 데이터를 변경하는 함수
saga.js: reducer에서 추가 기능 확장을 위한 미들웨어 (비동기 데이터 요청을 컴포넌트 외부에서 관리)
api.js: 외부 비동기 데이터 호출문을 이곳에 커모넌트 외부파일로 따로 관리
store.js: state가 저장될 전역공간 (saga적용이 가능하도록 미들웨어 설정)

*/

//npm i redux react-redux

/*
--redux--
store: 어떤 컴포넌트에서든 자유롭게 데이터를 가져다 쓸 수 있는 컴포넌트 외부의 독립적인 전역 데이터 공간
reducer: store의 데이터를 변경하는 변형자 (dispatch로 전달되는 action 객체를 통해서만 store데이터를 변경 가능)
action : 컴포넌트에서 reducer에 데이터 변경 요청을 할 때 쓰이는 특별한 객체


--react-redux--
useSelector: 컴포넌트에서 store전역 데이터를 가져올때 쓰는 함수
useDispatch: 컴포넌트에서 reducer에 데이터변경 요청을 위해 action객체를 전달해주는 함수

위의 파일들은 부수효과(SIDE EFFECT)를 발생기키지 않는 순수함수(PURE FUNCTION) 형태로 동작이 되야함
-부수효과 : DOM같이 web api가 개입해야 되는 효과들 순수 자바스크립트만으로 동작할 수 없는 기능들
-순수함수: 부수효과를 발생시키지 않는 순수 자바스크립트로만 동작되는 함수
: 동일한 인풋에는 항상 동일한 결과값 반환
: 함수 외부의 상태변경이나 영향을 받지 않음
*/
