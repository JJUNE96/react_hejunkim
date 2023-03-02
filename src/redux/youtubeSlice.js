import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//비동기 서버통신으로 데이터를 전달받고 첫번째 인수로 넣은 문자값으로 내부 액션타입을 자동생성해 액션 객체 생성

export const fetchYoutube = createAsyncThunk('youtube/requestYoutube', async () => {
	const key = 'AIzaSyCmBr12Dx2_ZogVZDwezHZ3TDnPw6syC4Q';
	const playlistId = 'PL3DX3fAees627svxgQJYNHQrosJBEm0uc';
	const num = 12;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

	const response = await axios.get(url);
	return response.data.items;
});

const youtubeSlice = createSlice({
	name: 'youtube',
	initialState: {
		data: [],
		isLoding: false,
	},
	extraReducers: {
		//데이터 요청 시작
		[fetchYoutube.pending]: (state) => {
			state.isLoding = true;
		},
		//데이터 응답 성공
		[fetchYoutube.fulfilled]: (state, action) => {
			state.isLoding = false;
			state.data = action.payload;
		},
		//데이터 응답 실패
		[fetchYoutube.rejected]: (state, action) => {
			state.isLoding = false;
			state.data = action.payload;
		},
	},
});

export default youtubeSlice.reducer;
