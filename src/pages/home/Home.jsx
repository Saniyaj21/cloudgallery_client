import { useEffect, useState } from "react";
import "./home.scss";
import Bottom from "../lauout/bottom/Bottom";
import PhotosPage from "./components/view/PhotosPage";
import TextsPage from "./components/view/TextsPage";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LandingPage from '../lauout/loader/LandingPage';

const Home = () => {
	const [view, setView] = useState("p");
	const { isAuthenticated, user, status } = useSelector(selectUser);
	const navigate = useNavigate();

	const toggleView = (param) => {
		setView(param);
	};

	return (
		<>
			{isAuthenticated ? (
				<div className='home-container'>
					<p>
						<i className='fa-solid fa-circle-info'></i> This is a Beta version.
					</p>
					<div className={`${view === "p" ? "open" : ""} photo-container`}>
						<PhotosPage />
					</div>
					<div className={`${view === "t" ? "open" : ""} text-container`}>
						<TextsPage />
					</div>
				</div>
			) : (
				<LandingPage status={status} />
			)}

			<Bottom toggleView={toggleView} />
		</>
	);
};

export default Home;
