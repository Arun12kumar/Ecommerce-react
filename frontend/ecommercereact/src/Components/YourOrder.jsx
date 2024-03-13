import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { HiMiniCheckBadge } from "react-icons/hi2";
import { MdDangerous } from "react-icons/md";

const YourOrder = () => {
    const [order, setOrder] = useState([])



    useEffect (() =>{
        const getData = async () => {
            const response = await axios.get("http://127.0.0.1:8000/api/product/myorder/")
            console.log(response.data)
            setOrder(response.data)
        }
        getData()

    },[])





  return (
    <div>
        <h1 style={{textAlign: "center",padding:"20px 0px"}}>My Orders</h1>
        <Container>
        <table className="table" style={{textAlign: "center", border:"1px solid lightgray"}}>       
            <thead>
                <tr>
                    <th>Si.No</th>
                    <th>Products</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Order Date</th>
                    <th>Order ID</th>
                </tr>
                {order.map((item, index) =>(
                <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td style={{textAlign:"start"}} >{item.items}</td> 
                    <td>{item.amount}</td>
                    <td >{item.order_status ? <HiMiniCheckBadge style={{color:"green"}}/> : <MdDangerous  style={{color:"red"}}/>}</td>
                    <td style={{width: "160px"}}>{(item.payment_date).slice(0,10)}</td>
                    <td style={{textAlign:"start"}}>{item.order_no}</td>
                </tr>
                ))}
            </thead>
        </table>
        </Container>

    </div>
  )
}

export default YourOrder