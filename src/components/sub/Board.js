import Layout from '../common/Layout';
import { useState, useRef, useEffect } from 'react';

/*
local storage
-각 브라우저에 있는 로컬 저장공간
-문자값만 저장가능 (문자값이 아니나 데이터 json -> 문자화해서 저장)
-5MB까지만 저장 가능한 경량의 저장공간
-{key:'문자값'}
-localStorage: setItem({key:'문자값'}) - 값 저장
-localStorage.getIte(key) - 값 불러오기
*/
/*
Creat : 글저장
Read : 글 읽기
Update: 글 수정
Delete: 글삭제
*/

function Board() {
	const getLocalData = () => {
		const dummys = [
			{ title: 'Article9', content: 'Here comes description in detail.' },
			{ title: 'Article8', content: 'Here comes description in detail.' },
			{ title: 'Article7', content: 'Here comes description in detail.' },
			{ title: 'Article6', content: 'Here comes description in detail.' },
			{ title: 'Article5', content: 'Here comes description in detail.' },
			{ title: 'Article4', content: 'Here comes description in detail.' },
			{ title: 'Article3', content: 'Here comes description in detail.' },
			{ title: 'Article2', content: 'Here comes description in detail.' },
			{ title: 'Article1', content: 'Here comes description in detail.' },
		];
		const data = localStorage.getItem('post');

		if (data) return JSON.parse(data);
		else return dummys;
	};

	const input = useRef(null);
	const textarea = useRef(null);
	//수정모드에서의 input, textarea가 담길 참조객체
	const inputEdit = useRef(null);
	const textareaEdit = useRef(null);
	//localStorage 반환값을 Posts의 초기값으로 지정
	const [Posts, setPosts] = useState(getLocalData());
	//Allowd값이 true일떄만 수정모드 진입 가능
	const [Allowed, setAllowed] = useState(true);

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
		if (!Allowed) return;

		setPosts(
			Posts.map((post, postIndex) => {
				//기존 Posts를 반복을 돌면서 현재 반복도는 post의 순번과 파라미터로 전달받은 수정할 post의 순번이 같으면
				//해당 post객체에만 enableUpdate = true 라는 정보값을
				if (postIndex === editIndex) post.enableUpdate = true;
				return post;
			})
		);
		//수정모드에 진입하면 Allowed값을 false로 바꿔서 다른 글의 수정모드 진입을 방지
		setAllowed(false);
	};

	//post 출력모드 변경함수
	const disableUpdate = (editIndex) => {
		setPosts(
			Posts.map((post, postIndex) => {
				if (postIndex === editIndex) post.enableUpdate = false;
				return post;
			})
		);
		//출력모드로 변경시 다시 Allowed값을 true로 변경해서 다시 다른 글 수정모드로 변경할 수 있게 처리
		setAllowed(true);
	};

	//post 수정함수
	const updatePost = (updateIndex) => {
		if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
			return alert('수정할 제목과 본문을 모두 입력하세요.');
		}

		setPosts(
			Posts.map((post, postIndex) => {
				//현재 반복도는 post순번과 파라미터로 전달받은 수정할 포스트 순번이 같으면
				if (postIndex === updateIndex) {
					//수정모드에서 입력한 input, textarea값으로 기존 포스트 제목, 본문을 변경
					post.title = inputEdit.current.value;
					post.content = textareaEdit.current.value;
					//출력모드로 다시 변경
					post.enableUpdate = false;
				}
				return post;
			})
		);

		//수정 완료시 다시 다른글 수정모드로 진입할 수 있게 수정
		setAllowed(true);
	};

	useEffect(() => {
		//Posts값이 변경될때마다 해당 데이터를 문자화해서 다시 localStorage에 저장
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout name={'Board / 게시판'}>
			<div className='showBox'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								//현재 반복도는 post의 enabeUpdate값이 true면
								//수정모드 렌더링
								<>
									<div className='txt'>
										<input type='text' defaultValue={post.title} ref={inputEdit} />
										<br />
										<textarea
											cols='30'
											rows='3'
											defaultValue={post.content}
											ref={textareaEdit}
										></textarea>
									</div>

									<div className='btnSet'>
										<button onClick={() => disableUpdate(idx)}>CANCEL</button>
										<button onClick={() => updatePost(idx)}>UPDATE</button>
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
		</Layout>
	);
}

export default Board;
