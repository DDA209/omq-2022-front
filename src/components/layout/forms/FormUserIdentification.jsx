import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../App';
import { ReactComponent as ValidateIcon } from '../../../assets/images/icons.svg';
import './forms.css';

import defaultMiddlewares from '../../../middlewares/common/defaultMiddlewares';
const {
	postDocument,
	getDocumentByQueries,
	getAllDocuments,
	putDocument,
	destroyDocument,
} = defaultMiddlewares;

import Modal from '../modals/Modal';
import './forms.css';

function FormUserIdentification(props) {
	const [modal, setModal] = useState({
		content: <p>nothing to display</p>,
		status: 'hidden',
	});
	const { formStep, setFormStep, userIdentification, setUserIdentification } =
		props;
	const { userLogin, setUserLogin } = useContext(AuthContext);
	console.log('AuthContext userLogin', userLogin);
	// console.log('userIdentification', userIdentification);
	const handleChange = (event) => {
		switch (event.target.name) {
			case 'email':
				setUserIdentification({
					...userIdentification,
					email: [event.target.value, userIdentification.email[1]],
				});
				break;
			case 'password':
				setUserIdentification({
					...userIdentification,
					password: [
						event.target.value,
						userIdentification.password[1],
					],
				});
				break;
			case 'emailConfirmation':
				setUserIdentification({
					...userIdentification,
					emailConfirmation: [
						event.target.value,
						userIdentification.emailConfirmation[1],
					],
				});
				break;

			case 'passwordConfirmation':
				setUserIdentification({
					...userIdentification,
					passwordConfirmation: [
						event.target.value,
						userIdentification.passwordConfirmation[1],
					],
				});
				break;

			default:
				break;
		}
	};

	const handleClickLoginRegister = async (step) => {
		console.log('clic handleClickLoginRegister');
		if (step === 'login') {
			return setFormStep('login');
		} else if (step === 'register') {
			const reponse = await getDocumentByQueries(
				'users',
				`?email=${userIdentification.email[0]}`
			);
			if (reponse.success && step === 'register') {
				alert('Email already used');
				return;
			} else {
				setFormStep('register');
				// setUserIdentification({
				// 	...userIdentification,
				// 	emailConfirmation: ['', false],
				// 	passwordConfirmation: ['', false],
				// });
				return;
			}
		}
	};

	const handleClicValidate = async (step) => {
		let err = '';
		console.log('clic handleClicValidate -', step);
		const identification = {
			email: userIdentification.email[0],
			password: userIdentification.password[0],
		};
		if (step === 'register') {
			const confirmations = {
				emailConfirmation: userIdentification.emailConfirmation[0],
				passwordConfirmation:
					userIdentification.passwordConfirmation[0],
			};
			const response = await postDocument('users/user/subscribe', {
				...identification,
				...confirmations,
			});

			if (!response.success) {
				console.log('Auth', step, 'error', response.data);
				console.log('Auth', step, 'error');
				err = response.data;
			} else {
				modalContent('register');
				console.log(
					'components/layout/forms/FormUserIdentification #handleClicValidate',
					response
				);
				return;
			}
		} else if (step === 'login') {
			console.log('#1');

			const response = await postDocument(
				'users/user/login',
				identification
			);
			if (!response.success) {
				console.log('#2');

				console.log('Auth', step, 'error', response.data);
				console.log('Auth', step, 'error');
				err = response.data;
			} else {
				console.log('#3');
				setUserLogin({
					isLogged: true,
					isAdmin: response.data.isAdmin,
				});
			}
		}
		modalContent('error', err);
		return;
	};

	const handleClicBack = (step) => {
		const password = [userIdentification.password[0], false];
		const passwordConfirmation = ['', false];
		const emailConfirmation = ['', false];
		console.log('back', userIdentification);
		console.log('back PASSWORD', userIdentification.password[0]);
		setUserIdentification({
			...userIdentification,
			password,
			passwordConfirmation,
			emailConfirmation,
		});
		setFormStep(null);
		console.log('clic handleClicBack');
	};

	const modalContent = (step, message) => {
		console.log('modalContent step >>>', step);
		console.log('modalContent message >>>', message);
		const status = '';
		const content = (
			<>
				{step === 'register' && (
					<>
						<h3>Register finalisation</h3>
						<p>Congratulations </p>
					</>
				)}
				{step === 'error' && (
					<>
						<h3>
							{step === 'register'
								? 'Registration '
								: step === 'login' && 'Login'}{' '}
							error
						</h3>
						{message.length > 1 ? (
							<ul>
								{message.map((error, index) => (
									<li key={index}>{error}</li>
								))}
							</ul>
						) : (
							<p>{message[0]}</p>
						)}
					</>
				)}

				<button
					onClick={() => {
						setModal({ ...modal, status: 'hidden' });
						setUserIdentification({
							email: [
								userIdentification.email.toLowerCase(),
								true,
							],
							password: ['', false],
							emailConfirmation: ['', false],
							passwordConfirmation: ['', false],
						});
						setFormStep('login');
					}}
				>
					{step === 'error' ? 'Retry' : <Link to="/">Continue</Link>}
				</button>
			</>
		);

		setModal({
			content,
			status,
		});
	};

	return (
		<>
			<Modal status={modal.status} content={modal.content} />
			<form
				id="user-identification-form"
				onSubmit={() => submitUserInformations(props.step)}
			>
				<label>
					Your Email:
					<input
						id="email"
						autoComplete="email"
						name="email"
						type="email"
						onChange={(e) => handleChange(e)}
					/>
					<ValidateIcon
						className={
							userIdentification.email[1] ? 'validated' : 'error'
						}
					/>
				</label>
				{formStep === 'register' && (
					<label>
						Confirm Email:
						<input
							id="emailConfirmation"
							autoComplete="off"
							name="emailConfirmation"
							type="email"
							onChange={handleChange}
						/>
						<ValidateIcon
							className={
								userIdentification.emailConfirmation[1]
									? 'validated'
									: 'error'
							}
						/>
					</label>
				)}
				{formStep && (
					<>
						<label>
							Your password:
							<input
								id="password"
								autoComplete="password"
								name="password"
								type="password"
								min="8"
								max="128"
								onChange={handleChange}
							/>
							<ValidateIcon
								className={
									userIdentification.password[1]
										? 'validated'
										: 'error'
								}
							/>
						</label>
					</>
				)}
				{formStep === 'register' && (
					<label>
						Confirm password:
						<input
							id="passwordConfirmation"
							autoComplete="off"
							name="passwordConfirmation"
							type="password"
							min="8"
							max="128"
							onChange={handleChange}
						/>{' '}
						<ValidateIcon
							className={
								userIdentification.passwordConfirmation[1]
									? 'validated'
									: 'error'
							}
						/>
					</label>
				)}
				<div className="in-line">
					{formStep && (
						<>
							<button
								type="button"
								className={formStep}
								onClick={() => handleClicBack(formStep)}
							>
								{'< '}back
							</button>
							<button
								type="button"
								className={formStep}
								onClick={() => handleClicValidate(formStep)}
							>
								Validate
							</button>
						</>
					)}

					{!formStep &&
						[{ register: 'Register' }, { login: 'Login' }].map(
							(step, index) => {
								const [stepKey, stepValue] =
									Object.entries(step)[0];
								console.log(
									'Object.entries(step)',
									Object.entries(step)
								);
								console.log('stepKey', stepKey);
								console.log('stepValue', stepValue);
								return (
									<Fragment key={index}>
										{index !== 0 && (
											<span className="margin-top-1">
												or
											</span>
										)}
										<button
											type="button"
											onClick={() =>
												handleClickLoginRegister(
													stepKey
												)
											}
										>
											{stepValue}
										</button>
									</Fragment>
								);
							}
						)}
				</div>
			</form>
		</>
	);
}

export default FormUserIdentification;
