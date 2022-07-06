import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import NavBar from './views/navBar/navBar.view';
import AppRoutes from './routes';

import './App.css';

function App() {
	console.log('App.jsx');
	return (
		<>
			<BrowserRouter>
				<NavBar />
				<main>
					<AppRoutes />
				</main>
			</BrowserRouter>
		</>
	);
}

export default App;

