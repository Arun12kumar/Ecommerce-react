import React, { useContext, useState } from 'react'
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
import { SearContext } from "../Context/SearContext";
import Searchlist from './Searchlist';
import { CartContext } from '../Context/AppContext';

const Navbar = () => {
  const { logoutUser,user } = useContext(AuthContext)
  const [inputs,setInput] = useState("");

  const products = useContext(SearContext);
  
  const {cartsData, setcartsData} = useContext(CartContext);
  const [search,setSearch] = useState([])
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

  // const FetchData =(value)=>{
  //   fetch("http://127.0.0.1:8000/api/product/products/")
  //   .then((response) => response.json( )).then((json) =>{
  //     console.log(json);
  //     const results = json.filter((product) =>{
  //       return value && product && product.title && product.title.toLowerCase().includes(value)
        
  //     })
  //     console.log(results)
  //   })
    
  // }

  const fetchProducts = (value) => {
    const results = products.filter((product) => {
      return (
        value &&
        product &&
        product.title &&
        product.title.toLowerCase().includes(value.toLowerCase())
      );
    });
    console.log(results);
    setSearch(results);
  };

  const handleChange=(value) =>{
    setInput(value)
    fetchProducts(value);
  }


  return (

    <div className={Navcss.container}>
      <div className={Navcss.items}><Link to = '/'><img src={flipkartLogo} alt="flipkartLogo" /></Link></div>
      <div className={Navcss.items3}>
        <div className={Navcss.search}><CiSearch className={Navcss.searchlogo} /><Link to="/result"><input type="text" value={inputs} placeholder='Search For Products' className={Navcss.input} onChange={(e) => handleChange(e.target.value)}/></Link><div className={Navcss.searchlist}><Searchlist results={search}/></div></div>
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
      <div className={Navcss.items4}><Link to='/cart' ><div id={Navcss.cartitem}><IoCartOutline className={Navcss.logo}  /> Cart <p id={Navcss.cartnum}>{cartsData.length}</p></div></Link></div>
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