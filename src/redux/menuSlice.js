import { createSlice } from '@reduxjs/toolkit';

//정적인 데이터를 전역관리하기 때문에 createThunk함수가 필요없음
export const menuSlice = createSlice({
	name: 'menu',
	initialState: {
		open: false,
	},
	// 비동기 데이터를 관리하는것이 아니므로 extraReducers가 아닌 reducers
	//extraReducers는 createAsyncThunk함수가 반환하는 액션 객체의 상태에 따라 값을 저장하는 반면
	//reducers는 직접 state값을 변경해주는 함수를 등록

	reducers: {
		close: (state) => {
			state.open = false;
		},
		toggle: (state) => {
			state.open = !state.open;
		},
	},
});
//state변경함수 export
export const { close, toggle } = menuSlice.actions;
// 위의 함수를 통해서 변겨오디는 state값을 export(추후 index.js에서 store에 저장될 값)
export default menuSlice.reducer;
