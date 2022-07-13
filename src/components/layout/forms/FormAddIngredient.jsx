import React, { useState, useEffect } from 'react';
import './forms.css';

function FormAddIngredient(props) {
	const [ingredientName, setIngredientName] = useState();
	const [ingredientQuantity, setIngredientQuantity] = useState();
	const [quantityStep, setQuantityStep] = useState(0.001);

	useEffect(() => {
		console.log('cmpt/layout/forms/formAddIngredient #useEffect');
		switch (true) {
			case ingredientQuantity < 1:
				setQuantityStep(0.001);
				break;
			case ingredientQuantity < 1 && ingredientQuantity >= 0.1:
				setQuantityStep(0.01);
				break;
			case ingredientQuantity < 10 && ingredientQuantity >= 1:
				setQuantityStep(0.1);
				break;
			case ingredientQuantity < 100 && ingredientQuantity >= 10:
				setQuantityStep(0.1);
				break;
			case ingredientQuantity >= 100:
				setQuantityStep(1);
				break;
			default:
				break;
		}
	}, [ingredientQuantity]);

	const submitIngredient = (event) => {
		event.preventDefault();
		console.log(
			'components forms formAddIngredient JSX #submitIngredient ingredientName : ingredientQuantity >>>',
			ingredientName,
			':',
			ingredientQuantity
		);
	};

	const handleChange = (event) => {
		console.log(
			'components forms formAddIngredient JSX #handleChange event.target.value >>>',
			event.target.value,
			'=',
			event.target.name
		);
		switch (event.target.name) {
			case 'ingredientName':
				setIngredientName(event.target.value);
				break;
			case 'ingredientQuantity':
				console.log('CHANGE QUANTITY');
				setIngredientQuantity(event.target.value);
		}
	};

	return (
		<>
			<form onSubmit={submitIngredient}>
				<label htmlFor="ingredient-name">
					Name:
					<select
						id="ingredient-name"
						className="ingredient-name"
						name="ingredient-name"
						type="text"
						onChange={handleChange}
					>
						<option value=""></option>
						{props.ingredients.map((ingredient, index) => {
							return (
								<option key={index} value={ingredient.name}>
									{ingredient.name}
								</option>
							);
						})}
					</select>
				</label>
				<label htmlFor="ingredient-quantity">
					Quantity:
					<input
						id="ingredient-quantity"
						className="ingredient-quantity"
						name="ingredient-quantity"
						type="number"
						min="0"
						max="10000"
						step={quantityStep || '0.1'}
						onChange={handleChange}
					/>
					kg
				</label>
				<button type="submit">Add</button>{' '}
			</form>
		</>
	);
}

export default FormAddIngredient;
