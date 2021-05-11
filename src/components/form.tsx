import React, { useEffect, FC } from 'react';
import { useForm } from "react-hook-form";
import Input from "./components_form/input";
import WarningBlock from "./components_form/warningBlock";
import styled from 'styled-components';
import { Redirect } from "react-router-dom";
import { colors as c} from "../styled-components/colors";

interface AddProp {
	getLogin: Function;
}

type FormData = {
	login: any,
	password: any,
};

const Form:FC<AddProp> = (props) => {
	const [login, setLogin] = React.useState<string>('');
	const [password, setPassword] = React.useState<any>('');
	const [rememberMe, setRememberMe] = React.useState<any>(false);
	const [noUser, setNoUser] = React.useState<boolean>(false);
	const [wrongPassword, setWrongPassword] = React.useState<boolean>(false);

	//т.к. мне не удалось корректно подписаться на события isSubmitting, isSubmitSuccessful,
	//a isSubmitted срабатывало не всегда, то установила свои state для отключения кнопки отправки формы
	//и перехода на страницу личного кабинета
	const [disBtnLogin, setDisBtn] = React.useState<boolean>(false);
	const [redirect, setRedirect] = React.useState<boolean>(false);

	useEffect(() => {
		const rememberMe = localStorage.getItem('rememberMe');
		const savedPassword = rememberMe ? localStorage.getItem('password') : '';
		setPassword(savedPassword);
		(rememberMe === null || rememberMe === 'false') ? setRememberMe(false) : setRememberMe(true);
	}, []);

	const { register, formState: { errors }, handleSubmit, reset } = useForm<FormData>({
		criteriaMode: "all",
		mode: 'onSubmit',
		reValidateMode: 'onBlur',
	});

	const onSubmit = (param:FormData) => {
		localStorage.setItem('rememberMe', rememberMe);
		localStorage.setItem('password', rememberMe ? password : '');
		setDisBtn(true);

		setTimeout(() => { //задержка, чтобы были видно disable кнопки
			getData('http://localhost:8000/users')
				.then((data) => {
					for (let i = 0; i < data.length; i++) {
						if (data[i].login === login && data[i].password === password) {
							setRedirect(true);
							reset();
							setDisBtn(!redirect);
							props.getLogin(login);
							return true
						}
						if (data[i].login === login && data[i].password !== password) {
							setWrongPassword(true);
							return true
						}
					}
					setNoUser(true);
				})
		}, 800)
	}
	
	return (
		<>
		<StyledFormWrap onSubmit={handleSubmit(onSubmit)}>
				{noUser ? <WarningBlock text={`Пользователя ${login} не существует`} /> : ''}
				{wrongPassword ? <WarningBlock text="Неверный пароль" /> : ''}
				<Input
					{...register("login", {
						required: 'Обязательное поле',
						pattern: {
							value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
							message: "Проверьте корректность email адреса",
						}
					})}
					name="login"
					type="text"
					label="Логин"
					errors={errors}
					registerName={errors.login}
					value={login}
					onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
						setLogin(e.target.value);
						setNoUser(false);
						setDisBtn(false);
					}}

				/>
				<Input
					{...register("password", {
						required: 'Обязательное поле',
						minLength: {
							value: 8,
							message: "Пароль должен быть не менее 7 символов"
						},
						maxLength: {
							value: 18,
							message: "Пароль должен быть не более 18 символов"
						}
					})}
					name="password"
					type="password"
					label="Пароль"
					errors={errors}
					registerName={errors.password}
					value={password}
					onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
						setPassword(e.target.value);
						setWrongPassword(false);
						setDisBtn(false);
					}}
				/>

				<StyledLabel>
					<StyledCheckHide
						className='form__check-rememb_hide'
						name="rememberMe"
						checked={rememberMe}
						onChange={() => { rememberMe ? setRememberMe(false) : setRememberMe(true) }}
						type="checkbox" />
					<StyledCheckbox></StyledCheckbox>
					<StyledCheckText>Запомнить пароль</StyledCheckText>
				</StyledLabel>
				
				<StyledSbmt type="submit" disabled={disBtnLogin}>Войти</StyledSbmt>
				
				{redirect ? <Redirect to="/profile" /> : ''}
			</StyledFormWrap>
	</>
	)
}

async function getData(url = '') {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await response.json()
}


const StyledFormWrap = styled.form`
	display: flex;
	flex-direction: column;
	max-width: 640px;
	margin: 0 auto;
	position: relative;
`

const StyledSbmt = styled.button`
	height: 60px;
	background: ${c.blueBtn};
	border-radius: 8px;
	width: 100%;
	font-weight: bold;
	font-size: 18px;
	line-height: 22px;
	color: ${c.white};
	cursor: pointer;
	border: none;

	&:disabled {
		background: ${c.disableBlueBtn};
	}
`

const StyledLabel = styled.label`
	display: flex;
	margin-bottom: 30px;
	align-items: center;
	cursor: pointer;
`

const StyledCheckbox = styled.span`
	width: 20px;
	height: 20px;
	margin-right: 14px;
	display: block;
	line-height: 21px;
	position: relative;
	border: 1px solid ${c.black};
	box-sizing: border-box;
	border-radius: 4px;

	&::after {
		position: absolute;
		content: "";
		width: 14px;
		height: 14px;
		top: 2px;
		left: 2px;
		transition: all 0.1s linear 0s;
		border-radius: 2px;
	}
`

const StyledCheckHide = styled.input`
	display: none;
				
	&:checked~${StyledCheckbox}::after {
		background:${c.checkboxTrue};
	}
`

const StyledCheckText = styled.span`
	font-size: 16px;
	line-height: 19px;
	color: #000;
`

export default Form;