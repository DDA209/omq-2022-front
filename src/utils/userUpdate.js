import { useContext } from 'react';
import { AuthContext } from '../App';

/**
 * Update userLogin Hook and local storage userLogin
 * @param {Object} user contain datas for local storage and hooks
 * (e.g { userId:<MogoDB ObjectId>, userEmail: name\@domain.com, isLogged: true, isAdmin: false })
 */

function userUpdate(user) {
	const { userLogin, setUserLogin } = useContext(AuthContext);
	const userJson = JSON.stringify(userLogin);
	localStorage.setItem('userLogin', userJson);
	setUserLogin(user);
	return;
}

export default userUpdate;
