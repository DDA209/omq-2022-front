import React from 'react';
import './forms.css';

function FormManageRecipes(props) {
	const {
		recipe,
		index,
		handleChange,
		createRecipe,
		modifyRecipe,
		destroyRecipe,
		usage,
	} = props;

	const renderLine = (recipe, index) => {
		return (
			<div>
				{recipe.id && <h6>id: {recipe.id}</h6>}
				<form>
					<label>
						name:
						<input
							id={
								recipe.id
									? `recipe-${index + 1}-name`
									: 'recipe-name'
							}
							name="recipe-name"
							className="recipe-name"
							type="text"
							value={recipe.name}
							onChange={handleChange(index >= 0 ? index : -1)}
						></input>
					</label>
					<label>
						volumic mass:
						<input
							id={
								recipe.id
									? `recipe-${index + 1}-volumic-mass`
									: 'recipe-volumic-mass'
							}
							name="recipe-volumic-mass"
							className="recipe-volumic-mass"
							type="number"
							min="0"
							max="20000"
							step="0.1"
							size="50"
							value={recipe.volumicMass}
							onChange={handleChange(index >= 0 ? index : -1)}
						></input>
						g/l
					</label>
					{usage === 'create' && (
						<button
							type="button"
							onClick={() => {
								createRecipe(recipe);
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
									modifyRecipe(recipe.id, index);
								}}
							>
								Modify
							</button>
							<button
								type="button"
								onClick={() => {
									destroyRecipe(recipe.id, index);
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

	return renderLine(recipe, index);
}

export default FormManageRecipes;
