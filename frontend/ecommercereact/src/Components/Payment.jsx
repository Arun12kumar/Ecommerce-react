import axios from 'axios'
import React, { useEffect } from 'react'

const Payment = () => {

    const Datatake = async()=>{
        const response = await axios.get('http://127.0.0.1:8000/api/payment/gettoken/1/')
        console.log(response.data.clientToken)
      }
    
      useEffect(()=>{
        Datatake();
      },[])
    
  return (
    <div>Payment</div>
  )
}

export default Payment