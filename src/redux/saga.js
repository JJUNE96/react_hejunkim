import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { fetchYoutube, fetchFlicker } from './api';
import * as types from './actionType';

function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

function* returnYoutube() {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		yield put({ type: types.YOUTUBE.fail, payload: err });
	}
}

function* callFlicker() {
	yield takeLatest(types.FLICKER.start, returnFlicker);
}

function* returnFlicker(action) {
	try {
		//fetchFlicker에는 인수로 Opt객체가 전달되야 되기 때문에 컴포넌트에서 {type:'FLICKER_START',opt: {type:'user',use:'사용자아이디'}}
		const response = yield call(fetchFlicker, action.Opt);
		yield put({ type: types.FLICKER.success, payload: response.data.photos.photo });
	} catch (err) {
		yield put({ type: types.FLICKER.fail, payload: err });
	}
}
export default function* rootSaga() {
	yield all([fork(callYoutube), fork(callFlicker)]);
}
