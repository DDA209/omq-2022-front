import React, { createContext, useState, useEffect, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';

import NavBar from './views/navBar/NavBar.view';
import AppRoutes from './routes';

import './App.css';

export const AuthContext = createContext({});

function App() {
	const [userLogin, setUserLogin] = useState({
		userId: '',
		userEmail: '',
		isLogged: false,
		isAdmin: false,
	});

	useEffect(() => {
		const localStorageUserLogin = JSON.parse(
			localStorage.getItem('userLogin')
		);
		if (localStorageUserLogin) {
			setUserLogin(localStorageUserLogin);
		} else {
			localStorage.setItem(
				'userLogin',
				JSON.stringify({
					userId: '',
					userEmail: '',
					isLogged: false,
					isAdmin: false,
				})
			);
		}
	}, []);

	return (
		<BrowserRouter>
			<AuthContext.Provider value={{ userLogin, setUserLogin }}>
				<NavBar />
			</AuthContext.Provider>
			<main>
				<AuthContext.Provider value={{ userLogin, setUserLogin }}>
					<AppRoutes />
				</AuthContext.Provider>
			</main>
		</BrowserRouter>
	);
}

export default App;

