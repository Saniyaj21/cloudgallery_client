// LandingPage.js

import React from "react";
import "./landingPage.scss";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const LandingPage = ({ status }) => {
	return (
		<div className='landing-page'>
			<header>
				<h1>Your Cloud Gallery</h1>
				<p>Upload, share, and organize your memories with ease.</p>
				<Link to={'/compress'}><button>Compress Image</button></Link>
			</header>

			<section className='features'>
				<div className='feature'>
					<h2>Upload Photos</h2>
					<p>Easily upload and store your photos in the cloud.</p>
				</div>

				<div className='feature'>
					<h2>Share with Others</h2>
					<p>Share your favorite moments with friends and family.</p>
				</div>

				<div className='feature'>
					<h2>Organize Albums</h2>
					<p>Create and manage albums to keep your photos organized.</p>
				</div>
			</section>
			<section className='join-us'>
				<Link to={"/register"}>
					<h2>Join Us</h2>
				</Link>
				{status === "loading" ? <Loader text='Trying To Login' /> : ""}
			</section>
		</div>
	);
};

export default LandingPage;
