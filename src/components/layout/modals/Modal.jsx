import React from 'react';
import './modal.css';

function Modal(props) {
	const { children, status: status, content: content } = props;
	return (
		<div id="modal" className={status}>
			<div>
				<h3>{children}</h3>
				{content}
			</div>
		</div>
	);
}

export default Modal;
