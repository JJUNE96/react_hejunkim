import Header from '../common/Header';
import Vids from './Vids';
import Joy from './Joy';
import Pics from './Pics';
import Visual from './Visual';
import News from './News';
import Btns from './Btns';
import { useState } from 'react';
/*
서로 독립적인 Btns 와 News컴포넌트 구조에서
Btns에서 만들어지는 scroll값을 형제 컴포넌트인 News에 전달하는법

순서1 - 부모컴포넌트에 전달될 값이 매개체로 담길 state생성
순서2 - Btns에 state변경함수를 전달해서 Btns 내부적으로 만들어지는 값을 부모 state에 저장
순서3-그렇게 저장된 state값을 다시 자식인 News컴포넌트에 전달
*/
//rfce
function Main(props) {
	const [Scrolled, setScrolled] = useState(0);
	const [Pos, setPos] = useState([]);

	return (
		<main>
			{/* 특정 값을 직계자식이 아닌 자손 컴포넌트에 전달하기 위해 불필요하게 중간 컴포넌트에 props를 전달 : prop drilling */}
			<Header type={'main'} menu={props.menu} />
			<Visual />

			<News Scrolled={Scrolled} Pos={Pos[1]} />

			<Pics />
			<Joy />
			<Vids />
			{/* setScrolled state변경함수를 Btns 컴포넌트 전달 */}
			<Btns setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}

export default Main;
