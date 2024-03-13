import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import detailCss from '../cssfolder/detail.module.css'
import { MdOutlineStar } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoMdCheckmarkCircle } from "react-icons/io";

const ProductInfo = () => {

    const [detail, setDetail] = useState([])
    const [inform, setInform] = useState([])
    const [review, setReview] = useState([])
    const [inreview, setInreview] = useState([])
    const { id } = useParams();

    const [activeImage, setActiveImage] = useState(null);
    const [show, setShow] = useState(true);

    useEffect(() => {


        const productData = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/api/product/images/${id}`)
            const prores = await axios.get(`http://127.0.0.1:8000/api/product/products/${id}`)
            const reviwres = await axios.get(`http://127.0.0.1:8000/api/product/review/${id}`)
            const eachreview = await axios.get(`http://127.0.0.1:8000/api/product/reviewProduct/${id}`)

            const informArray = Array.isArray(prores.data) ? prores.data : [prores.data];
            const rewiwArray = Array.isArray(reviwres.data) ? reviwres.data : [reviwres.data];
            const rewiwsArray = Array.isArray(eachreview.data) ? eachreview.data : [eachreview.data];

            setDetail(response.data)
            setInform(informArray)
            console.log(rewiwsArray)
            setReview(rewiwArray)
            setInreview(rewiwsArray)

        }

        productData()
       

    }, [id]);

    const handleImageClick = (imageId) => {
        setActiveImage(imageId);
    };

    const addhandle = () =>{

       
        console.log(inform[0].image)
        const postData = async () => {

            const imageResponse = await axios.get(inform[0].image, { responseType: 'arraybuffer' });
            const imageData = new Blob([imageResponse.data]);
            const formData = new FormData();
  
            formData.append('user', inform[0].user);
            formData.append('price', inform[0].price);
            formData.append('order_name', inform[0].title);
            formData.append('quantity', 1);
            formData.append('image', imageData,'image.jpg');
        
          try {
            const response = await axios.post('http://127.0.0.1:8000/api/product/addtocart/', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                // Add any other headers as needed
              },
            });
            console.log(response.data.id)
            console.log('Success:', response.data);
            // Handle the response data as needed
          } catch (error) {
            console.error('Error:', error.message);
            // Handle errors during the request
          }
        };
        postData()
        
    }


    return (
        <div>
            <div className={detailCss.mainbody}>
                <div className={detailCss.container}>
                    <div className={detailCss.item1}>
                        <div className={detailCss.set}>
                            <div className={detailCss.imageset1}>
                                {detail.map(item => (
                                    <ul key={item.id}>
                                        <li onClick={() => { setShow(false) }}><img src={item.image} alt="" onClick={() => handleImageClick(item.id)} className={activeImage === item.id ? detailCss.activeImage : detailCss.inactiveImage} /></li>
                                    </ul>
                                ))}
                            </div>
                            <div className={detailCss.imageset2}>

                                {detail.map((item) => (
                                    <div key={item.id} style={{ display: activeImage === item.id ? 'block' : 'none' }}>
                                        <img src={item.image} alt=".." />
                                    </div>
                                ))}
                                {detail.length > 0 && (
                                    <div key={detail[0].id}>
                                        {
                                            show ? <img src={detail[0].image} alt="vdg" /> : null
                                        }

                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                    <div className={detailCss.item2}>
                        {inform.map((set) => (
                            <ul key={set.id}>
                                <h4 key={set.id}>{set.title}</h4>
                                {review.map(ite => (
                                    <button key={ite.id} className='btn btn-success' id={detailCss.star}>{ite.rating}<MdOutlineStar /></button>
                                ))}
                                <p>Extra ₹12000 off</p>
                                <div className={detailCss.amount}><h4>₹{set.price}</h4><p>₹{set.old_price}</p>33% off</div>
                                <ul>
                                    <li id={detailCss.offer}><IoMdPricetag className='text-success' /> <h6>Bank offer</h6>1% up to ₹1000 Off On UPI Transactions</li>
                                    <li id={detailCss.offer}><IoMdPricetag className='text-success' /> <h6>Bank offer</h6>10% off on Axis Bank Credit Card Transactions</li>


                                </ul>
                                <h4>Product Discription</h4>
                                <div id={detailCss.list}>
                                    <p dangerouslySetInnerHTML={{ __html: set.description }}></p>

                                </div>
                                <h4>Specification</h4>
                                <div id={detailCss.spec}>
                                    <p dangerouslySetInnerHTML={{ __html: set.specification }}></p>
                                </div>


                                <div className={detailCss.reviewbox}>
                                    <h4>Review</h4>
                                    <div className={detailCss.reviewitem}>
                                    {inreview.map(ite => (
                                        <div key={ite.id} id={detailCss.userinfo}>
                                            <p>{ite.review} </p>
                                            <p style={{fontWeight:"bold"}}> {ite.user_name} <IoMdCheckmarkCircle  style={{color:"green"}}/></p>
                                        </div>
                                        
                                    ))}
                                    </div>
                                    <div className={detailCss.reviewitem}>
                                        <div className={detailCss.postreview}>
                                            <textarea style={{padding:"10px 10px"}} name="" id="" cols="50" rows="5"></textarea> <button className='btn btn-success'>Submit Review</button>
                                        </div>

                                    </div>

                                </div>    


                            </ul>
                        ))}
                    </div>

                    <div className={detailCss.item3} ><Link to='/cart'> <button className='btn btn-warning' onClick={addhandle}>Add to Cart</button></Link> <Link to="/placeorder"><button className='btn btn-danger'>Buy Now</button></Link></div>

                </div>

            </div>
        </div>
    )
}

export default ProductInfo