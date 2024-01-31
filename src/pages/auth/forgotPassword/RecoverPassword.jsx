import React, { useState } from "react";
import Progress from "./Progress";
import "./recoverPassword.scss";

const RecoverPassword = () => {
	const [step, setStep] = useState(1);
	
	const submitEmail = (e) => {
		e.preventDefault();
		setStep(2);
	};
	const submitOtp = (e) => {
		e.preventDefault();
		setStep(3);
	};
	const setNewPassword = (e) => {
		e.preventDefault();
		setStep(3);
	};
	return (
		<>
			<div className='progress-container'>
				<Progress step={step} />
			</div>

			<div className='reset-form-container'>
				<div>
					<div
						className={`email-form ${step === 1 ? "m-00" : ""} ${
							step === 2 ? "m-300" : ""
						} ${step === 3 ? "m-600" : ""} `}
					>
						<form onSubmit={submitEmail}>
							<p>
								<i className='fa-solid fa-circle-info'></i>
								<span> We will send a otp to this email.</span>
							</p>
							<input type='email' placeholder='Enter email' />
							<button type='submit'>
								<h2>
									Send <i className='fa-regular fa-paper-plane'></i>
								</h2>
							</button>
						</form>
					</div>

					<div className='otp-verify-form'>
						<form onSubmit={submitOtp}>
							<p>
								<i className='fa-solid fa-circle-info'></i>
								<span> Check in your spam section also.</span>
							</p>
							<input type='text' placeholder='Enter OTP' />
							<button type='submit'>
								<h2>
									Verify <i className='fa-solid fa-circle-check'></i>
								</h2>
							</button>
						</form>
					</div>

					<div className='reset-password-form'>
						<form onSubmit={setNewPassword}>
							<p>
								<i className='fa-solid fa-circle-info'></i>
								<span> Make a strong password.</span>
							</p>
							<input type='password' placeholder='New password' />
							<input type='password' placeholder='Confirm password' />
							<button type='submit'>
								<h2>
									Save <i className='fa-solid fa-floppy-disk'></i>{" "}
								</h2>
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default RecoverPassword;
