import React, { useState, useEffect } from 'react';

function Button(props) {
	return (
		<button className={props.state} type="button">
			{props.state === 'waiting' ? (
				<>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
				</>
			) : (
				props.children
			)}
		</button>
	);
}

export default Button;
