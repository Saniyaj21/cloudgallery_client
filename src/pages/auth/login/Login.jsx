import axios from "axios";
import React, { useEffect, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginUser, selectUser } from "../../../redux/slices/authSlice";
import Loader from "../../lauout/loader/Loader";
import { toast } from "react-toastify";


function Login() {
	const [user, setUser] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuthenticated, status , error} = useSelector(selectUser);

	useEffect(() => {
		dispatch(clearError())
		if (isAuthenticated === true) {
			navigate("/");
		}
		// if (error) {
		// 	toast.error("Try again")
		// }
	}, [dispatch, isAuthenticated, navigate]);

	const hendleData = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		if (Object.entries(user).length == 0) {
			// return toast.error("plese input valid data....");
		}
		if (!user.password || !user.email) {
			// return toast.error("email and password required....");
		}
		dispatch(loginUser(user));
	};

	return (
		<>
			{status === "loading" ? (
				<Loader />
			) : (
				<>
					<div className='login-main'>
						<form action='' className='auth-form' onSubmit={handleLogin}>
							<h3>Login </h3>
							<input
								type='email'
								name='email'
								id='userEmail'
								placeholder='Email'
								onChange={hendleData}
							/>
							<input
								type='password'
								name='password'
								id='UserPassword'
								placeholder='Password'
								onChange={hendleData}
							/>

							<button type='submit'> Login </button>
							<hr />
							<p>
								New to here?
								<Link to={"/register"}> Register Now</Link>
							</p>
						</form>
					</div>
				</>
			)}
		</>
	);
}

export default Login;
