import React, { useState, useEffect } from 'react';

function user() {
	const [userIdentification, setUserIdentification] = useState({});
	const [identificationStep, setIdentificationStep] = useState(0);

	const renderForm = (props) => {
		<FormUserIdentification
			step={identificationStep}
			setUserIdentification={setUserIdentification}
			setIdentificationStep={setIdentificationStep}
		/>;
	};

	return <>{renderForm()}</>;
}

export default user;
