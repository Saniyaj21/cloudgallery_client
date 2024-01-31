import React from "react";
import Progress from "./Progress";
import './recoverPassword.scss';

const RecoverPassword = () => {
	return (
		<>
			<div className="progress-container">
				<Progress step={3}/>
			</div>
			<div>
        reset password
      </div>
		</>
	);
};

export default RecoverPassword;
