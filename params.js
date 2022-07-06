const apiUrl = 'http://localhost:8000';

const params = {
	apiUrl,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': apiUrl,
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Methods': 'POST, GET, PUT',
		'access-control-allow-credentials': 'true',
	},
};

export default params;
