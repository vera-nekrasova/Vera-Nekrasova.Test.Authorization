import React, {ChangeEventHandler} from 'react';
import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components';
import { colors as c } from "../../styled-components/colors";

const StyledField = styled.label`
	margin-bottom: 20px;
	display: flex;
	flex-direction: column;
`

const StyledLabel = styled.span`
	font-size: 16px;
	line-height: 19px;
	color: ${c.black};
	margin-bottom: 10px;
`

const StyledInput = styled.input`
	background: ${c.grey};
	border-radius: 8px;
	height: 60px;
	height: 100%;
	padding: 20px;
	font-size: 16px;
	line-height: 19px;
	color: ${c.black};
	border: none;

	&[aria-invalid='true'] {
		border: 1px solid ${c.checkbox};
	}
`
const StyledError = styled.div`
	font-size: 14px;
	line-height: 17px;
	color: #E26F6F;
	margin-top: 8px;
`

interface AddProp {
	label: string;
	name: string;
	errors: any;
	registerName: string;
	type?: string;
	value?: string;
	onChange: ChangeEventHandler;
  }

const Input = React.forwardRef<HTMLInputElement, AddProp>(({ label, name, errors, registerName, ...props }, ref) => {
	return (<>
		<StyledField>
			<StyledLabel>{label}</StyledLabel>
			<StyledInput
				ref={ref}
				name={name}
				{...props}
				aria-invalid={registerName ? "true" : "false"}
			/>
			
			<ErrorMessage errors={errors} name={name}
				render={({ messages }) =>
					messages &&
					Object.entries(messages).map(([type, message]) => (
						<StyledError key={type}>{message}</StyledError>
					)
				)}
			/>
		</StyledField>
	</>
	)
}
);

export default Input