import React, { useState, useEffect } from 'react';

function user() {
	const renderForm = () => {
		<FormUserIdentification />;
	};

	return <>{renderForm()}</>;
}

export default user;
