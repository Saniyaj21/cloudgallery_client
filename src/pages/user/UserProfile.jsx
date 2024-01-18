import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserProfile, selectUser } from "../../redux/slices/authSlice";

const UserProfile = () => {
	const params = useParams();
	const { selectedUser } = useSelector(selectUser);
	let userId = params.id;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUserProfile(userId));
	}, [dispatch]);

	return (
		<div className='profilePage'>
			<div>
				<img src={selectedUser?.avatar?.url} alt='' />
			</div>
			<br />
			<div>Name : {selectedUser?.name}</div>
			<div>ID : {selectedUser?._id}</div>

			<div>Email : {selectedUser?.email}</div>
		</div>
	);
};

export default UserProfile;
