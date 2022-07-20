import React, { useState, useEffect } from 'react';
import FormManageRecipes from '../../components/layout/forms/FormManageRecipes';
import params from '../../../params';
const { headers, apiUrl } = params;
import defaultMiddlewares from '../../middlewares/common/defaultMiddlewares';
const { postDocument, getAllDocuments, putDocument, destroyDocument } =
	defaultMiddlewares;

function ManageRecipesView() {
	const [ingredientsAll, setRecipessAll] = useState([]);
	const [ingredientNew, setRecipesNew] = useState({
		name: '',
		volumicMass: 0,
	});

	useEffect(() => {
		getAllRecipess();
	}, []);

	const getAllRecipess = async () => {
		const response = await getAllDocuments('ingredients');
		if (!response.success) {
			return;
		}
		const ingredients = response.data.map((ingredient) => {
			const { _id: id, name, volumicMass } = ingredient;
			return { id, name, volumicMass };
		});
		setRecipessAll(ingredients);
	};

	const handleChange = (index) => (event) => {
		index >= 0
			? setRecipessAll(
					ingredientsAll.map((ingredient, idx) => {
						if (index === idx) {
							switch (event.target.name) {
								case 'ingredient-name':
									ingredient.name = event.target.value;
									break;
								case 'ingredient-volumic-mass':
									ingredient.volumicMass = event.target.value;
									break;

								default:
									break;
							}
						}
						return ingredient;
					})
			  )
			: setRecipesNew(() => {
					let ingredient = { ...ingredientNew };

					switch (event.target.name) {
						case 'ingredient-name':
							ingredient.name = event.target.value;
							break;

						case 'ingredient-volumic-mass':
							ingredient.volumicMass = event.target.value;
							break;

						default:
							break;
					}
					return ingredient;
			  });
	};

	const createRecipe = async () => {
		const { name, volumicMass } = ingredientNew;
		const body = { name, volumicMass };
		const response = await postDocument('ingredients/ingredient', body);
		if (!response.success) {
			console.log('ERROR creating ingredient', response.data);
			return;
		}
		setRecipesNew({
			name: '',
			volumicMass: 0,
		});
		getAllRecipess();
	};

	const modifyRecipe = async (id, index) => {
		const { name, volumicMass } = ingredientsAll[index];
		const body = { name, volumicMass };
		const response = await putDocument('ingredients/ingredient', id, body);
		if (!response.success) {
			console.log('ERROR modify ingredient', response.data);
			return;
		}
		getAllRecipess();
	};

	const destroyRecipe = async (id) => {
		const response = await destroyDocument(
			'ingredients/destroy/ingredient',
			id
		);
		if (!response.success) {
			console.log('ERROR destroying ingredient', response.data);
			return;
		}
		getAllRecipess();
	};

	return (
		<>
			<FormManageRecipes
				ingredient={ingredientNew}
				handleChange={handleChange}
				createRecipe={createRecipe}
				usage={'create'}
			/>
			{ingredientsAll.map((ingredient, index) => {
				return (
					<FormManageRecipes
						key={index}
						ingredient={ingredient}
						index={index}
						handleChange={handleChange}
						modifyRecipe={modifyRecipe}
						destroyRecipe={destroyRecipe}
						usage={'manage'}
					/>
				);
			})}
		</>
	);
}

export default ManageRecipesView;
