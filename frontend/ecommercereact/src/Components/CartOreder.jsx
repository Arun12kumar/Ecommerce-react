import React, { useContext, useState } from 'react'
import orderCss from '../cssfolder/order.module.css'

import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import { CartContext } from '../Context/AppContext';


const CartOreder = () => {

    const [count, setCount] = useState(0)
    const [order, setOrder] = useState([])
    const[resId,setresId] = useState([]);

    const { cartsData, setcartsData } = useContext(CartContext);
    // console.log(cartsData[0][0].product.title)

    // cartsData.map(cart => {
    //     cart.map(item => {
    //         console.log(item.product.image);
    //     });
    // })
    order.map((item) =>{
        console.log(item.id)
    })

    // const { id } = useParams();



    useEffect(() => {

        const productData = async () => {


            const response = await axios.get("http://127.0.0.1:8000/api/product/addtocart/")
    
            setOrder(response.data);

            // setresId(response.data[0].id)
            console.log(response.data)
            
        }
        productData() 
        
    }, []);
    
    

    const plusBtn= () =>{
        setCount(count + 1);
    {order.map((item) =>{
        const postData= async()=>{
            const data = {
                quantity: count+1,
                user:1,
              
              };
        
                
            const quantity = await axios.put(`http://127.0.0.1:8000/api/product/tocart/${item.id}/`, data, {
                headers: {
                  'Content-Type': 'application/json',
                  // Add any other headers as needed
                },
              });
       
        }
    

        postData()
    })}
    }
    

    const lessBtn=() =>{
        setCount(count - 1);
    }
    const totalSum = order.reduce((acc, item) => acc + parseFloat(item.total), 0);

    
  
    
    return (
        <div className={orderCss.orderbody}>

            <div className={orderCss.container}>

                <div className={orderCss.items1}>From Address Save <button className='btn' id={orderCss.butt}>Enter Delivery Pin</button></div>
                

                <div className={orderCss.items2} >
               
                    <div className={orderCss.sect}  ><h5>PRICE DETAILS</h5></div>
                    {order.map((item)=>(
                    <div className={orderCss.sect1} key={item.id} ><p>Price (1 item)</p><p>₹{item.total}</p></div>
                    ))}
                    <div className={orderCss.sect1}><p>Discount</p><p id={orderCss.para}>− ₹940</p></div>
                    <div className={orderCss.sect1} id={orderCss.sect1}><p>Delivery Charges</p><p id={orderCss.para}> Free</p></div>
                    <div className={orderCss.sect1} id={orderCss.sect11}><h5>Total Amount</h5><h5>₹{totalSum}</h5></div>
                    <div className={orderCss.sect3}><h5>You will save ₹940 on this order</h5></div>
               
                </div>
                
                <div className={orderCss.items3}>
                    
                    <div>
                        {cartsData.map(cart => (
                            cart.map(item => (
                                
                                <div className={orderCss.order1} key={item.product.id}>
                                    <div className={orderCss.order1items1}><img src={item.product.image} alt="" /> <div className={orderCss.order1btn}><button id={orderCss.order1btn} onClick={lessBtn}>-</button><input id={orderCss.order1input} type="number"  value={count} readOnly /><button id={orderCss.order1btn} onClick={plusBtn}>+</button></div></div>
                                    <div className={orderCss.order1items}><h6>{item.product.title}</h6><h6 id={orderCss.size}>Size: S</h6><h6 id={orderCss.size}>Seller:PumaSportsIndia</h6><h5>Amount : ₹{item.product.price}</h5><span><button className='btn' id={orderCss.wish}>WHISHLIST</button><button className='btn' id={orderCss.rem}>REMOVE</button></span></div>
                                    <div className={orderCss.order1items}>Delivery in 2 days, Fri</div>
                                </div>
                             
                            ))
                        ))}
                    </div>


                    <div className={orderCss.order2}><Link to='placeorder'><button>Place Older</button></Link></div>
                </div>

            </div>

        </div>
    )
}

export default CartOreder