import React, { useState, useEffect } from 'react';
import FormManageUsers from '../../components/layout/forms/FormManageUsers';
import params from '../../../params';
const { headers, apiUrl } = params;
import defaultMiddlewares from '../../middlewares/common/defaultMiddlewares';
const { getAllDocuments, putDocument, deleteDocument } = defaultMiddlewares;

function ManageusersView() {
	const [usersAll, setUsersAll] = useState([]);

	useEffect(() => {
		getAllusers();
	}, []);

	const getAllusers = async () => {
		const response = await getAllDocuments('users');
		if (!response.success) {
			return;
		}
		const users = response.data.map((user) => {
			const {
				_id: id,
				email,
				emailValidated,
				isAdmin,
				isActive,
				passwordAttempt,
			} = user;
			return {
				id,
				email,
				emailValidated,
				isAdmin,
				isActive,
				passwordAttempt,
			};
		});
		setUsersAll(users);
	};

	/**
	 *
	 * @param {String} id // User _ID
	 * @param {Object} datas // {field: data, ...}
	 * @returns
	 */
	const modifyUser = async (id, datas) => {
		console.log('modifyUser datas', datas);
		const body = { ...datas };
		const response = await putDocument('users/user', id, body);
		if (!response.success) {
			console.log('ERROR modify user', response.data);
			return;
		}
		getAllusers();
	};

	const destroyUser = async (id) => {
		const response = await deleteDocument('users/user', id);
		if (!response.success) {
			console.log('ERROR destroying user', response.data);
			return;
		}
		getAllusers();
	};

	return usersAll.map((user, index) => {
		return (
			<FormManageUsers
				key={index}
				user={user}
				index={index}
				modifyUser={modifyUser}
				destroyUser={destroyUser}
				usage={'manage'}
			/>
		);
	});
}

export default ManageusersView;
