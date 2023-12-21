import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/authSlice";
import "./profile.scss";

const Profile = () => {
	const { user } = useSelector(selectUser);
	return (
		<div className='profilePage'>
			<div>
				<img src={user?.avatar?.url} alt='' />
				<span>
					<i className='fa-solid fa-pen-to-square'></i>
				</span>
			</div>
			<br />
			<div>
				Name : {user?.name} <i className='fa-solid fa-pen-to-square'></i>
			</div>
			<div>ID : {user?._id}</div>

			<div>Email : {user?.email}</div>
		</div>
	);
};

export default Profile;
