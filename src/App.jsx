import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import NavBar from './views/navBar/NavigationBar.view';
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

		console.log(
			'App #useEffect localStorageUserLogin >>>',
			localStorageUserLogin
		);
		console.log('App #useEffect userLogin A >>>', userLogin);
		localStorageUserLogin && setUserLogin(localStorageUserLogin);
		console.log('App #useEffect userLogin B >>>', userLogin);
	}, []);

	useEffect(() => {
		localStorage.setItem('userLogin', JSON.stringify(userLogin));
		console.log(
			"App #useEffect localStorage.getItem('userLogin') >>>",
			localStorage.getItem('userLogin')
		);
	}, [userLogin]);

	console.log('App.jsx');
	return (
		<BrowserRouter>
			<AuthContext.Provider value={{ userLogin, setUserLogin }}>
				<NavBar />
			</AuthContext.Provider>
			<main>
				<AppRoutes />
			</main>
		</BrowserRouter>
	);
}

export default App;

