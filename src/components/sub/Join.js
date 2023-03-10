import Layout from '../common/Layout';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

function Join() {
	const history = useHistory();
	// 회원가입 완료시 메인페이지로 이동시킴
	const initVal = {
		username: '',
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		gender: false,
		log: false,
		comments: '',
		edu: '',
	};

	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	//const [Submit, setSubmit] = useState(false);
	const Submit = useRef(false);
	//Submit버튼을 클릭했는지 확인하는 Submit정보를 기존처럼 State로 처리하면
	//아래 useEffect에 의존성 배열로 등록을 해야되고 의존성 배열 등록시 처음 컴포넌트 마운트시에 호출되며 전송버튼 클릭전에 회원가입 성공 경고창이 뜸
	//해당 문제를 막기 위해 submit을 의존성 배열에 등록하지 않아도 되도록 useRef로 값지정
	/*
	매개변수(parameter) 특정값을 함수 내부로 전달해주는 통로명
	인수(argument) 해당 통로를 통해서 전달되는 값
	*/

	//3.인증 체크함수
	const check = (value) => {
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*)]/;

		if (value.username.length < 2) {
			errs.username = 'Please enter a name with at least 2 characters';
		}
		if (value.userid.length < 5) {
			errs.userid = 'Please enter a id with at least 5 characters';
		}
		if (
			value.pwd1.length < 5 ||
			!eng.test(value.pwd1) ||
			!num.test(value.pwd1) ||
			!spc.test(value.pwd1)
		) {
			errs.pwd1 =
				'Your password must be at least 5 characters long and include a combination of uppercase and lowercase letters, numbers, and special characters';
		}
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = 'Please enter the same password twice';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email =
				'Your email should be at least 8 characters long and include the @ symbol';
		}
		if (!value.gender) {
			errs.gender = 'Select your gender';
		}
		if (!value.log) {
			errs.log = 'Select one or more';
		}
		if (value.comments.length < 20) {
			errs.comments = 'Select your highest education level';
		}
		if (value.edu === '') {
			errs.edu = 'Please enter at least 20 characters';
		}
		return errs;
	};

	//인풋 요소에 변화가 생길때마다 Val state 업데이트 함수
	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	//라디오버튼 체크시 Val state 업데이트 함수
	const handleRadio = (e) => {
		const { name } = e.target;
		const isChecked = e.target.checked;
		setVal({ ...Val, [name]: isChecked });
	};

	//체크박스 체크시 Val state 업데이트 함수
	const handleCheck = (e) => {
		const { name } = e.target;
		let isChecked = false;
		const inputs = e.target.parentElement.querySelectorAll('input');

		//모든 체크박스를 반복을 돌면서 하나라도 체크된게 있으면 true값으로 변경후 리턴
		inputs.forEach((el) => el.checked && (isChecked = true));
		setVal({ ...Val, [name]: isChecked });
	};

	//select요소 선택시 Val state 업데이트 함수
	const handleSelect = (e) => {
		const { name } = e.target;
		const selected = e.target.value;
		setVal({ ...Val, [name]: selected });
	};

	//1.전송 버튼 클릭시 인증 체크호출하고 에러메세지 생성 함수
	const handleSubmit = (e) => {
		e.preventDefault();
		//2 체크함수 호출
		setErr(check(Val));
	};

	//4
	useEffect(() => {
		//Object.keys(객체) : 해당객체의 property만 뽑아서 배열로 반환
		const len = Object.keys(Err).length;
		if (len === 0 && Submit.current) {
			alert('모든 인증을 통과했습니다.');
			history.push('/');
		}
	}, [Err, history]);

	return (
		<Layout name={'Join'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table>
						<tbody>
							{/* user name */}
							<tr>
								<th scope='row'>
									<label htmlFor='username'>Name</label>
								</th>
								<td>
									<input
										type='text'
										name='username'
										id='username'
										placeholder='Enter your name.'
										onChange={handleChange}
										value={Val.username}
									/>
									<span className='err'>{Err.username}</span>
								</td>
							</tr>

							{/* user id */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>Id</label>
								</th>
								<td>
									<input
										type='text'
										name='userid'
										id='userid'
										placeholder='Enter your id.'
										onChange={handleChange}
										value={Val.userid}
									/>
									<span className='err'>{Err.userid}</span>
								</td>
							</tr>

							{/* passowrd */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>Password</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										placeholder='Enter your password.'
										onChange={handleChange}
										value={Val.pwd1}
									/>
									<span className='err'>{Err.pwd1}</span>
								</td>
							</tr>

							{/* re passowrd */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>Password Check</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										placeholder='Enter your password again.'
										onChange={handleChange}
										value={Val.pwd2}
									/>
									<span className='err'>{Err.pwd2}</span>
								</td>
							</tr>

							{/* email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>E-mail</label>
								</th>
								<td>
									<input
										type='text'
										name='email'
										id='email'
										placeholder='Enter your email.'
										onChange={handleChange}
										value={Val.email}
									/>
									<span className='err'>{Err.email}</span>
								</td>
							</tr>

							{/* gender */}
							<tr>
								<th scope='row'>Gender</th>
								<td>
									<label htmlFor='male'>Male</label>
									<input
										type='radio'
										name='gender'
										value='male'
										id='male'
										onChange={handleRadio}
									/>

									<label htmlFor='female'>Female</label>
									<input
										type='radio'
										name='gender'
										value='female'
										id='female'
										onChange={handleRadio}
									/>
									<span className='err'>{Err.gender}</span>
								</td>
							</tr>

							{/* log */}
							<tr>
								<th scope='row'>Sign-up Method</th>
								<td>
									<label htmlFor='internet'>Internet</label>
									<input
										type='checkbox'
										id='internet'
										value='internet'
										name='log'
										onChange={handleCheck}
									/>

									<label htmlFor='friend'>Friends</label>

									<input
										type='checkbox'
										id='friend'
										value='friend'
										name='log'
										onChange={handleCheck}
									/>

									<label htmlFor='advertisement'>Advertisement</label>

									<input
										type='checkbox'
										id='advertisement'
										value='advertisement'
										name='log'
										onChange={handleCheck}
									/>

									<label htmlFor='etc'>Etc</label>

									<input
										type='checkbox'
										id='etc'
										value='etc'
										name='log'
										onChange={handleCheck}
									/>
									<span className='err'>{Err.log}</span>
								</td>
							</tr>

							{/* edu */}
							<tr>
								<th scope='row'>
									<label htmlFor='edu'>Education</label>
								</th>
								<td>
									<select name='edu' id='edu' onChange={handleSelect}>
										<option value=''>Select your education level</option>
										<option value='elementary-school'>Elementary school</option>
										<option value='middle-school'>Middle school</option>
										<option value='high-school'>High school</option>
										<option value='college'>University</option>
									</select>
									<span className='err'>{Err.edu}</span>
								</td>
							</tr>
							{/* comments */}
							<tr>
								<th scope='row'>
									<label htmlFor='comments'>Comments</label>
								</th>
								<td>
									<textarea
										name='comments'
										id='comments'
										cols='30'
										rows='5'
										placeholder='leave a message.'
										onChange={handleChange}
										value={Val.comments}
									></textarea>
									<span className='err'>{Err.comments}</span>
								</td>
							</tr>

							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									{/* <input type='reset' value='cancel' onClick={() => setVal(initVal)} /> */}
									<input
										type='submit'
										value='Create an account'
										onClick={() => (Submit.current = true)}
									/>
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Join;
