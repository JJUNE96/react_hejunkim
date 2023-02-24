import { useRef, useEffect, useCallback } from 'react';
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
	const getPos = useCallback(() => {
		pos.current = [];

		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (let el of secs) pos.current.push(el.offsetTop);

		setPos(pos.current);
	}, [setPos]);

	const activation = useCallback(() => {
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
	}, [setScrolled]);
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
	}, [getPos, activation]);
	//getPos,activation을 그냥 의존성 배열에 등록하면 내부적으로 무한루프에 빠지지만
	//해당 함수를 useCallback으로 메모이제이션 처리해서 반복호출되지 않아서 무한루프 문제 해결

	//eslint가 의존성 배열에 getPos, activation을 등록하라고 권고문구를 띄우는 이유
	//useEffect 내부에서 getPos, activation이라는 외부함수를 사용하고 있으므로 리액트 입장에서는 해당함수가 바뀔수도 있을때를 대비해서 의존성 배열에 등록하라고 권고
	//이때 getPos, activation을 의존성 배열에 등록하면 해당 컴포넌트가 업데이트 될때마다 같은 함수임에도 불구하고 getPos, activation을 계속해서 읽게 되므로 불필요한 리소스가 낭비됨
	//추후 useCallback을 이용해서 해당 getPos, activation함수를 미리 메모이제이션 (메모리에 강제로 특정 값을 할당해서 저장처리)해서 컴포넌트가 재 랜더링 되더라도 미리 메모이제이션 처리한 함수를 재사용 (추후 useMemo, useCallback에서 자세하게 다룰 내용)

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
