import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";

function Option() {
	const navigete = useNavigate()
	const { id } = useParams();
	const [image, setImage] = useState({});
 
	const getData = async () => {
		// unique image
		try {
			const { data } = await axios.get(`http://localhost:8080/api/images/${id}`,{
				headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,}
			);
			setImage(data.Image);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, [id]);

	const deleteImage = async () => {
		try {
			const {data} = await axios.delete(`http://localhost:8080/api/images/${id}`,{
				headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,})

			if(data.success === true ){
				navigete('/')
			}
		} catch (err) {
			console.log(err);
		}``
	};

	return (
		<div>
			<h3>Manage your Image</h3>
			{image && (
				<div>
					<img src={image.url} alt='Image' />
					<p>{image.caption}</p>
					<button onClick={deleteImage}>delete</button>
				</div>
			)}
		</div>
	);
}

export default Option;
