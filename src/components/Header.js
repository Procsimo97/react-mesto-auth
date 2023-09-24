import { Link } from 'react-router-dom';
import logo from '../images/logo.svg'

function Header(props) {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="логотип место"/>
        <Link to={props.route} className="header__link">{props.title}</Link>
      </header>
    )
}

export default Header;