
import detailCss from '../cssfolder/detail.module.css'
import { MdOutlineStar } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/AppContext';





function ProductDetail() {
  const [activeImage, setActiveImage] = useState(null);
  const [detail, setDetail] = useState([])

  const [inform, setInform] = useState([])
  const [review, setReview] = useState([])
  const [show, setShow] = useState(true);

  // const [cart, setCart] = useState([])
  const [cartclick,setCartclik] = useState(false)
  const { id } = useParams();
  const {cartsData, setcartsData} = useContext(CartContext);

  const [resId, setResId] = useState([])

  const productData = async () => {

    const response = await axios.get(`http://127.0.0.1:8000/api/product/images/${id}`)
    const prores = await axios.get(`http://127.0.0.1:8000/api/product/products/${id}`)
    const reviwres = await axios.get(`http://127.0.0.1:8000/api/product/review/${id}`)
    // const cartresp = await axios.get('http://127.0.0.1:8000/api/product/addtocart/')

    const informArray = Array.isArray(prores.data) ? prores.data : [prores.data];
    const rewiwArray = Array.isArray(reviwres.data) ? reviwres.data : [reviwres.data];

    setDetail(response.data)
    setInform(informArray)
    setReview(rewiwArray)
    // setCart(cartresp)
    console.log(prores.data.category)
    

  }
  useEffect(() => {
    productData();
  }, []);

  const handleImageClick = (imageId) => {
    setActiveImage(imageId);
  };

  const addhandle = () =>{
    var previousCart = localStorage.getItem('cartData');
    var cartJson = JSON.parse(previousCart)
    
    var cartData = [
      {
        'product':{
          'id' : inform[0].id,
          'title': inform[0].title,
          'image': inform[0].image,
          'price': inform[0].price
        },
        'user':{
          'id':inform[0].user
        }

      }
    ];
    if(cartJson!= null){
      cartJson.push(cartData)
      var cartString=JSON.stringify(cartJson);
      localStorage.setItem('cartData',cartString);
      setcartsData(cartJson)
    }else{
      var newCartList=[];
      newCartList.push(cartData);
      var cartString=JSON.stringify(newCartList );
      localStorage.setItem('cartData',cartString);
    }
    setCartclik(true)
    console.log(inform[0].image)
    const postData = async () => {
      const data = {
        user: inform[0].user,
        price: inform[0].price,
        order_name: inform[0].title,
        quantity:1,
      };
    
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/product/addtocart/', data, {
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
          },
        });
        console.log(response.data.id)
        setResId(response.data.id)
        console.log('Success:', response.data);
        // Handle the response data as needed
      } catch (error) {
        console.error('Error:', error.message);
        // Handle errors during the request
      }
    };
    postData()
    
  }

  const removehandle = () =>{
    var previousCart = localStorage.getItem('cartData');
    var cartJson = JSON.parse(previousCart)
    cartJson.map((cart,index)=>{
      if (inform!=null && inform.id === inform.id){
        // delete cartJson[index];
        cartJson.splice(index ,1 );
      }
    })
    var cartString=JSON.stringify(cartJson );
    localStorage.setItem('cartData',cartString);
    setCartclik(false)
    setcartsData(cartJson);

    const postData = async () => {
      const data = {
        user: inform[0].user,
        price: inform[0].price,
        order_name: inform[0].title,
      };
    
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/product/tocart/${resId}/`, data, {
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
          },
        });
    
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
        <div className={detailCss.item3} key={set.id}>{! cartclick && <button className='btn btn-warning' onClick={addhandle}>Add to Cart</button>}{cartclick && <button className='btn btn-warning' onClick={removehandle}>remove to Cart</button>}<Link to="/placeorder"><button className='btn btn-danger'>Buy Now</button></Link></div>
        ))}
      </div>

    </div>
  )
}

export default ProductDetail