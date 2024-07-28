import React, { Fragment, useEffect, useState } from "react";
import "./publicPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
	allImages,
	allPublicImages,
	deleteImage,
	likeImage,
	resetState,
	selectImages,
	unlikeImage,
} from "../../../../redux/slices/imageSlice";
import Loader from "../../../lauout/loader/Loader";
import { toast } from "react-toastify";
import { selectUser } from "../../../../redux/slices/authSlice";
import { Link } from "react-router-dom";

const TextsPage = () => {
	const { publicImages, images, postStatus, error, likeChanges } =
		useSelector(selectImages);
	const { user } = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(resetState());
		dispatch(allPublicImages());
	}, [images?.length, likeChanges]);

	const deleteImageHandler = (id) => {
		dispatch(deleteImage(id));
		toast.success("Deleted Successfully!", {
			position: "top-right",
			autoClose: 5000,
			closeOnClick: true,
			theme: "colored",
		});
	};

	const handleDownload = (imageUrl, fileName) => {
		fetch(imageUrl)
			.then((response) => response.blob())
			.then((blob) => {
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = fileName;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			})
			.catch((error) => console.error("Error downloading image:", error));
	};

	const handleLikeUnlike = (id, img) => {
		if (img.likes.includes(user._id)) {
			dispatch(unlikeImage({ id, userId: user._id }));
		} else {
			dispatch(likeImage({ id, userId: user._id }));
		}
	};

	console.log(publicImages);
	return (
		<div className='public-page-div'>
			{publicImages &&
				publicImages.map((img) => (
					<Fragment key={img._id}>
						{img?.isPublic ? (
							<div>
								<div>
									<div>
										<Link to={`/profile/${img.user._id}`}>
											<img src={img.user?.avatar?.url} alt={img.user.name} />
										</Link>
										<p>{img.user.name}</p>
									</div>
									<p>{img.caption}</p>
								</div>
								<div>
									<img src={img.url} className='show-image' />
								</div>
								<div>
									<div className='btn-group'>
										{/* <button
											onClick={() => {
												handleLikeUnlike(img._id, img);
											}}
										>
											<i
												className={` fa-solid fa-heart ${
													img.likes.includes(user._id) ? "liked-red-heart" : ""
												}`}
											></i>
										</button> */}
										<button>
											<i className='fa-solid fa-share-from-square'></i>
										</button>
										<button
											onClick={() => {
												handleDownload(img.url, img.public_id);
											}}
										>
											<i className='fa-solid fa-download'></i>
										</button>
										{img.user._id === user._id ? (
											<button
												onClick={() => {
													deleteImageHandler(img._id);
												}}
											>
												<i className='fa-solid fa-trash'></i>
											</button>
										) : (
											""
										)}
									</div>
								</div>
							</div>
						) : (
							""
						)}
					</Fragment>
				))}
			{postStatus === "loading" ? <Loader /> : ""}
		</div>
	);
};

export default TextsPage;
