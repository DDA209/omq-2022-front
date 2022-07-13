import { useState, useEffect } from 'react';

import FormUserIdentification from '../../components/layout/forms/FormUserIdentification';

function LoginView(props) {
	const [userIdentification, setUserIdentification] = useState({
		email: ['', false],
		emailConfirmation: ['', false],
		password: ['', false],
		passwordConfirmation: ['', false],
	});
	const [formStep, setFormStep] = useState(null);

	useEffect(() => {
		setFormStep(props.formStep);
	}, []);

	console.log('formStep', formStep);

	return (
		<>
			<h2>
				{(!formStep || formStep === 'register') && 'REGISTER'}
				{!formStep && '  AND '}
				{(!formStep || formStep === 'login') && 'LOGIN'}
			</h2>
			<FormUserIdentification
				userIdentification={userIdentification}
				setUserIdentification={setUserIdentification}
				formStep={formStep}
				setFormStep={setFormStep}
			/>
		</>
	);
}

export default LoginView;
