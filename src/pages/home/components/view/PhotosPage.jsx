import React, { useEffect, useState } from "react";
import "./photosPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
	allImages,
	deleteImage,
	resetState,
	selectImages,
} from "../../../../redux/slices/imageSlice";
import Loader from "../../../lauout/loader/Loader";
import { toast } from "react-toastify";

const PhotosPage = () => {
	const { images, postStatus, error } = useSelector(selectImages);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetState());
		dispatch(allImages());
	
	}, []);

	const deleteImageHandler = (id) => {
		dispatch(resetState());
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

	return (
		<div className='photo-page-div'>
			{images &&
				images.map((img, index) => (
					<div key={index}>
						<div>
							<p>{img.caption}</p>
						</div>
						<div>
							<img src={img.url} className='show-image' />
						</div>
						<div>
							<button
							onClick={() => {
								img &&
									navigator.clipboard.writeText(img?.url).then(() => {
										toast.success("Url copied");
									});
							}}
							>
								<i className='fa-solid fa-share-from-square'></i>
							</button>
							<button
								onClick={() => {
									deleteImageHandler(img._id);
								}}
							>
								<i className='fa-solid fa-trash'></i>
							</button>
							<button
								onClick={() => {
									handleDownload(img.url, img.public_id);
								}}
							>
								<i className='fa-solid fa-download'></i>
							</button>
						</div>
					</div>
				))}
			{postStatus === "loading" ? <Loader /> : ""}
		</div>
	);
};

export default PhotosPage;
