import React, { useContext } from 'react'
import flipkartLogo from '../images/fkheaderlogo_exploreplus-44005d.svg'
import { CiSearch } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { IoMdHeartEmpty } from "react-icons/io";
import { LiaBoxSolid } from "react-icons/lia";
import { IoCartOutline } from "react-icons/io5";
import Navcss from '../cssfolder/navbar.module.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { CiShop } from "react-icons/ci";
import AuthContext from "../Context/AuthContext"
import { Link } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { IoIosLogOut } from "react-icons/io";



const Navbar = () => {
  const { logoutUser,user } = useContext(AuthContext)

  const token = localStorage.getItem('authTokens')

  if (token) {
    const decoded = jwt_decode(token)
    var user_id = decoded.user_id
    console.log(user_id)
  }
  let username = "";
  if (token && user) {
    username = user.username;
  }
  return (

    <div className={Navcss.container}>
      <div className={Navcss.items}><Link to = '/'><img src={flipkartLogo} alt="flipkartLogo" /></Link></div>
      <div className={Navcss.items3}>
        <div className={Navcss.search}><CiSearch className={Navcss.searchlogo} /><input type="text" placeholder='Search For Products' className={Navcss.input} /></div>
      </div>
      <div className={Navcss.items}>
        <Dropdown>
          <Dropdown.Toggle className={Navcss.btnlogin} variant="none" id="dropdown-basic">
          {token === null &&
            <><RxAvatar className={Navcss.logo} /> Account</> 
          }
          {token !== null &&
          <><RxAvatar className={Navcss.logo} /> {username}</> 
          }
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/"><span><RxAvatar /> My Profile</span></Dropdown.Item>
            <Dropdown.Item href="/"><span><LiaBoxSolid /> Orders</span></Dropdown.Item>
            <Dropdown.Item href="/"><span><IoMdHeartEmpty /> Wishlist</span></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={Navcss.items4}><Link to='/cart'><IoCartOutline className={Navcss.logo} /> Cart</Link></div>
      <div className={Navcss.items4}><CiShop className={Navcss.logo} />Seller</div>
      {token === null &&
        <>
          <div className={Navcss.items4}><Link to='login'> Login</Link> </div>
          <div className={Navcss.items4}><Link to='register'>Register</Link> </div>
        </>
      }

      {token !== null &&
        <>
          <div className={Navcss.items4}> Dashboard</div>
          <div className={Navcss.items4}><button className={Navcss.butto} onClick={logoutUser}><IoIosLogOut className={Navcss.logo} />Logout</button></div>
        </>
      }

    </div>

  )
}

export default Navbar