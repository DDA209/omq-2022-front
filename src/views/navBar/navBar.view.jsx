import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './navBar.css';

function NavBar() {
	const [isLogged, setIsLogged] = useState(true);
	const [isAdmin, setIsAdmin] = useState(true);

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
						<div className={isLogged && 'led-logged'}></div>
					</div>
					Login / Signin
				</Link>
			);
		} else {
			return (
				<a
					onClick={() => {
						setIsLogged(false);
					}}
				>
					<div className="nav-small-item">
						<div className={isLogged && 'led-logged'}></div>
					</div>
					Logout
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
					<Link id="ingredients-list" to="/ingredients">
						<div className="nav-item"></div>
						Ingredients list
					</Link>
					<Link id="calculate-menus" to="/menus">
						<div className="nav-item"></div>
						Calculate menus
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
