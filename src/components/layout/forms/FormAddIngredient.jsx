import React, { useState } from 'react';
import './forms.css';

function FormAddIngredient(props) {
	const [ingredientName, setIngredientName] = useState();
	const [ingredientQuantity, setIngredientQuantity] = useState();

	const submitIngredient = () => {
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
			event.target.value
		);
		console.log(
			'components forms formAddIngredient JSX #handleChange event.target.name >>>',
			event.target.name
		);
		switch (event.target.name) {
			case 'ingredientName':
				setIngredientName(event.target.value);
				break;
			case 'ingredientQuantity':
				setIngredientQuantity(event.target.value);
				break;

			default:
				break;
		}
	};

	return (
		<>
			<form onSubmit={submitIngredient}>
				<label htmlFor="ingredientNameList">
					Name:
					<select
						id="ingredientNameList"
						name="ingredientName"
						type="text"
						onChange={handleChange}
					>
						{' '}
						<option key="0" value=""></option>
						{props.ingredients.map((ingredient, index) => {
							return (
								<option key={index} value={ingredient.name}>
									{ingredient.name}
								</option>
							);
						})}
					</select>
				</label>
				<label htmlFor="ingredientQuantity">
					Quantity:
					<input
						id="ingredientQuantity"
						name="ingredientQuantity"
						type="number"
						min="0"
						max="100"
						step="0.001"
						size="50"
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
