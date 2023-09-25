import { useState } from "react";
import AuthForm from "./AuthForm";


function Login(props) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(formValue);

  }

    return (
      <AuthForm title={"Вход"} 
                button={"Войти"}
                onSubmit={handleSubmit}
                >
                
      </AuthForm>
    )
}
export default Login;