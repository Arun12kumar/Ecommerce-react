import React, { useEffect } from 'react'
import PlaceCss from '../cssfolder/placeorder.module.css'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import chacta from '../images/catcha.png'
import { BsPatchCheckFill } from "react-icons/bs";

import axios from 'axios';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
const swal = require('sweetalert2')


const Placeorder = () => {

  const [show, setShow] = useState(false)
  const [card, setCard] = useState(false)
  const [cash, setCash] = useState(false)

  const [pay, setPay] = useState([])
  const [orderId, setOrderId] = useState([])
  const [ordes, setOrdes] = useState([])
  
  const [PayMethod, setPayMethod] = useState('')
  const [usdAmount, setUsdAmount] = useState('');
 


  


  const Datatake = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/product/processorder/');
      setPay(response.data);
      setOrdes(response.data[0])
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  console.log(pay)
  console.log(usdAmount)
  

  useEffect(() => {
    Datatake();
    
  }, [])

  function onChangePayment(payMethod) {
    setPayMethod(payMethod.toLowerCase());
  }

  function Paybtnhadle() {
    if (PayMethod !== "") {
      onChangePayment(PayMethod)
    }
    else {
      alert('select payment type')
    }
  }
  

  const updateOrderStatus = async(orderId) =>{
    const data = {
      status: true,
           
    };
  
    const response = await axios.put(`http://127.0.0.1:8000/api/product/orderupdate/${orderId}/`, data, {
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
    });
    console.log(response);
    

    const myorder = {
      amount: ordes.total_amount,
      items: ordes.name,
      order_no: ordes.slug,
      order_status: true,
      payment_date: ordes.payment_date,   
    };
    const orderresp = await axios.post("http://127.0.0.1:8000/api/product/myorder/", myorder, {
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
      },
    });
    console.log(orderresp);

  }


  const removeorderhandle = async(itemID) =>{
    const cancel = await axios.delete(`http://127.0.0.1:8000/api/product/orderupdate/${itemID}/`)
    console.log(cancel)
  }

  const payaddhandle = (payId,payamount) =>{
    setOrderId(payId);
    console.log(payId)
    console.log(payamount)
    setUsdAmount(((payamount) / 82.75).toFixed(2));

  }

  return (
    <div className={PlaceCss.mainplace}>
      <div className={PlaceCss.container}>
        <div className={PlaceCss.items1}>
          <div className={PlaceCss.box1}>PAYMENT OPTIONS</div>
          <div className={PlaceCss.box2}>
            <div className={PlaceCss.first} onClick={() => { setShow(!show) }}><img id={PlaceCss.logo} src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/batman-returns/logos/UPI.gif" alt="..." /><button id={PlaceCss.butts}>UPI</button>Pay By And UPI App <button id={PlaceCss.toogle} onClick={() => { setShow(!show) }}>{show ? 'Hide' : 'Show'}</button></div>
            {
              show ? <div className={PlaceCss.first1}>
                <h6>Choose Options :</h6>
                <form>
                  <div><input type="radio" name='payMethod' onChange={() => onChangePayment('Paypal')} /> PayPal</div>
                  <div><input type="radio" name='payMethod' onChange={() => onChangePayment('Stripe')} /> Stripe</div>
                  <div><input type="radio" name='payMethod' onChange={() => onChangePayment('Razorepay')} /> Razorepay</div>
                  <div><button type='button' className='btn btn-success' onClick={Paybtnhadle}>Next</button></div>
                  
                </form>
                <div>
                  {PayMethod === 'paypal' &&
                    <PayPalScriptProvider options={{ "client-id": "Aagf9DZ2oGn9Fg4TymOuZfWHnTzR1OtCgm2Pvy5jhc4PpSI7AqGetWtS905qI8I2z717x0_2T-l60L6H" }}>
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: 'USD',
                                  value: usdAmount,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, action) => {
                          return action.order.capture().then((details) => {
                            const name = details.payer.name.given_name;
                            
                            swal.fire({
                              position: "center",
                              icon: "success",
                              title: `Transaction completed by ${name}`,
                              showConfirmButton: false,
                              timer: 3500
                            });
                            
                            updateOrderStatus(orderId)
                          });
                        }}
                      />
                    </PayPalScriptProvider>
                  }
                </div>
              </div> : null
            }
          </div>
          <div className={PlaceCss.box3}>
            <div className={PlaceCss.first} onClick={() => { setCard(!card) }}><img id={PlaceCss.logo} src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/batman-returns/logos/UPI.gif" alt="..." /><button id={PlaceCss.butts}>Credit/Debit/ATM Card</button><button id={PlaceCss.toogle} onClick={() => { setCard(!card) }}>{card ? 'Hide' : 'Show'}</button></div>
            {
              card ? <div className={PlaceCss.first1}><input className='form-control' type="number" placeholder='Card Number' /> <div id={PlaceCss.atm}><input className='form-control' type="month" defaultValue="2019-05" /><input className='form-control' type="number" placeholder='CVV' /></div><Button variant="success">PAY</Button></div> : null
            }
          </div>
          <div className={PlaceCss.box4}>
            <div className={PlaceCss.first} onClick={() => { setCash(!cash) }}><img id={PlaceCss.logo} src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/batman-returns/logos/UPI.gif" alt="..." /><button id={PlaceCss.butts}>Cash On Delivery</button><button id={PlaceCss.toogle} onClick={() => { setCash(!cash) }}>{cash ? 'Hide' : 'Show'}</button></div>
            {
              cash ? <div className={PlaceCss.first1}><img src={chacta} alt="" /><input className='form-control' type="number" placeholder='Enter the Character' /> <Button variant="success">PAY</Button></div> : null
            }
          </div>

        </div>
        <div className={PlaceCss.items2}>
          <div className={PlaceCss.sect}><h5><BsPatchCheckFill id={PlaceCss.checkicon} />  Your Order Has Confirmed</h5></div>


          {pay.map((item) => (
            <div key={item.id}>
              <div className={PlaceCss.sect1} id={PlaceCss.sect11} ><li>{item.name}</li></div>
              <div className={PlaceCss.sect1} id={PlaceCss.sect11} ><h6>Order Id :</h6><h6 style={{ fontSize: "11px" }}>{item.slug}</h6></div>
              <div className={PlaceCss.sect1} id={PlaceCss.sect11} ><h5>Amount Payable</h5><h5>₹{item.total_amount}</h5></div>
              <div style={{margin:"5px 0px"}}><button className='btn btn-success' onClick={() => payaddhandle(item.id,item.total_amount)}>Pay</button>  <button className='btn btn-danger' onClick={() => removeorderhandle(item.id)}>Cancel Order</button></div>
              
            </div>

          ))}


          <div className={PlaceCss.sect3}><h5>You will save ₹940 on this order</h5></div>
          


        </div>
      </div>
    </div>
  )
}

export default Placeorder