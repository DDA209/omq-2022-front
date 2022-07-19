import React from 'react';

import './forms.css';

function FormManageUsers(props) {
	const { user, index, modifyUser, destroyUser } = props;

	const reverseValue = (id, field, value) => {
		const datas = { [field]: !value };
		modifyUser(id, datas);
	};

	const resetPasswordAttempts = (id) => {
		const datas = { passwordAttempt: 0 };
		modifyUser(id, datas);
	};

	const renderParameters = (user, index) => {
		const fields = [
			['emailValidated', 'valid email'],
			['isActive', 'active account'],
			['isAdmin', 'Administrator'],
		];

		return fields.map((field, key) => {
			return (
				<fieldset key={key}>
					<div className="small-button">
						<div className="led-button">
							<div
								id={
									user.id
										? `user-${index + 1}-{field[0]}`
										: 'user-{field[0]}'
								}
								name="user-{field[0]}"
								className={`user-${field[0]} ${
									user[field[0]] ? 'active' : 'inactive'
								}`}
								type="checkbox"
								value={user[field[0]]}
								onClick={() =>
									reverseValue(
										user.id,
										field[0],
										user[field[0]]
									)
								}
							></div>
						</div>
					</div>
					<label>{field[1]}</label>
				</fieldset>
			);
		});
	};

	const renderLine = (user, index) => {
		return (
			<div>
				<hr className="height-1-px"></hr>
				{user.id && <h6>id: {user.id}</h6>}
				<p
					id={user.id ? `user-${index + 1}-email` : 'user-email'}
					className="user-email"
				>
					{user.email}
				</p>
				<form className="user-management">
					<fieldset>
						<div className="small-button">
							<div className="led-button">
								<div
									id={
										user.id
											? `user-${
													index + 1
											  }-passwordAttempt`
											: 'user-passwordAttempt'
									}
									name="user-passwordAttempt"
									className={`user-passwordAttempt ${
										user.passwordAttempt >= 10
											? 'inactive'
											: user.passwordAttempt > 0
											? 'alert'
											: 'active'
									}`}
									type="button"
									value={user.passwordAttempt}
									onClick={() =>
										resetPasswordAttempts(user.id)
									}
								></div>
							</div>
						</div>
						<label>
							PW attempts:&nbsp;
							<span className="bold">{user.passwordAttempt}</span>
						</label>
					</fieldset>

					{renderParameters(user, index)}
					<button
						type="button"
						onClick={() => {
							destroyUser(user.id, index);
						}}
					>
						Delete
					</button>
				</form>
			</div>
		);
	};

	return renderLine(user, index);
}

export default FormManageUsers;

document.querySelector;
