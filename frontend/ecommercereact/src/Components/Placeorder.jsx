import React from 'react'
import PlaceCss from '../cssfolder/placeorder.module.css'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import chacta from '../images/catcha.png'
import shirtimg from '../images/m-askpqrgf367985-allen-solly-original-imagxfevmv5rtgxc.jpeg'

const Placeorder = () => {

  const [show,setShow] = useState(false)
  const [card,setCard] = useState(false)
  const [cash,setCash] = useState(false)


  return (
    <div className={PlaceCss.mainplace}>
      <div className={PlaceCss.container}>
        <div className={PlaceCss.items1}>
          <div className={PlaceCss.box1}>PAYMENT OPTIONS</div>
          <div className={PlaceCss.box2}>
            <div className={PlaceCss.first} onClick={() =>{setShow(!show)}}><input type="radio" /><img id={PlaceCss.logo} src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/batman-returns/logos/UPI.gif" alt="..." /><button id={PlaceCss.butts}>UPI</button>Pay By And UPI App <button id={PlaceCss.toogle} onClick={() =>{setShow(!show)}}>{show ? 'Hide' : 'Show'}</button></div>
            {
              show?<div className={PlaceCss.first1}><h6>Choose Options :</h6><div><input type="radio" /> PhonePay</div><div><input type="radio" /> Your UPI ID</div></div>:null
            }
          </div>
          <div className={PlaceCss.box3}>
            <div className={PlaceCss.first} onClick={() =>{setCard(!card)}}><input type="radio" /><img id={PlaceCss.logo} src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/batman-returns/logos/UPI.gif" alt="..." /><button id={PlaceCss.butts}>Credit/Debit/ATM Card</button><button id={PlaceCss.toogle} onClick={() =>{setCard(!card)}}>{card ? 'Hide' : 'Show'}</button></div>
              {
                card?<div className={PlaceCss.first1}><input className='form-control' type="number" placeholder='Card Number'/> <div id={PlaceCss.atm}><input className='form-control' type="month" defaultValue="2019-05" /><input className='form-control' type="number" placeholder='CVV'/></div><Button variant="success">PAY</Button></div>:null
              }
          </div>
          <div className={PlaceCss.box4}>
            <div className={PlaceCss.first} onClick={() =>{setCash(!cash)}}><input type="radio" /><img id={PlaceCss.logo} src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/batman-returns/logos/UPI.gif" alt="..." /><button id={PlaceCss.butts}>Cash On Delivery</button><button id={PlaceCss.toogle} onClick={() =>{setCash(!cash)}}>{cash ? 'Hide' : 'Show'}</button></div>
                {
                  cash?<div className={PlaceCss.first1}><img src={chacta} alt="" /><input className='form-control' type="number" placeholder='Enter the Character'/> <Button variant="success">PAY</Button></div>:null
                }
          </div>

        </div>
        <div className={PlaceCss.items2}>
          <div className={PlaceCss.sect}><h5>PRICE DETAILS</h5></div>
          <div className={PlaceCss.sect1}><p>Price (1 item)</p><p>₹1,699</p></div>
          <div className={PlaceCss.sect1} id={PlaceCss.sect1}><p>Delivery Charges</p><p id={PlaceCss.para}> Free</p></div>
          <div className={PlaceCss.sect1} id={PlaceCss.sect2}><img src={shirtimg} alt="" /><div><h6>PUMA Solid Men Polo Neck Black T-Shirt</h6><p>Size: S</p><p>Seller:PumaSportsIndia</p></div></div>
          <div className={PlaceCss.sect1} id={PlaceCss.sect11}><h5>Amount Payable</h5><h5>₹759</h5></div>
          <div className={PlaceCss.sect3}><h5>You will save ₹940 on this order</h5></div>

        </div>
      </div>
    </div>
  )
}

export default Placeorder