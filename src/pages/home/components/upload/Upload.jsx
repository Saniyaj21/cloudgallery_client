import { useState } from "react";
import "./upload.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../lauout/loader/Loader";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

import {
	postImage,
	resetState,
	selectImages,
} from "../../../../redux/slices/imageSlice";

const Upload = () => {
	const [imageData, setImageData] = useState();
	const [imgPreview, setImgPreview] = useState("/image.png");
	const [caption, setCaption] = useState("");
	const [loading, setLoading] = useState(false);
	const [visiblity, setVisiblity] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { status } = useSelector(selectImages);

	const handleImageUpload = async (event) => {
		const imageFile = event.target.files[0];

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
				setImageData(e.target.result);
				setImgPreview(e.target.result);
			};

			reader.readAsDataURL(compressedFile);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		toast.info("Image Uploading!", {
			position: "top-right",
			autoClose: 5000,
			closeOnClick: true,
			theme: "colored",
		});
		const myForm = new FormData();
		myForm.set("imageData", imageData);
		myForm.append("caption", caption);
		myForm.append("isPublic", visiblity);
		dispatch(resetState());
		dispatch(postImage(myForm));
		if (status === "succeeded") {
			navigate("/");
		}
	};

	return (
		<>
			{status === "loading" ? (
				<Loader />
			) : (
				<>
					<div className='form-container'>
						<form action='' onSubmit={handleSubmit}>
							<label className='label' htmlFor='file'>
								{imgPreview && (
									<img
										id='image'
										className='input-image'
										src={imgPreview}
										alt=''
									/>
								)}
							</label>
							<h3>Select Image</h3>
							<hr />
							<input
								hidden
								className='file'
								type='file'
								name='file'
								id='file'
								accept='image/*'
								onChange={handleImageUpload}
							/>

							<br></br>

							<h3 className='visiblity'>
								Visiblity : {" "}
								{visiblity ? (
									<span onClick={()=>setVisiblity(!visiblity)}>
										Public <i className='fa-solid fa-earth-asia'></i>
									</span>
								) : (
									<span onClick={()=>setVisiblity(!visiblity)}>
										Only You <i className='fa-solid fa-lock'></i>
									</span>
								)}
							</h3>
							<h3>Enter a description</h3>

							<textarea
								className='caption'
								name='caption'
								placeholder='Type...'
								onChange={(e) => setCaption(e.target.value)}
								value={caption}
								id=''
								cols='30'
								rows='10'
							></textarea>

							<button className='submit' type='submit' disabled={loading}>
								Upload <i className='fa-solid fa-cloud-arrow-up'></i>
							</button>
						</form>
					</div>
				</>
			)}
		</>
	);
};

export default Upload;
