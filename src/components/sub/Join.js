import Layout from '../common/Layout';

function Join() {
	return (
		<Layout name={'Join / 회원가입'}>
			<form>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table>
						<tbody>
							{/* user id */}
							<tr>
								<th scope='row'>
									<label htmlFor='useid'>User Id</label>
								</th>
								<td>
									<input
										type='text'
										name='useid'
										id='useid'
										placeholder='id를 입력하세요'
									/>
								</td>
							</tr>
							{/* password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>Password</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										placeholder='비밀번호를 입력하세요'
									/>
								</td>
							</tr>

							{/* re password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>Re-Password</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										placeholder='비밀번호를 재입력하세요'
									/>
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
										placeholder='email주소를 입력해주세요'
									/>
								</td>
							</tr>

							{/* btnSet */}
							<tr>
								<th colspan='2'>
									<input type='reset' value='cancel' />
									<input type='submit' value='send' />
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
