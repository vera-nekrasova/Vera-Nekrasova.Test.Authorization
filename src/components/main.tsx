import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {colors as c} from "../styled-components/colors";

const Main = () => {
	return (
		<>
			<StyledWrap>
				<Link to="/login">
					<StyledBtn>Авторизоваться</StyledBtn>
				</Link>
			</StyledWrap>
		</>
	)
}

const StyledWrap = styled.div`
	width: 100%;
	text-align: center
`

const StyledBtn = styled.button`
	max-width: 250px;
	width: 100%;
	padding: 10px;
	text-align: center;
	margin: 0 auto;
	background: ${c.blueBtn};
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: ${c.white};
    cursor: pointer;
	border: none;
	display: inline-block;
`
export default Main