import React, { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import "./compress.scss";
import { MdCloudUpload } from "react-icons/md";
import { MdCloudDownload } from "react-icons/md";

const Compress = () => {
	const [resultImg, setResultImg] = useState();
	const [imgPreview, setImgPreview] = useState("/image.png");
	const [percent, setPercentage] = useState(1);
	const [originalSize, setOriginalSize] = useState(0);
	const [v, setV] = useState(null);
	const [CPSize, setCPSize] = useState(null);
	const [loading, setLoading] = useState(false);


	console.log(percent, originalSize);
	console.log(loading);

	useEffect(() => {
		if (v !== null) {
			handleImageUpload(v);
		}
	}, [percent]);

	const handleImageUpload = async (imageFile) => {
		console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
		let originalSize = imageFile.size / 1024 / 1024;
		setOriginalSize(originalSize.toFixed(3));
		setLoading(true)

		const options = {
			maxSizeMB: (percent / 10).toFixed(1),
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		};
		try {
			const compressedFile = await imageCompression(imageFile, options);
			setLoading(false)

			console.log(
				`compressedFile size ${compressedFile.size / 1024 / 1024} MB`
			);
			setCPSize((compressedFile.size / 1024 / 1024).toFixed(3))

			const reader = new FileReader();

			reader.onload = function (e) {
				setResultImg(e.target.result);
				setImgPreview(e.target.result);
			};
			reader.readAsDataURL(compressedFile);
		} catch (error) {
			console.log(error);
		}
	};

	const setImageHandler = (e) => {
		const image = e.target.files[0];
		setV(image);
		handleImageUpload(image);
		const reader = new FileReader();

		reader.onload = function (e) {
			setImgPreview(e.target.result);
		};
		reader.readAsDataURL(image);
	};

	return (
		<div className='compress-container'>
			<div className='btn-container'>
				<form action=''>
					<label htmlFor="img" className="img-level"><MdCloudUpload /><span>Upload image</span></label>
					<input onChange={setImageHandler} type='file' name='' id='img' />
				</form>
				{resultImg && (
					<a
						href={resultImg}
						download='compressed_image.jpg'
						className='download-link'
					>
						<MdCloudDownload /> <span>Download</span>
					</a>
				)}
			</div>
			<div className='result-container'>
				<div className='images-box'>
					<div>
						<img className='compress-img' src={imgPreview} alt='' />
						<p>Original Size: {originalSize}mb</p>
					</div>
					{
						loading === true ? <h2>Processing...</h2> : resultImg ? <div>
							<img className='compress-img' src={resultImg} alt='hi' />
							<p>Compress Size: {CPSize * 1000}kb</p>
						</div> : ""
					}
				</div>
				<div className='size-range'>
					<input
						type='range'
						min='1'
						max='100'
						value={percent}
						onChange={(e) => setPercentage(e.target.value)}
					/>
					<p>{percent}% of File Size</p>

				</div>
			</div>
		</div>
	);
};

export default Compress;
