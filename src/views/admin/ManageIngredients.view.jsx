import React, { useState, useEffect } from 'react';
import FormManageIngredients from '../../components/layout/forms/FormManageIngredients';
import params from '../../../params';
const { headers, apiUrl } = params;
import defaultMiddlewares from '../../middlewares/common/defaultMiddlewares';
const { postDocument, getAllDocuments, putDocument, destroyDocument } =
	defaultMiddlewares;

function ManageIngredients() {
	const [ingredientsAll, setIngredientsAll] = useState([]);
	const [ingredientNew, setIngredientNew] = useState({
		name: '',
		volumicMass: 0,
	});

	useEffect(() => {
		getAllIngredients();
	}, []);

	const getAllIngredients = async () => {
		const response = await getAllDocuments('ingredients');
		if (!response.success) {
			return;
		}
		const ingredients = response.data.map((ingredient) => {
			const { _id: id, name, volumicMass } = ingredient;
			return { id, name, volumicMass };
		});
		setIngredientsAll(ingredients);
	};

	const handleChange = (index) => (event) => {
		index >= 0
			? setIngredientsAll(
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
			: setIngredientNew(() => {
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

	const createIngredient = async () => {
		const { name, volumicMass } = ingredientNew;
		const body = { name, volumicMass };
		const response = await postDocument('ingredients/ingredient', body);
		if (!response.success) {
			console.log('ERROR creating ingredient', response.data);
			return;
		}
		setIngredientNew({
			name: '',
			volumicMass: 0,
		});
		getAllIngredients();
	};

	const modifyIngredient = async (id, index) => {
		const { name, volumicMass } = ingredientsAll[index];
		const body = { name, volumicMass };
		const response = await putDocument('ingredients/ingredient', id, body);
		if (!response.success) {
			console.log('ERROR modify ingredient', response.data);
			return;
		}
		getAllIngredients();
	};

	const destroyIngredient = async (id, index) => {
		const response = await destroyDocument(
			'ingredients/destroy/ingredient',
			id
		);
		if (!response.success) {
			console.log('ERROR destroying ingredient', response.data);
			return;
		}
		getAllIngredients();
	};

	return (
		<>
			<FormManageIngredients
				ingredient={ingredientNew}
				handleChange={handleChange}
				createIngredient={createIngredient}
				usage={'create'}
			/>
			{ingredientsAll.map((ingredient, index) => {
				return (
					<FormManageIngredients
						key={index}
						ingredient={ingredient}
						index={index}
						handleChange={handleChange}
						modifyIngredient={modifyIngredient}
						destroyIngredient={destroyIngredient}
						usage={'manage'}
					/>
				);
			})}
		</>
	);
}

export default ManageIngredients;
