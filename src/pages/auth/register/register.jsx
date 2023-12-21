import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./register.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, selectUser } from "../../../redux/slices/authSlice";

function Register() {
	const [user, setUser] = useState({});
	const [avatar, setAvatar] = useState("/Profile.png");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector(selectUser);

	useEffect(() => {
		if (isAuthenticated === true) {
			navigate("/");
		}
	}, [dispatch, isAuthenticated, navigate]);

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				setAvatar(e.target.result);
			};

			reader.readAsDataURL(file);
		} else {
			console.log("Error happened");
		}
	};

	const handleData = async (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const createNewUser = async (e) => {
		e.preventDefault();

		try {
			if (Object.entries(user).length == 0) {
				return toast.error("plese input valid data....");
			}
			if (!user.name || !user.email || !user.password) {
				return toast.error("name and email and password required....");
			}

			if (user.password.length < 8) {
				return toast.error("password must be 8 characters....");
			}

			if (user.password != user.cpassword) {
				return toast.error("password and confirm password are not match...");
			}
			const myForm = new FormData();

			myForm.set("name", user.name);
			myForm.set("email", user.email);
			myForm.set("password", user.password);
			myForm.set("avatar", avatar);

			dispatch(registerUser(myForm));
		} catch (error) {
			console.error("err", error);
			toast.error(error.response.data.message);
		}
	};

	return (
		<div>
			<form action='' className='auth-form' onSubmit={createNewUser}>
				<b style={{ fontSize: "25px" }}>registration form </b>

				<input
					className='file-input'
					type='file'
					required
					onChange={handleFileChange}
				/>
				<input
					type='name'
					placeholder='enter fullname '
					name='name'
					onChange={handleData}
				/>
				<input
					type='email'
					name='email'
					id='email'
					placeholder='enter Email'
					onChange={handleData}
				/>
				<input
					type='password'
					name='password'
					id='pass1'
					placeholder='enter password '
					onChange={handleData}
				/>
				<input
					type='password'
					name='cpassword'
					id='pass2'
					placeholder='enter  confirm password'
					onChange={handleData}
				/>
				<button type='submit'> Register </button>
				<hr />
				<b>You have alrady register </b>
				<Link to={"/login"}>
					{" "}
					<button> Log in </button>{" "}
				</Link>
			</form>
		</div>
	);
}

export default Register;
