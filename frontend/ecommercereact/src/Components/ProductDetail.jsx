
import detailCss from '../cssfolder/detail.module.css'
import { MdOutlineStar } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';




function ProductDetail() {
  const [activeImage, setActiveImage] = useState(null);
  const [detail, setDetail] = useState([])
  const [cart, setCart] = useState([])
  const [inform, setInform] = useState([])
  const [review, setReview] = useState([])
  const [show, setShow] = useState(true);

  const { id } = useParams();


  const productData = async () => {

    const response = await axios.get(`http://127.0.0.1:8000/api/product/images/${id}`)
    const prores = await axios.get(`http://127.0.0.1:8000/api/product/products/${id}`)
    const reviwres = await axios.get(`http://127.0.0.1:8000/api/product/review/${id}`)

    const informArray = Array.isArray(prores.data) ? prores.data : [prores.data];
    const rewiwArray = Array.isArray(reviwres.data) ? reviwres.data : [reviwres.data];

    setDetail(response.data)
    setInform(informArray)
    setReview(rewiwArray)
    console.log(prores.data)

  }
  useEffect(() => {
    productData();
  }, []);

  const handleImageClick = (imageId) => {
    setActiveImage(imageId);
  };

    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/product/addtocart/')
          .then(res => {
            setCart(res.data);
            console.log(res.data);
          })
          .catch(err => {
              console.error('Error fetching products:', err);
          });
    }, []);



  // const addToCart = (productId) => {
  //   axios.post('http://127.0.0.1:8000/api/product/addtocart/', { cart: productId })
  //       .then(res => {
  //           console.log('Product added to cart:', res.data);
  //       })
  //       .catch(err => {
  //           console.error('Error adding product to cart:', err);
  //       });
  // };

  return (
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
                <li id={detailCss.offer}><IoMdPricetag className='text-success' /> <h6>Bank offer</h6>1% up to ₹1000 Off On UPI Transactions</li>
                <li id={detailCss.offer}><IoMdPricetag className='text-success' /> <h6>Bank offer</h6>1% up to ₹1000 Off On UPI Transactions</li>
                <li id={detailCss.offer}><IoMdPricetag className='text-success' /> <h6>Bank offer</h6>1% up to ₹1000 Off On UPI Transactions</li>

              </ul>
              <h4>Product Discription</h4>
              <div id={detailCss.list}>
                <p dangerouslySetInnerHTML={{ __html: set.description }}></p>

              </div>
              <h4>Specification</h4>
              <div id={detailCss.spec}>
                <p dangerouslySetInnerHTML={{ __html: set.specification }}></p>
              </div>

              <h4>Review</h4>
              {review.map(ite => (
              <p key={ite.id}>{ite.review}</p>
              ))}
              
            </ul>
          ))}
        </div>
        {inform.map((set) =>(
        <div className={detailCss.item3} key={set.id}><Link to="/cart"><button className='btn btn-warning'>Add to Cart</button></Link><Link to="/placeorder"><button className='btn btn-danger'>Buy Now</button></Link></div>
        ))}
        {/* {cart.map(product =>(
          <div key={product.id}><button onClick={addToCart(product.id)}>Add</button></div>
        ))} */}
      </div>

    </div>
  )
}

export default ProductDetail