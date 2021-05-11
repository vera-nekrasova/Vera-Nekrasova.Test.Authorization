import React, {FC} from 'react';
import styled from 'styled-components';
import { colors as c, warnBlock as w} from "../../styled-components/colors";

const StyledWrap = styled.div`
	background: ${w.lightRed};
	border: 1px solid ${w.border};
	box-sizing: border-box;
	border-radius: 8px;
	font-size: 14px;
	line-height: 17px;
	padding: 20px;
	display: flex;
	align-items: center;
	position: absolute;
	top: -75px;
	left: 0;
	width: 100%;
`

const StyledPoint = styled.div`
	width: 20px;
	height: 20px;
	display: inline-flex;
	background: ${w.bgPoint};
	color: ${w.point};
	border-radius: 50%;
	align-items: center;
	justify-content: center;
	margin-right: 14px;

`
const StyledText = styled.div`
	color: ${c.black};
`

const WarningBlock:FC<{text:string}> = ({text}) => {
	return (
		<StyledWrap>
			<StyledPoint>!</StyledPoint>
			<StyledText>{text}</StyledText>
		</StyledWrap>
	)
};

export default WarningBlock