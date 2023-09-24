import { useState } from "react";
import AuthForm from "./AuthForm"

function Register(props) {
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
    props.onRegister({email, password});

  }

    return (
      <AuthForm title={"Вход"} 
                button={"Войти"}
                onChange={handleChange}
                onSubmit={handleSubmit}>
                
      </AuthForm>
    )
}
export default Register;