import params from '../../params';
const { headers, apiUrl } = params;

/**
 *
 * @param {String} user user email
 * @returns
 */
const getUserIngredients = async (user) => {
	const url = `${apiUrl}/userIngredients/user?user=${user}`;
	const method = 'GET';

	const response = await fetch(url, { headers, method }).then((res) => {
		return res.json();
	});
	return response;
};

export default getUserIngredients;
