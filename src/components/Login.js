import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Login() {
  return (
    <AuthForm title={"Регистрация"} 
              button={"Зарегистрироваться"}>
                <p className="auth-form__text">Уже зарегистрированы?
                  <Link to="/sign-in" className="auth-form__link">Войти</Link>
                </p>
    </AuthForm>
  )
}
export default Login;