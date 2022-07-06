import React from 'react';
import logoOmq from '../../assets/images/OMQ.svg';

function HomeView() {
	// Get list
	return (
		<>
			<img id="logoOmq" src={logoOmq} alt="OMQ logo" />
			<h1>OMQ</h1>
			<h3>On mange quoi ?</h3>
			<p>Want you to find a menu for now with what you have at home ?</p>
		</>
	);
}

export default HomeView;
