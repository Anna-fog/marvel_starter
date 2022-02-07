import img from './error.gif';
import './errorMessasge.scss';

const ErrorMessage = () => {
    return (
        <img className="error-img" src={img} alt="Error"/>
    )
}

export default ErrorMessage;