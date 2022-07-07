import React from 'react';
import './forms.css';

function FormManageIngredients(props) {
	const {
		ingredient,
		index,
		handleChange,
		createIngredient,
		modifyIngredient,
		destroyIngredient,
		usage,
	} = props;

	const renderLine = (ingredient, index) => {
		return (
			<div>
				{ingredient.id && <h6>id: {ingredient.id}</h6>}
				<form>
					<label>
						name:
						<input
							id={
								ingredient.id
									? `ingredient-${index + 1}-name`
									: 'ingredient-name'
							}
							name="ingredient-name"
							className="ingredient-name"
							type="text"
							value={ingredient.name}
							onChange={handleChange(index >= 0 ? index : -1)}
						></input>
					</label>
					<label>
						volumic mass:
						<input
							id={
								ingredient.id
									? `ingredient-${index + 1}-volumic-mass`
									: 'ingredient-volumic-mass'
							}
							name="ingredient-volumic-mass"
							className="ingredient-volumic-mass"
							type="number"
							min="0"
							max="20000"
							step="0.1"
							size="50"
							value={ingredient.volumicMass}
							onChange={handleChange(index >= 0 ? index : -1)}
						></input>
						g/l
					</label>
					{usage === 'create' && (
						<button
							type="button"
							onClick={() => {
								createIngredient(ingredient);
							}}
						>
							Add
						</button>
					)}
					{usage === 'manage' && (
						<>
							<button
								type="button"
								onClick={() => {
									modifyIngredient(ingredient.id, index);
								}}
							>
								Modify
							</button>
							<button
								type="button"
								onClick={() => {
									destroyIngredient(ingredient.id, index);
								}}
							>
								Delete
							</button>
						</>
					)}
				</form>
			</div>
		);
	};

	return renderLine(ingredient, index);
}

export default FormManageIngredients;
