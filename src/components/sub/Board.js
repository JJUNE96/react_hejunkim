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

	//post 추가함수
	const createPost = () => {
		//trim() 빈 문자값을 제거해줌
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요');
		}
		setPosts([{ title: input.current.value, content: textarea.current.value }, ...Posts]);
		resetForm();
	};

	//post 삭제함수
	const deletePost = (index) => {
		//삭제될 글의 순번이 index파라미터로 전달됨
		//Posts배열을 반복 돌면서 현재 반복도는 순번과 삭제할 index순번의 값이 같지 않은 나머지 글만 filltering해서 반환
		//filter자체가 기존 배열을 deep copy하면서 새롭게 filtering된 배열을 반환하는 메서드이므로 기존 Posts를 전개연산자로 불변성 유지할 필요가 없음

		//window.confirm은 true, flase의 boolean값을 반환
		//경고창에서 확인 클릭시 tur반환되면서 해당 if문의 return이 무시되고 아래쪽의 글 삭제문이 시행됨
		//
		if (!window.confirm('해당 게시글을 삭제하시겠습니까?'));
		setPosts(Posts.fillter((_, idx) => idx !== index));
	};

	//post 수정모드 변경함수
	const enableUpdate = (editIndex) => {
		setPosts(
			Posts.map((post, postIndex) => {
				//기존 Posts를 반복을 돌면서 현재 반복도는 post의 순번과 파라미터로 전달받은 수정할 post의 순번이 같으면
				//해당 post객체에만 enableUpdate = true 라는 정보값을
				if (postIndex === editIndex) post.enableUpdate = true;
				return post;
			})
		);
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
					placeholder='본문을 입력하세요.'
					ref={textarea}
				></textarea>
				<br />

				<div className='btnSet'>
					<button onClick={resetForm}>CANCEL</button>
					<button onClick={createPost}>WRITE</button>
				</div>
			</div>

			<div className='showBox'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								//현재 반복도는 post의 enabeUpdate값이 true면
								//수정모드 렌더링
								<>
									<div className='txt'>
										<input type='text' defaultValue={post.title} />
										<br />
										<textarea
											name=''
											id=''
											cols='30'
											rows='3'
											defaultValue={post.content}
										></textarea>
									</div>

									<div className='btnSet'>
										<button>CANCLE</button>
										<button>UPDATE</button>
									</div>
								</>
							) : (
								//현재반복도는 post의 enableUpdate값이 없거나 false면
								//출력모드 렌더링
								<>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
									</div>

									<div className='btnSet'>
										{/* 수정버튼 클릭시 수정할 글의 순번을 enableUpdate */}
										<button onClick={() => enableUpdate(idx)}>EDIT</button>
										{/* 삭제버튼 클릭시 삭제할 글의 순번을 deletePost함수의 인수로 전달 */}
										<button onClick={() => deletePost(idx)}>DELETE</button>
									</div>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Board;
