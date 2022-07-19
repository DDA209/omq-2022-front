import React from 'react';

function CardIngredientUser(props) {
	const {
		quantity,
		ingredientName,
		ingredientId,
		_id: id,
		userId,
	} = props.datas;

	return (
		<div className="card width-4-3-2">
			<article>
				<h4>{props.children}</h4>
				<section className="indredient-visualization">
					picture of ingredient or anything else
				</section>
				<input
					id={`ingredient-${ingredientId}-quantity`}
					className={`ingredient-${ingredientId}-quantity`}
					name={`ingredient-${ingredientId}-quantity`}
					type="number"
					min="0"
					max="10000"
					step="0.001"
					value={quantity}
					onChange={() => {}}
				></input>
				kg
			</article>
		</div>
	);
}

export default CardIngredientUser;
