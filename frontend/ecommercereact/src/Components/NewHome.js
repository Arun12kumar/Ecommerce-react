import axios from 'axios'
import React, { useState, useEffect } from 'react'
import homeCss from '../cssfolder/home.module.css'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from '../images/slide1.jpeg';
import CarouselImage1 from '../images/slide2.jpg';
import CarouselImage2 from '../images/slide3.png';
import CarouselImage3 from '../images/slide4.jpg';
import CarouselImage4 from '../images/slide5.jpg';
import Footer from '../Components/Footer';



const NewHome = () => {

  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])

  const fetchData = async () => {

    const response = await axios.get("http://127.0.0.1:8000/api/product/frontproduct/")
    const categoryres = await axios.get("http://127.0.0.1:8000/api/product/categories/")
    setProduct(response.data)
    setCategory(categoryres.data)
    console.log(categoryres.data)

  }
  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className={homeCss.homebody}>
      <div className={homeCss.categorycontainner}>
        {category.map(item => (
          <div key={item.id} className={homeCss.subs}>
            <h6>{item.title}</h6>
            <Link to={`/list/${item.id}`}><img src={item.image} alt=".." className={homeCss.catImage} /></Link>
          </div>
        ))}
      </div>
      <div className={homeCss.carouselcontainner}>
        <Carousel fade>
          <Carousel.Item>
            <img id={homeCss.carouselimage} src={CarouselImage} alt="..." />
          </Carousel.Item>
          <Carousel.Item>
            <img id={homeCss.carouselimage} src={CarouselImage1} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img id={homeCss.carouselimage} src={CarouselImage2} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img id={homeCss.carouselimage} src={CarouselImage3} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img id={homeCss.carouselimage} src={CarouselImage4} alt="" />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className={homeCss.productcontainer}>
        {product.map(item => (
          <div key={item.id}>
            <Link to={`/productinfo/${item.id}`}><img src={item.image} alt=".." className={homeCss.productImage} /></Link>
          </div>
        ))}
      </div>
      <Footer/>          
    </div>

  )
}

export default NewHome