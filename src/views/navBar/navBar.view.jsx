import { useContext } from 'react';
import { AuthContext } from '../../App';
import { Link } from 'react-router-dom';

import './navBar.css';
import userUpdate from '../../utils/userUpdate';

function NavBarView() {
	const { userLogin, setUserLogin } = useContext(AuthContext);

	const renderAdmin = () => {
		return (
			<div id="admin-items">
				Admin options &dArr;
				<hr />
				<Link to="/admin/manage_ingredients">Manage ingredients</Link>
				<Link to="/admin/manage_recipes">Manage recipes</Link>
				<Link to="/admin/manage_users">Manage users</Link>
			</div>
		);
	};

	const renderLogButton = () => {
		if (!userLogin?.isLogged) {
			return (
				<Link
					className="big-button"
					id="login-signin"
					to="/login_register"
				>
					<div className="nav-small-item">
						<div></div>
					</div>
					<span>Login / Signin</span>
				</Link>
			);
		} else if (userLogin?.isLogged) {
			return (
				<a
					className="big-button"
					onClick={() => {
						setUserLogin({ isLogged: false, isAdmin: false });
						localStorage.clear('userLogin');
						userUpdate({
							userId: '',
							userEmail: '',
							isLogged: false,
							isAdmin: false,
						});
					}}
				>
					<div className="nav-small-item">
						<div className="led-logged"></div>
					</div>
					<span>Logout</span>
					{userLogin && <span id="user">{userLogin.userEmail}</span>}
				</a>
			);
		}
	};

	return (
		<nav>
			<div>
				<h2>
					<Link to="/">OMQ</Link>
				</h2>
				{/* {!userLogin?.isLogged && (
					<span
						type="button"
						className="btn btn-primary"
						onClick={onClickLogin}
					>
						Login
					</span>
				)}
				{!userLogin?.isAdmin && (
					<span
						type="button"
						className="btn btn-secondary"
						onClick={onClickAdmin}
					>
						Admin
					</span>
				)} */}
				<div id="nav-items">
					<Link
						className="big-button"
						id="ingredients-list"
						to="/ingredients"
					>
						<div className="nav-item"></div>
						<span>Ingredients list</span>
					</Link>
					<Link
						className="big-button"
						id="calculate-menus"
						to="/menus"
					>
						<div className="nav-item"></div>
						<span>Calculate menus</span>
					</Link>
					{renderLogButton()}
					{userLogin?.isAdmin && renderAdmin()}
				</div>
			</div>
		</nav>
	);
}
export default NavBarView;
