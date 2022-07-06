import React, { useState, useEffect } from 'react';
import defaultMiddlewares from '../../middlewares/common/defaultMiddlewares';
import FormAddIngredient from '../../components/layout/forms/formAddIngredient';
const { getAllDocuments } = defaultMiddlewares;

function IngredientsListView() {
	const [ingredients, setIngredients] = useState([]);

	const getAllIngredients = () => {
		const response = getAllDocuments('ingredients').then((json) => {
			if (!json.success) {
				return;
			}
			setIngredients(json.data);
		});

		// const getAllIngredients = () => {
		// 	const method = 'GET';

		// 	const response = fetch(`${apiUrl}/ingredients`, {
		// 		headers,
		// 		method,
		// 	})
		// 		.then((res) => res.json())
		// 		.then((result) => {
		// 			if (!result.success) {
		// 				return;
		// 			}
		// 			const ingredients = result.data.map((ingredient) => {
		// 				const { _id: id, name, density } = ingredient;
		// 				return { id, name, density };
		// 			});
		// 			setIngredients(ingredients);
		// 		});
		// };
	};

	useEffect(() => {
		getAllIngredients();
	}, []);

	return (
		<>
			<h2>INGREDIENTS</h2>
			<FormAddIngredient ingredients={ingredients} />
		</>
	);
}

export default IngredientsListView;
