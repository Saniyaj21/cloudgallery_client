import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, selectUser } from "../../../redux/slices/authSlice";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import Loader from "../../lauout/loader/Loader";

function Register() {
	const [user, setUser] = useState({});
	const [avatar, setAvatar] = useState();
	const [imgPreview, setImgPreview] = useState("/dp-min.png");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuthenticated, status, error } = useSelector(selectUser);

	useEffect(() => {
		if (isAuthenticated === true) {
			navigate("/");
		}
		if (error) {
			toast.error("Try again")
		}
	}, [dispatch, isAuthenticated, navigate, error]);

	const handleFileChange = async (e) => {
		const imageFile = e.target.files[0];

		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		};
		try {
			const compressedFile = await imageCompression(imageFile, options);

			const reader = new FileReader();

			reader.onload = function (e) {
				// Set the result of the FileReader to the state variable
				setAvatar(e.target.result);
				setImgPreview(e.target.result);
			};

			reader.readAsDataURL(compressedFile);
		} catch (error) {
			console.log(error);
		}
	};

	const handleData = async (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const createNewUser = async (e) => {
		e.preventDefault();

		try {
			if (Object.entries(user).length == 0) {
				return toast.error("Please Enter Valid Data!");
			}
			if (!user.name || !user.email || !user.password) {
				return toast.error("Name and Email Required!");
			}

			if (user.password.length < 8) {
				return toast.error("Password need 8 character minimum!");
			}

			if (user.password != user.cpassword) {
				return toast.error("Confirm password again!");
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
		<>
			{status === "loading" ? (
				<Loader />
			) : (
				<>
					<div className='register-main'>
						<form action='' className='auth-form' onSubmit={createNewUser}>
							<h3>Register </h3>
							<label htmlFor='dp'>
								<img src={imgPreview} alt='' />
							</label>
							<input
								className='file-input'
								id='dp'
								type='file'
								name='avatar'
								accept=".jpg, .jpeg, .png"
								required
								onChange={handleFileChange}
							/>
							<input
								type='name'
								placeholder='Full Name'
								name='name'
								onChange={handleData}
							/>
							<input
								type='email'
								name='email'
								id='email'
								placeholder='Email'
								onChange={handleData}
							/>
							<input
								type='password'
								name='password'
								id='pass1'
								placeholder='Password'
								onChange={handleData}
							/>
							<input
								type='password'
								name='cpassword'
								id='pass2'
								placeholder='Reenter Password'
								onChange={handleData}
							/>
							<button type='submit'> Register </button>
							<hr />
							<p>
								You have alrady registered?
								<Link to={"/login"}> Login Here</Link>
							</p>
						</form>
					</div>
				</>
			)}
		</>
	);
}

export default Register;
