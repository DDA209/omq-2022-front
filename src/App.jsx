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
		console.log(
			"useEffect[] localStorage.getItem('userLogin') B",
			localStorage.getItem('userLogin')
		);
		const localStorageUserLogin = JSON.parse(
			localStorage.getItem('userLogin')
		);
		localStorageUserLogin && setUserLogin(localStorageUserLogin);
		console.log(
			"useEffect[] localStorage.getItem('userLogin') B",
			localStorage.getItem('userLogin')
		);
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
				<AuthContext.Provider value={userLogin.isAdmin}>
					<AppRoutes />
				</AuthContext.Provider>
			</main>
		</BrowserRouter>
	);
}

export default App;

