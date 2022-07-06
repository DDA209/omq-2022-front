import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminView from '../views/admin/Admin.view';
import CaculateMenusView from './../views/caculateMenus/CalculateMenus.view';
import HomeView from './../views/home/Home.view';
import IngredientsListView from './../views/ingrdientsList/IngredientLists.view';

function AppRoutes() {
	return (
		<Routes>
			<Route exact path="/" element={<HomeView />} />
			<Route path="/ingredients" element={<IngredientsListView />} />
			<Route path="/menus" element={<CaculateMenusView />} />
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
			<Route path="/admin/*" element={<AdminView views={null} />} />
		</Routes>
	);
}

export default AppRoutes;
