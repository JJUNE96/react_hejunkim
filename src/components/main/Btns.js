import { useRef, useEffect } from 'react';
import Anim from '../../asset/Anime';
function Btns({ setScrolled, setPos }) {
	const btnRef = useRef(null);
	const pos = useRef({});
	const num = useRef(4); //li갯수
	const speed = useRef(500); //속도

	/*
	useRef사용이유
	- 가상돔 요소를 참조해서 재활용할때
	- 컴포넌트가 재랜더링되더라도 특정 값을 유지할때, 컴포넌트 리랜더링을 방지
*/
	const getPos = () => {
		pos.current = [];

		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (let el of secs) pos.current.push(el.offsetTop);

		setPos(pos.current);
	};

	const activation = () => {
		const btns = btnRef.current.children;
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		const scroll = window.scrollY;
		const base = -window.innerHeight / 3;
		setScrolled(scroll);
		pos.current.forEach((el, index) => {
			if (scroll >= el + base) {
				for (let el of btns) el.classList.remove('on');
				for (let el of secs) el.classList.remove('on');
				btns[index].classList.add('on');
				secs[index].classList.add('on');
			}
		});
	};

	/*
		if (scroll >= pos.current[0]) {
			for (const btn of btns) btn.classList.remove('on');
			btns[0].classList.add('on');
		}
		if (scroll >= pos.current[1]) {
			for (const btn of btns) btn.classList.remove('on');
			btns[1].classList.add('on');
		}
		if (scroll >= pos.current[2]) {
			for (const btn of btns) btn.classList.remove('on');
			btns[2].classList.add('on');
		}
		if (scroll >= pos.current[3]) {
			for (const btn of btns) btn.classList.remove('on');
			btns[3].classList.add('on');
		}
    */

	// pos.current.forEach((pos, idx) => {
	// 	if (scroll >= pos) {
	// 		for (const btn of btns) btn.classList.remove('on');
	// 		btns[idx].classList.add('on');
	// 	}
	// });

	useEffect(() => {
		//새로고침, 마운트 되면 상단 top0, left0으로 강제로 이동, 스무스하게
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);

		//window 객체는 최상위 전역객체이기 때문에 이벤트리스너가 window에 남아있다면, 다른 컴포넌트에도 resize, scroll이 실행된다면 큰 문제가 안될 수 있지만, 보통은 이벤트위임에서 있었던 문제처럼 원치 않은 이벤트가 적용되거나 충돌이 일어날 수 있다.

		//클린업함수
		//clean-up함수 해당 컴포넌트가 언마운트시 실행
		//주로 윈도우 전역객체에 연결된 이벤트함수 제거할때 사용
		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, []);

	return (
		<ul className='scroll_navi' ref={btnRef}>
			{/* num의 갯수대로 빈배열을 임의로 만들면서 반복을 돌린다 */}
			{Array(num.current)
				.fill() // 배열.fill() 용도는 배열에 값을 채우는 메소드
				.map((el, index) => {
					//현재 반복도는 순번이 0번째면 해당 li에 on클래스를 추가
					let isOn = '';
					index === 0 && (isOn = 'on');
					//처음 0index에다가 on을 붙이기만 하면 이후 활성화 함수에서 해당 o을 활성화 된곳으로 이동시킬거기 때문에 0index에 on클래스를 붙이기만 하면됨
					return (
						<li
							key={index}
							className={isOn}
							onClick={() => {
								new Anim(window, {
									prop: 'scroll',
									value: pos.current[index],
									duration: speed.current,
								});
							}}
						></li>
					);

					// return (
					// 	<ul className='scroll_navi' ref={btnRef}>
					// 		{Array(num.current)
					// 			.fill()
					// 			.map((_, idx) => {
					// 				//동적으로 li를 생성시 현재 생성되는 li의 순번이 0일때만 on클래스 추가
					// 				return <li key={idx} className={idx === 0 ? 'on' : ''}></li>;
					// 			})}
					// 	</ul>
					// );
				})}
		</ul>
	);
}

export default Btns;
