import { useEffect, useState } from "react";
import "./home.scss";
import Bottom from "../lauout/bottom/Bottom";
import PhotosPage from "./components/view/PhotosPage";
import TextsPage from "./components/view/TextsPage";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
const Home = () => {
	const [view, setView] = useState("p");
	const { isAuthenticated } = useSelector(selectUser);
	const navigate = useNavigate();

	const toggleView = (param) => {
		setView(param);
	};

	return (
		<>
			<div className='home-container'>
				<div className={`${view === "p" ? "open" : ""} photo-container`}>
					<PhotosPage />
				</div>
				<div className={`${view === "t" ? "open" : ""} text-container`}>
					<TextsPage />
				</div>
			</div>
			<Bottom toggleView={toggleView} />
		</>
	);
};

export default Home;
