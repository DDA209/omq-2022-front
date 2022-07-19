import React from 'react';
import CardIngredientUser from './CardIngredientUser';
import './cards.css';

function Cards(props) {
	console.log('CARDS props', props);

	const renderCards = (ingredients, usage) => {
		console.log('CARDSSSS');
		if (usage === 'userIngredients') {
			console.log('CARDSSSS usage', usage);
			return ingredients.map((ingredient, index) => {
				return (
					<CardIngredientUser key={index} datas={ingredient}>
						{ingredient.ingredientName}
					</CardIngredientUser>
				);
			});
		}
	};

	return renderCards(props.datas, props.usage);
}

export default Cards;
