import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage, likeImage, selectImages } from "../../../../redux/slices/imageSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { selectUser } from "../../../../redux/slices/authSlice";



const PublicImageCard = ({img }) => {
    const dispatch = useDispatch();
    const { publicImages} = useSelector(selectImages);
    const { user } = useSelector(selectUser);


	useEffect(() => {
		
	}, [publicImages]);



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

	const handleLikeUnlike = (id) => {
		dispatch(likeImage({ id, userId: user._id }));
	};



    return (
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
									handleLikeUnlike(img._id);
								}}
							>
								<i className='fa-solid fa-heart'></i>
							</button> */}
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
	);
};

export default PublicImageCard;
