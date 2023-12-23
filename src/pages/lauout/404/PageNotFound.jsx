import './pageNotFound.scss';
import { Link } from 'react-router-dom';
const PageNotFound = () => {
  return (
    <div className='page-not-found'>
        <h2>Page Not Found</h2>
        <Link to={'/'}>Refresh</Link>
    </div>
  )
}

export default PageNotFound