import Layout from '../common/Layout';
import { useState, useRef, useEffect } from 'react';

/*
Creat : 글저장
Read : 글 읽기
Update: 글 수정
Delete: 글삭제
*/

function Board() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState([]);

	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const createPost = () => {
		//trim() 빈 문자값을 제거해줌
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요');
		}
		setPosts([...Posts, { title: input.current.value, content: textarea.current.value }]);
		resetForm();
	};

	useEffect(() => {
		console.log(Posts);
	}, [Posts]);

	return (
		<Layout name={'Board / 게시판'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea
					cols='30'
					rows='3'
					placeholder='본문을 입력하세요'
					ref={textarea}
				></textarea>
				<br />
				<button>Cancel</button>
				<button onClick={createPost}>Write</button>
			</div>
		</Layout>
	);
}

export default Board;
