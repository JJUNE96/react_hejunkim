import { useRef, useEffect, useCallback } from 'react';
import Anim from '../../asset/Anime';
function Btns({ setScrolled, setPos }) {
	const btnRef = useRef(null);
	const pos = useRef({});
	const num = useRef(4); //li갯수
	const speed = useRef(500); //속도

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

	useEffect(() => {
		//새로고침, 마운트 되면 상단 top0, left0으로 강제로 이동, 스무스하게
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);

		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, [getPos, activation]);

	return (
		<ul className='scroll_navi' ref={btnRef}>
			{Array(num.current)
				.fill() // 배열.fill() 용도는 배열에 값을 채우는 메소드
				.map((el, index) => {
					let isOn = '';
					index === 0 && (isOn = 'on');

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
				})}
		</ul>
	);
}

export default Btns;
