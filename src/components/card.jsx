import React from 'react';

function Card() {
	return (
		<>
			<div>
				<h3>{props.children}</h3>
			</div>
		</>
	);
}

export default Card;
