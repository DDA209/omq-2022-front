import { useContext } from 'react';
import { AuthContext } from '../../App';
// import FormManageIngredients from '../../components/layout/forms/FormManageIngredients';
import ManageIngredients from './ManageIngredients.view';
import ManageUsers from './ManageUsers.view';

function AdminView(props) {
	const { userLogin } = useContext(AuthContext);
	console.log('AdminView useContext(AuthContext)', useContext(AuthContext));

	const renderNoView = () => {
		<p>Nothing to display use the correct way</p>;
	};

	const renderView = (view, index) => {
		if (view === 'manageIngredients') {
			return (
				<div key="index">
					<hr />
					<h2>Manage ingredients</h2>
					<ManageIngredients />
				</div>
			);
		} else if (view === 'manageUsers') {
			return (
				<div key="index">
					<hr />
					<h2>Manage users</h2>
					<ManageUsers />
				</div>
			);
		} else {
			renderNoView();
		}
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
