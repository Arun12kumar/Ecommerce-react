import React, { useState,useContext } from 'react'
import RegCss from '../cssfolder/register.module.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import AuthContext from "../Context/AuthContext"


const Register = () => {

  const[email, setEmail] = useState("")
  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("")
  const[password2, setPassword2] = useState("")

  const {registerUser} = useContext(AuthContext)
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    registerUser(email, username, password, password2);


  }


  return (
    <div>
      <div>
        <div className={RegCss.container}>
          <form className={RegCss.forms}onSubmit={handleSubmit}>
            <div className={RegCss.items}><h1>Sign In</h1></div>
            <div className={RegCss.items}><input onChange={(e) => setEmail(e.target.value)} className={RegCss.loginput} type="text" placeholder='Email' name='email'/></div>
            <div className={RegCss.items}><input onChange={(e) => setUsername(e.target.value)} className={RegCss.loginput} type="text" placeholder='Username' name='username'/></div>
            <div className={RegCss.items}><input onChange={(e) => setPassword(e.target.value)} className={RegCss.loginput} type="password" placeholder='Password' name='password'/></div>
            <div className={RegCss.items}><input onChange={(e) => setPassword2(e.target.value)} className={RegCss.loginput} type="password" placeholder='Confirm Password' name='password2'/></div>
            <div className={RegCss.items}><Button className={RegCss.loginbtn} variant="primary" type='submit'>Register</Button></div>
            <div className={RegCss.items}><p> Have an account? <Link to='login'>Login</Link></p></div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Register