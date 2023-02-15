import { useEffect } from 'react';

function Modal(props) {
	useEffect(() => {
		//모달 컴포넌트 마운트시에 스크롤을 비활성화
		document.body.style.overflow = 'hidden';
		return () => {
			//모달 컴포넌트 언마운트시에  클린업함수로 없애서 스크롤 기능 다시 활성화
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		<aside className='modal'>
			<div className='con'>{props.children}</div>
			<span
				className='close'
				onClick={() => {
					props.setOpen(false);
				}}
			>
				Close
			</span>
		</aside>
	);
}

export default Modal;
