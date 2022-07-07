import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import './navBar.css';

function NavBar() {
	const [isLogged, setIsLogged] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		!isLogged && setIsAdmin(false);
	}, [isLogged]);

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
		if (!isLogged) {
			return (
				<Link id="login-signin" to="/login_signin">
					<div className="nav-small-item">
						<div></div>
					</div>
					Login / Signin
				</Link>
			);
		} else {
			return (
				<a
					className="big-button"
					onClick={() => {
						setIsLogged(false);
					}}
				>
					<div className="nav-small-item">
						<div className="led-logged"></div>
					</div>
					<span>Logout</span>
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
					{/* <Link id="login-signin" to="/login_signin">
						<div className="nav-small-item">
							<div className={isLogged && 'led-logged'}></div>
						</div>
						{!isLogged ? 'Login / Signin' : 'Logout'}
					</Link> */}
					{renderLogButton()}
					{isAdmin && renderAdmin()}
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
