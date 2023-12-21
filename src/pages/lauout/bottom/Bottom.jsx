import './bottom.scss';
import { Link } from 'react-router-dom';

const Bottom = ({toggleView}) => {
  return (
    <div className='bottom'>
			<div onClick={()=>toggleView('p')}>
				<p>
					Photos <i className="fa-regular fa-image"></i>
				</p>
			</div>
			<div onClick={()=>toggleView('t')}>
				<p >
					Texts <i className="fa-solid fa-envelope-open-text"></i>
				</p>
				
			</div>
		</div>
  )
}

export default Bottom