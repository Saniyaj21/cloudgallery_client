import "./progress.scss";
const Progress = ({step}) => {
	return (
		<div className='progress-main'>
           
			<div className={`circle ${step >= 1? "active-circle":""}`}>
				<div>
					<i className='fa-solid fa-envelope'></i>
				</div>
			</div>

			<div className={`line ${step >= 1? "active-line":""}`}></div>

			<div className={`circle ${step >= 2? "active-circle":""}`}>
				<div>
					<i className='fa-solid fa-circle-check'></i>
				</div>
			</div>
			<div className={`line ${step >= 2? "active-line":""}`}></div>

			<div className={`circle ${step >= 3? "active-circle":""}`}>
				<div>
					<i className='fa-solid fa-lock'></i>
				</div>

			</div>
		</div>
	);
};

export default Progress;
