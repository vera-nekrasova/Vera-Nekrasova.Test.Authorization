import React, {FC} from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {colors as c} from "../styled-components/colors";

interface AddProp {
	login?: string;
  }

const Account:FC<AddProp> = (props) => {
	return (
		<>
			<StyledAccount>
				<StyledAccText>Здравствуйте,{props.login}</StyledAccText>
				<Link to="/login">
					<StyledAccBtn>Выйти</StyledAccBtn>
				</Link>
			</StyledAccount>
	</>
	)
}

const StyledAccount = styled.div`
	text-align: center;
	color: ${c.black};
`

const StyledAccText = styled.div`
	font-size: 40px;
	line-height: 48px;
	margin-bottom: 50px;
`

const StyledAccBtn = styled.button`
	background: ${c.greyBtn};
	border-radius: 8px;
	text-align: center;
	padding: 19px 70px;
	font-size: 18px;
	line-height: 22px;
	border: none;
	cursor: pointer;
`

export default Account;