import React, {  useState } from 'react'
import orderCss from '../cssfolder/order.module.css'

import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import uuid function



const CartOreder = () => {

    const [count, setCount] = useState(1)
    const [order, setOrder] = useState([])
    

    const [isChecked, setIsChecked] = useState(false);

    // const [resId, setresId] = useState([]);

  
    // console.log(cartsData[0][0].product.title)

    // cartsData.map(cart => {
    //     cart.map(item => {
    //         console.log(item.product.image);
    //     });
    // })
    // order.map((item) => {
    //     console.log(item.order_name)
    //     // setName(item.order_name)
        
    // })
    // console.log(name)
    console.log(order)



    useEffect(() => {

        const productData = async () => {
            const response = await axios.get("http://127.0.0.1:8000/api/product/addtocart/")

            setOrder(response.data);

            // setresId(response.data[0].id)
            console.log(response.data)
        }
        productData()

    }, []);



    const totalSum = order.reduce((acc, item) => acc + parseFloat(item.total), 0);
    

    const removehandle = async (itemId) =>{
        const response = await axios.delete(`http://127.0.0.1:8000/api/product/tocart/${itemId}`)
        console.log(response);
    }

    const uphandle = async (itemId) =>{

        const updatedCount = count + 1;
        setCount(updatedCount);
        const data = {
            quantity:updatedCount,
            user: 1 

          };
        const response = await axios.put(`http://127.0.0.1:8000/api/product/tocart/${itemId}/`, data, {
            headers: {
              'Content-Type': 'application/json',
              // Add any other headers as needed
            },

        });
        console.log(response);
    }

    const downhandle = async (itemId) =>{
        const updatedCount = count - 1;
        setCount(updatedCount);
        const data = {
            quantity:updatedCount,
            user: 1 

          };
        const response = await axios.put(`http://127.0.0.1:8000/api/product/tocart/${itemId}/`, data, {
            headers: {
              'Content-Type': 'application/json',
              // Add any other headers as needed
            },
        });
        console.log(response);
    }

    const names = order.map(item => item.order_name);
    const concatenatedNames = names.join(', ');
    console.log(concatenatedNames)
    const orderhandle = async () =>{
        
        const data = {
            total_amount: totalSum,
            slug: uuidv4(),
            name:concatenatedNames,
            
              
        };
        
        const response = await axios.post("http://127.0.0.1:8000/api/product/processorder/", data, {
            headers: {
              'Content-Type': 'application/json',
              // Add any other headers as needed
            },
        });
        console.log(response);
        
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={orderCss.orderbody}>

            <div className={orderCss.container}>

                <div className={orderCss.items1}>From Address Save <button className='btn' id={orderCss.butt}>Enter Delivery Pin</button></div>


                <div className={orderCss.items2} >

                    <div className={orderCss.sect}  ><h5>PRICE DETAILS</h5></div>
                    {order.map((item) => (
                        <div className={orderCss.sect1} key={item.id} ><p>Price (1 item)</p><p>₹{item.total}</p></div>
                    ))}
                    <div className={orderCss.sect1}><p>Discount</p><p id={orderCss.para}>− ₹940</p></div>
                    <div className={orderCss.sect1} id={orderCss.sect1}><p>Delivery Charges</p><p id={orderCss.para}> Free</p></div>
                    <div className={orderCss.sect1} id={orderCss.sect11}><h5>Total Amount</h5><h5>₹{totalSum}</h5></div>
                    <div className={orderCss.sect3}><h5>You will save ₹940 on this order</h5> <h5 style={{color: "red"}}>final conform to placeorder <input type="checkbox" onChange={handleCheckboxChange} /></h5></div>
                    <Link to='placeorder'><button className='btn btn-info'>View Order Demo</button></Link>

                </div>

                <div className={orderCss.items3}>

                    <div>

                        {order.map((item) => (
                            <div className={orderCss.order1} key={item.id} >
                                <div className={orderCss.order1items1}><img src={item.image} alt="" /> <div className={orderCss.order1btn}><button id={orderCss.order1btn} onClick={() => downhandle(item.id)} >-</button><input id={orderCss.order1input} type="number" value={count} readOnly /><button id={orderCss.order1btn} onClick={() => uphandle(item.id)} >+</button></div></div>
                                <div className={orderCss.order1items}><h4>{item.order_name}</h4><h6>Quantity: {item.quantity}</h6><h6 id={orderCss.size}>Size: S</h6><h6 id={orderCss.size}>Seller:PumaSportsIndia</h6><h5>Amount : ₹{item.price}</h5><span><button className='btn' id={orderCss.wish}>WHISHLIST</button><button type='submit' className='btn' id={orderCss.rem} onClick={() => removehandle(item.id)}>REMOVE</button></span></div>
                                <div className={orderCss.order1items}>Delivery in 2 days, Fri</div>
                            </div>
                        ))}


                    </div>


                    <div className={orderCss.order2}><Link to='placeorder'><button onClick={orderhandle} disabled={!isChecked}>Place Older</button></Link></div>
                    
                </div>

            </div>

        </div>
    )
}

export default CartOreder