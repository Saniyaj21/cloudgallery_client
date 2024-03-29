import React from "react";
import { ThreeDots } from "react-loader-spinner";
import "./loader.scss";
const Loader = ({text = 'Loading'}) => {
	return (
		<div className='loader-div'>
			<span>{text}</span>
			<ThreeDots
				height='40'
				width='40'
				radius='7'
				color='white'
				ariaLabel='three-dots-loading'
				wrapperStyle={{width: '40px' }}
				wrapperClassName='custom-loader-style'
				visible={true}
			/>
		</div>
	);
};

export default Loader;
