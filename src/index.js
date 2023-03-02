import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from './redux/youtubeSlice';

const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
	},
});

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

/*
	redux-saga vs redux-thunk
	redux-saga : 
	- 비동기 데이터의 호출 및 리듀서 상태변화 관련 함수를 saga에서 generator함수로 동기화 처리
	- 컴포넌트 외부에서 독립적으로 비동기 데이터를 전역관리하기 위한 라이브러리
	redux-thunk : 
	- action객체 안쪽에 비동기 데이터 호출 함수 및 리듀서 상태변화 관리 함수를 같이 등록
	redux-toolkit :
	- redux-thunk기반의 통합 라이브러리
	- 기존의 action개체 생성을 slice라는 파일 형태로 컴포넌트 외부에서 간단하게 설정가능
*/
