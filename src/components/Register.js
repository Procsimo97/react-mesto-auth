import { Link } from "react-router-dom";
import { useState } from "react";
import AuthForm from "./AuthForm";

function Register({onRegister}) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange =(e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name] : value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = formValue;
    if (!email || !password) {
      return;
    }
    console.log(formValue);
    onRegister(formValue);

  }

  return (
    <AuthForm title={"Регистрация"} 
              button={"Зарегистрироваться"}
              onChange={handleChange}
              onSubmit={handleSubmit}>
                <p className="auth-form__text">Уже зарегистрированы?
                  <Link to="/sign-in" className="auth-form__link">Войти</Link>
                </p>
    </AuthForm>
  )
}
export default Register;