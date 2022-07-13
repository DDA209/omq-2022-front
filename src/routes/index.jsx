import React, { useContext } from 'react';
import { AuthContext } from '../App';
import { Routes, Route } from 'react-router-dom';

import AdminView from '../views/admin/Admin.view';
import CaculateMenusView from './../views/caculateMenus/CalculateMenus.view';
import HomeView from './../views/home/Home.view';
import IngredientsListView from './../views/ingrdientsList/IngredientLists.view';
import LoginView from '../views/user/Login.view';

function AppRoutes() {
	const { userLogin } = useContext(AuthContext);
	const { isAdmin, isLogged } = userLogin;
	console.log('APPROUTES useContext(AuthContext)', useContext(AuthContext));
	console.log('APPROUTES isLogged', isLogged);

	return (
		<Routes>
			<Route exact path="/" element={<HomeView />} />
			<Route path="/ingredients" element={<IngredientsListView />} />
			<Route path="/menus" element={<CaculateMenusView />} />
			<Route
				path="/login_register"
				element={
					!isLogged ? <LoginView formStep={null} /> : <HomeView />
				}
			/>
			<Route
				path="/register"
				element={
					!isLogged ? <LoginView formStep="register" /> : <HomeView />
				}
			/>
			<Route
				exact
				path="/login"
				element={
					!isLogged ? <LoginView formStep="login" /> : <HomeView />
				}
			/>

			{isAdmin ? (
				<>
					<Route
						path="/admin/manage_ingredients"
						element={<AdminView views={['manageIngredients']} />}
					/>
					<Route
						path="/admin/manage_recipes"
						element={<AdminView views={['manageRecipes']} />}
					/>
					<Route
						path="/admin/manage_users"
						element={<AdminView views={['manageUsers']} />}
					/>
					<Route
						path="/admin/*"
						element={<AdminView views={null} />}
					/>
				</>
			) : (
				<Route path="/admin/*" element={<HomeView />} />
			)}
		</Routes>
	);
}

export default AppRoutes;
