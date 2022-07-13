import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import NavBar from './views/navBar/NavBar.view';
import AppRoutes from './routes';

import './App.css';

export const AuthContext = createContext({});

function App() {
	const [userLogin, setUserLogin] = useState({
		isLogged: false,
		isAdmin: false,
	});

	useEffect(() => {
		const localStorageUserLogin = JSON.parse(
			localStorage.getItem('userLogin')
		);

		localStorageUserLogin && setUserLogin(localStorageUserLogin);
	}, []);

	useEffect(() => {
		localStorage.setItem('userLogin', JSON.stringify(userLogin));
	}, [userLogin]);

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

