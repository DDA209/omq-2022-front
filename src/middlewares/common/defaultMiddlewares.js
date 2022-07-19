import params from '../../../params';
const { headers, apiUrl } = params;

const defaultMiddlewares = {
	/**
	 * Send a new document in database datas using the API in a POST method
	 * @param {string} apiRoute the route to send datas to the API (e.g apiRoute = <folders/folder>)
	 * @param {object} body an object with datas to post
	 * @returns {object} { success: true, data: { <document> } } or { success: false, data: <error> }
	 */
	postDocument: async (apiRoute, body) => {
		const url = `${apiUrl}/${apiRoute}`;
		const method = 'POST';
		const response = await fetch(url, {
			headers,
			method,
			body: JSON.stringify(body),
		}).then((res) => {
			return res.json();
		});
		return response;
	},

	/**
	 * Get all documents of a collection from the database using the API in a POST method
	 * @param {string} apiFolder the API folder to acceed to the API needed datas (e.g apiFolder = <folders>)
	 * @returns {object} { success: true, data: [ { <document> } ] } or { success: false, data: <error> }
	 */
	getAllDocuments: async (apiFolder) => {
		const url = `${apiUrl}/${apiFolder}`;
		const method = 'GET';
		const response = await fetch(url, { headers, method }).then((res) => {
			return res.json();
		});
		return response;
	},

	/**
	 * Get a document from a collectin in the database using the API in a GET method
	 * @param {string} apiFolder the API folder to acceed to the API needed datas (e.g apiFolder = <folders>)
	 * @param {string} id the document id to get <known id>
	 * @returns {object} { success: true, data: { <document> } } or { success: false, data: <error> }
	 */
	getDocumentById: async (apiFolder, id) => {
		const url = `${apiUrl}/${apiFolder}/${id}`;
		const method = 'GET';
		const response = await fetch(url, { headers, method }).then((res) => {
			return res.json();
		});
		return response;
	},

	/**
	 * Get a document from a collectin in the database with query using the API in a GET method
	 * @param {string} apiFolder the API folder to acceed to the API needed datas (e.g apiFolder = <folder>'
	 * @param {string} query HTLM query (e.g query = '?_id=2154&name=test')
	 * @returns {object} { success: true, data: { <document> } } or { success: false, data: <error> }
	 */
	getDocumentByQueries: async (apiFolder, query) => {
		const url = `${apiUrl}/${apiFolder}/query${query}`;
		const method = 'GET';
		const response = await fetch(url, { headers, method }).then((res) => {
			return res.json();
		});
		return response;
	},

	/**
	 * Modify a existing document in database using the API in a POST method
	 * @param {string} apiRoute the route where is the document to modify (e.g apiRoute = <folders/folder>)
	 * @param {string} id the document id to modify <known id>
	 * @param {object} body an object with datas to change
	 * @returns {object} { success: true, data: { <document> } } or { success: false, data: <error> }
	 */
	putDocument: async (apiRoute, id, body) => {
		const url = `${apiUrl}/${apiRoute}/${id}`;
		const method = 'PUT';
		const response = await fetch(url, {
			headers,
			method,
			body: JSON.stringify(body),
		}).then((res) => {
			return res.json();
		});
		return response;
	},

	/**
	 * Delete a document from a collectin in the database using the API in a GET method
	 * @param {string} apiRoute the route to acceed to the API document to delete (e.g apiRoute = <folders/folder>)
	 * @param {string} id the document id to delete <known id>
	 * @returns {object} { success: true, data: { <document> } } or { success: false, data: <error> }
	 */
	deleteDocument: async (apiRoute, id) => {
		const url = `${apiUrl}/${apiRoute}/${id}`;
		const method = 'DELETE';
		const response = await fetch(url, { headers, method }).then((res) => {
			return res.json();
		});
		return response;
	},

	/**
	 * Delete a document from a collectin in the database using the API in a GET method
	 * @param {string} apiRoute the route to acceed to the API document to delete (e.g apiRoute = <folders/>destroy</folder>)
	 * @param {string} id the document id to delete <known id>
	 * @returns {object} { success: true, data: { <document> } } or { success: false, data: <error> }
	 */
	destroyDocument: async (apiRoute, id) => {
		const url = `${apiUrl}/${apiRoute}/${id}`;
		const method = 'DELETE';
		const response = await fetch(url, { headers, method }).then((res) => {
			return res.json();
		});
		return response;
	},
};

export default defaultMiddlewares;
