import iconSuccess from '../images/icon_success.svg';
import iconError from "../images/icon_error.svg";


function InfoTooltip(props) {
    return (
        <div className="popup">
            <div className="popup__info">
                <button type="button" className="link popup__exit popup__exit_type_info" onClick={props.onClose} ></button>
                <img className="popup__img-status" src={props.isSuccess ? iconSuccess : iconError} />
                <h2 className="popup__message">{props.title}</h2>
            </div>
        </div>
    )
}
export default InfoTooltip;