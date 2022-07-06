import React, { useState } from 'react';
import './forms.css';

function FormUserIdentificatiopn(props) {
	const submitUserIdentification = (step = props.step) => {
		console.log(
			'components forms FormUserIdentificatiopn JSX #submitUserIdentification step >>>',
			props.step
		);
	};

	const handleChange = (event) => {
		console.log(
			'components forms FormUserIdentificatiopn JSX #handleChange event.target.value >>>',
			event.target.value
		);
		console.log(
			'components forms FormUserIdentificatiopn JSX #handleChange event.target.name >>>',
			event.target.name
		);
		switch (event.target.name) {
			case 'userEmail':
				setIngredientName(event.target.value);
				break;
			case 'userPassword':
				setIngredientQuantity(event.target.value);
				break;

			default:
				break;
		}
	};

	return (
		<>
			<form
				id="user-identification-form"
				onSubmit={() => submitUserInformations(props.step)}
			>
				<label htmlFor="userEmail">
					Your Email:
					<select
						id="userEmail"
						name="userEmail"
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
					Your password:
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

export default FormUserIdentificatiopn;
