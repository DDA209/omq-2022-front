import React, { useState, useEffect, useContext } from 'react';
import defaultMiddlewares from '../../middlewares/common/defaultMiddlewares';
import FormUserIngredient from '../../components/layout/forms/FormUserIngredient';
import Cards from '../../components/layout/cards/Cards';
import getUserIngredients from '../../middlewares/getUserIngredients';
import { AuthContext } from '../../App';

import './ingredientsList.css';
const { getAllDocuments, postDocument } = defaultMiddlewares;

function IngredientsListView() {
	const [ingredientNew, setIngredientNew] = useState({
		indredientName: '',
		ingredientId: '',
		quantity: null,
	});
	const [ingredients, setIngredients] = useState([]); // list
	const [userIngredients, setUserIngredients] = useState(null); //

	const { userLogin } = useContext(AuthContext);

	const getAllIngredients = () => {
		getAllDocuments('ingredients').then((json) => {
			if (!json.success) {
				console.log('ERROR in getAllIngredients', json.data);
				return;
			}
			setIngredients(json.data);
		});
	};

	const getUserAllIngredients = async () => {
		if (userLogin) {
			await getUserIngredients(userLogin.userId).then((json) => {
				if (!json.success) {
					return;
				}
				setUserIngredients(json.data);
			});
		}
	};

	const postUserIngredient = async (event) => {
		event.preventDefault();

		const user = userLogin.userId;
		const ingredient = event.target[0].value;
		const quantity = event.target[1].value;
		const body = { user, ingredient, quantity };
		if (userLogin) {
			await postDocument('userIngredients/userIngredient', body).then(
				(json) => {
					if (!json.success) {
						return;
					}
					getUserAllIngredients();
				}
			);
		}
	};

	useEffect(() => {
		getAllIngredients();
		getUserAllIngredients();
	}, []);

	return (
		<>
			<h2>INGREDIENTS</h2>
			<FormUserIngredient
				ingredients={ingredients}
				submitIngredient={postUserIngredient}
			/>
			{!userIngredients || userIngredients.length < 1 ? (
				<span>Add all ingredients you have</span>
			) : (
				<div className="user-ingredients">
					<Cards datas={userIngredients} usage="userIngredients" />
				</div>
			)}
		</>
	);
}

export default IngredientsListView;
