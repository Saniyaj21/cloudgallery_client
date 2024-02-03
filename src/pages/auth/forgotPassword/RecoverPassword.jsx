import React, { useEffect, useState } from "react";
import Progress from "./Progress";
import "./recoverPassword.scss";
import {
	clearError,
	getResetPasswordOTP,
	selectUser,
	setNewPassword,
	verifyOTP,
} from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RecoverPassword = () => {
	const { isAuthenticated, isOtpSent, isEmailVerified, mail } =
		useSelector(selectUser);
	const navigate = useNavigate();

	const [step, setStep] = useState(1);
	const [email, setEmail] = useState("");
	const [resetPasswordOTP, setResetPasswordOTP] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	useEffect(() => {
		dispatch(clearError())
		if (isAuthenticated === true) {
			navigate("/");
		}
		if (mail.mailStatus === "succeeded") {
			toast.success("OTP sent")
			setStep(2);
		}
		if (mail.otpStatus === "succeeded") { 
			toast.success("Email verified")
			setStep(3);
		}
		if (mail.otpStatus === "failed") { 
			toast.error("Enter currect otp")
		}
	}, [isAuthenticated, isOtpSent, isEmailVerified, mail]);

	const dispatch = useDispatch();
	// console.log(resetPasswordOTP);

	const submitEmail = (e) => {
		e.preventDefault();
		if (!email) {
			alert("Please enter your email");
			return;
		}

		dispatch(getResetPasswordOTP(email));
		
		if (isOtpSent) {
			toast.success("OTP sent successfully");
			// setStep(2);
		}
	};
	const submitOtp = (e) => {
		e.preventDefault();
		if (!resetPasswordOTP.length === 6) {
			alert("Please enter OTP");
			return;
		}

		dispatch(verifyOTP(resetPasswordOTP));

		if (isEmailVerified) {
			toast.success("Email Verified");
			// setStep(3);
		}
	};
	const setNewPasswordHandle = (e) => {
		e.preventDefault();
		// console.log(password, confirmPassword, resetPasswordOTP);
		if (!confirmPassword.length > 6) {
			return toast.error("Password must be at least 6 characters");
		}
		if (confirmPassword != password) {
			return toast.error("Please confirm password again");
		}
		dispatch(setNewPassword({ resetPasswordOTP, password }));
		setStep(3);
		toast.success("Password Changed");
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
							<input
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								type='email'
								placeholder='Enter email'
							/>
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
							<input
								onChange={(e) => {
									setResetPasswordOTP(e.target.value);
								}}
								type='text'
								placeholder='Enter OTP'
							/>
							<button type='submit'>
								<h2>
									Verify <i className='fa-solid fa-circle-check'></i>
								</h2>
							</button>
						</form>
					</div>

					<div className='reset-password-form'>
						<form onSubmit={setNewPasswordHandle}>
							<p>
								<i className='fa-solid fa-circle-info'></i>
								<span> Make a strong password.</span>
							</p>
							<input
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								type='password'
								placeholder='New password'
							/>
							<input
								onChange={(e) => {
									setConfirmPassword(e.target.value);
								}}
								type='password'
								placeholder='Confirm password'
							/>
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
