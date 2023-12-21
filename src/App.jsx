import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";

import Option from "./pages/options/Option.jsx";
import Login from "./pages/auth/login/Login.jsx";
import ForgotPass from "./pages/auth/pass/ForgotPass";
import Otp from "./pages/auth/pass/Otp.jsx";
import NewPass from "./pages/auth/pass/NewPass.jsx";
import Header from "./pages/lauout/header/Header.jsx";
import Upload from "./pages/home/components/upload/Upload.jsx";
import { getUser, selectUser } from "./redux/slices/authSlice.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Profile from "./pages/user/Profile.jsx";
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";
import Register from './pages/auth/register/Register.jsx';

function App() {
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector(selectUser);

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	return (
		<Router>
			<Header />
			<ToastContainer />
			<Routes>
				{/* Restricted routes */}
				<Route element={<ProtectedRoute />}>
					<Route path='/' element={<Home />} />
					<Route path='/upload' element={<Upload />} />
					<Route path='/profile' element={<Profile />} />
				</Route>

				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />

				<Route path='/:id' element={<Option />} />
				<Route path='/auth/forgotPassword' element={<ForgotPass />} />
				<Route path='/auth/forgotPassword/otp' element={<Otp />} />
				<Route path='/auth/forgotPassword/newpass' element={<NewPass />} />
			</Routes>
		</Router>
	);
}

export default App;
