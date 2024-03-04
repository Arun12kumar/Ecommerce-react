import React from 'react'
import orderCss from '../cssfolder/order.module.css'
// import shirtimg from '../images/m-askpqrgf367985-allen-solly-original-imagxfevmv5rtgxc.jpeg'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';


const CartOreder = () => {

    const [order, setOrder] = useState([])
    // const [allorder, setAllorder] = useState([])
    


    // const { id } = useParams();


    const productData = async () => {

        // const response = await axios.get(`http://127.0.0.1:8000/api/product/orderdetail/${id}`)
        const response = await axios.get("http://127.0.0.1:8000/api/product/order/")
        // setOrder(response.data)
        // console.log(response.data)
        setOrder(response.data);
        console.log(response.data)

    }
    useEffect(() => {
        productData();
    }, []);



    return (
        <div className={orderCss.orderbody}>

            <div className={orderCss.container}>

                <div className={orderCss.items1}>From Address Save <button className='btn' id={orderCss.butt}>Enter Delivery Pin</button></div>
                
                <div className={orderCss.items2} >
                
                    <div className={orderCss.sect } ><h5>PRICE DETAILS</h5></div>
                    {order.map(item => (
                    <div className={orderCss.sect1} key={item.id}><p>Price ({item.quantity} item)</p><p>₹{item.total}</p></div>
                    ))}
                    <div className={orderCss.sect1}><p>Discount</p><p id={orderCss.para}>− ₹940</p></div>
                    <div className={orderCss.sect1} id={orderCss.sect1}><p>Delivery Charges</p><p id={orderCss.para}> Free</p></div>
                    <div className={orderCss.sect1} id={orderCss.sect11}><h5>Total Amount</h5><h5>₹</h5></div>
                    <div className={orderCss.sect3}><h5>You will save ₹940 on this order</h5></div>
                  
                </div>
               
                <div className={orderCss.items3}>
                    {order.map(item => (
                        <div className={orderCss.order1} key={item.id}>
                            <div className={orderCss.order1items1}><img src={item.product.image} alt="" /> <div className={orderCss.order1btn}><button id={orderCss.order1btn}>-</button><input id={orderCss.order1input} type="number" defaultValue={1} /><button id={orderCss.order1btn}>+</button></div></div>
                            <div className={orderCss.order1items}><h6>{item.item}</h6><h6 id={orderCss.size}>Size: S</h6><h6 id={orderCss.size}>Seller:PumaSportsIndia</h6><h5>Amount : ₹{item.price}</h5><span><button className='btn' id={orderCss.wish}>WHISHLIST</button><button className='btn' id={orderCss.rem}>REMOVE</button></span></div>
                            <div className={orderCss.order1items}>Delivery in 2 days, Fri</div>
                        </div>
                    ))}


                    <div className={orderCss.order2}><Link to='placeorder'><button>Place Older</button></Link></div>
                </div>

            </div>
            <div className={orderCss.new}>
                <div className={orderCss.itemsa}>
                    <div className={orderCss.sect}><h5>PRICE DETAILS</h5></div>
                    <div className={orderCss.sect1}><p>Price (1 item)</p><p>₹1,699</p></div>
                    <div className={orderCss.sect1}><p>Discount</p><p id={orderCss.para}>− ₹940</p></div>
                    <div className={orderCss.sect1} id={orderCss.sect1}><p>Delivery Charges</p><p id={orderCss.para}> Free</p></div>
                    <div className={orderCss.sect1} id={orderCss.sect11}><h5>Total Amount</h5><h5>₹759</h5></div>
                    <div className={orderCss.sect3}><h5>You will save ₹940 on this order</h5></div>
                </div>
            </div>
        </div>
    )
}

export default CartOreder