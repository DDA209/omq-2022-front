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
				<section className="indredient-visualization">.</section>
				<section className="ingredient-quantity">
					<input
						id={`ingredient-${ingredientId}-quantity`}
						className="ingredient-quantity"
						name="ingredient-quantity"
						type="number"
						min="0"
						max="10000"
						step="0.001"
						value={quantity}
						onChange={() => {}}
					/>
					<span>kg</span>
				</section>
			</article>
		</div>
	);
}

export default CardIngredientUser;
