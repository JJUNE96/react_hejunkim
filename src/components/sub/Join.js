import Layout from '../common/Layout';
import { useState, useEffect } from 'react';

function Join() {
	const initVal = {
		username: '',
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
	};

	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	const [Submit, setSubmit] = useState(false);

	//인증 체크함수
	const check = (value) => {
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*)]/;

		if (value.username.length < 2) {
			errs.username = '이름을 2글자 이상 입력하세요';
		}
		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		if (
			value.pwd1.length < 5 ||
			!eng.test(value.pwd1) ||
			!num.test(value.pwd1) ||
			!spc.test(value.pwd1)
		) {
			errs.pwd1 = '비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요';
		}
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email = '이메일은 8글자 이상 @를 포함하세요';
		}
		return errs;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErr(check(Val));
	};

	useEffect(() => {
		console.log(Err);
		const len = Object.keys(Err).length;
		if (len === 0 && Submit) {
			alert('모든 인증을 통과했습니다.');
			setVal(initVal);
		}
	}, [Err]);

	return (
		<Layout name={'Join / 회원가입'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table>
						<tbody>
							{/* user name */}
							<tr>
								<th scope='row'>
									<label htmlFor='username'>이름</label>
								</th>
								<td>
									<input
										type='text'
										name='username'
										id='username'
										placeholder='이름을 입력하세요.'
										onChange={handleChange}
										value={Val.username}
									/>
									<span className='err'>{Err.username}</span>
								</td>
							</tr>
							{/* user id */}

							<tr>
								<th scope='row'>
									<label htmlFor='userid'>아이디</label>
								</th>
								<td>
									<input
										type='text'
										name='userid'
										id='userid'
										placeholder='아이디를 입력하세요.'
										onChange={handleChange}
										value={Val.userid}
									/>
									<span className='err'>{Err.userid}</span>
								</td>
							</tr>

							{/* passowrd */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>비밀번호</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										placeholder='비밀번호를 입력하세요.'
										onChange={handleChange}
										value={Val.pwd1}
									/>
									<span className='err'>{Err.pwd1}</span>
								</td>
							</tr>

							{/* re passowrd */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>비밀번호 재확인</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										placeholder='비밀번호를 재입력하세요.'
										onChange={handleChange}
										value={Val.pwd2}
									/>
									<span className='err'>{Err.pwd2}</span>
								</td>
							</tr>

							{/* email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>이메일</label>
								</th>
								<td>
									<input
										type='text'
										name='email'
										id='email'
										placeholder='이메일 주소를 입력하세요.'
										onChange={handleChange}
										value={Val.email}
									/>
									<span className='err'>{Err.email}</span>
								</td>
							</tr>

							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									{/* <input type='reset' value='cancel' onClick={() => setVal(initVal)} /> */}
									<input
										type='submit'
										value='Create an account'
										onClick={() => setSubmit(true)}
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
