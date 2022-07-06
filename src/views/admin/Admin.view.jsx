import React, { useState, useEffect } from 'react';
import params from '../../../params';
// import FormManageIngredient from '../../components/layout/forms/FormManageIngredient';
import ManageIngredients from './ManageIngredients.view';
// import defaultMiddlewares from '../../middlewares/common/defaultMiddlewares';

const { headers, apiUrl } = params;

function AdminView(props) {
	const [ingredientsAll, setIngrdientAll] = useState([]);

	const getAllIngredients = () => {
		const method = 'GET';
		const response = fetch(`${apiUrl}/ingredients`, {
			headers,
			method,
		})
			.then((res) => res.json())
			.then((result) => {
				if (!result.success) {
					return;
				}
				const ingredients = result.data.map((ingredient) => {
					const { _id: id, name, volumicMass } = ingredient;
					return { id, name, volumicMass };
				});
				setIngrdientAll(ingredients);
			});
	};

	useEffect(() => {
		getAllIngredients();
	}, []);

	const renderNoView = () => {
		return <p>Nothing to display use the correct way</p>;
	};

	const renderView = (view, index) => {
		if (view === 'manageIngredients') {
			return (
				<div key={index}>
					<hr />
					<h2>Manage ingredients</h2>
					{ingredientsAll.length > 0 && renderAllIngredients()}
				</div>
			);
		} else {
			renderNoView();
		}
	};

	const renderAllIngredients = () => {
		return (
			<>
				<ManageIngredients
					ingredientsAll="ingredientsAll"
					getAllIngredients={getAllIngredients}
				/>
			</>
		);
	};

	return (
		<>
			<h3>Admin View</h3>
			{props.views
				? props.views.map((view, index) => renderView(view, index))
				: renderNoView()}
		</>
	);
}

export default AdminView;
