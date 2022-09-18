import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider(props) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [accessToken, setAccessToken] = useState('')

	const getLoggedIn = () => {
			axios.get('http://localhost:4242/loggedIn', {withCredentials: true})
			.then((res) => {
				setAccessToken(res.data.accessToken)
				setLoggedIn(res.data.loggedIn)
			})
	}

	useEffect(() => {
		getLoggedIn();
	}, []);


	return (
		<AuthContext.Provider value={{ getLoggedIn, loggedIn, accessToken }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
export { AuthContextProvider };
