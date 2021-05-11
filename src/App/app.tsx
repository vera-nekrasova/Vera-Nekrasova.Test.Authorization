import React from 'react';
import Account from "../components/account";
import Header from '../components/header';
import Main from '../components/main';
import Form from "../components/form";
import styled from 'styled-components';
import {BrowserRouter as Router,
		Switch,
		Route
  } from "react-router-dom";

const App = () => {
	const [login, setLogin] = React.useState<string>('');
	const getLogin = (value:"string") => {
		setLogin(value);
	}

	return (
		<>
			<Router>
				<Header/>
				<StyledWrapper>
					<Switch>
						<Route exact path="/" component={Main}/>
						<Route exact path="/login">
							<Form getLogin={getLogin}/>
						</Route>
						<Route path="/profile">
							<Account login={login}/>
						</Route>
					</Switch>
				</StyledWrapper>
			</Router>
	</>
	)
}

const StyledWrapper = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 40px;
`

export default App