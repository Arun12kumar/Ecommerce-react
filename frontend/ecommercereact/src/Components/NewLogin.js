import React, { useContext } from 'react'
import Logincss from "../cssfolder/Login.module.css"
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import AuthContext from "../Context/AuthContext"


const NewLogin = () => {
  const {loginUser} = useContext(AuthContext)
  const handleSubmit=(e) =>{
    e.preventDefault();

    const email = e.target.email.value
    const password = e.target.password.value

    email.length > 0 && loginUser(email, password)


  }
  return (
    <div>
      <div className={Logincss.container}>
        <form onSubmit={handleSubmit} className={Logincss.forms} >
        <div className={Logincss.items}><h1>Sign In</h1></div>
          <div className={Logincss.items}><input className={Logincss.loginput} type="text" placeholder='Email' name='email'/></div>
          <div className={Logincss.items}><input className={Logincss.loginput} type="password" placeholder='Password'name='password'/></div>
          <div className={Logincss.items}><Button className={Logincss.loginbtn} variant="success" type='submit'>Login</Button></div>
          <div className={Logincss.items}><p>Don't have an account? <Link to='register'>Register</Link></p></div>
        </form>

      </div>
    </div>
  )
}

export default NewLogin