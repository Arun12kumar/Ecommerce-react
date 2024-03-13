import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import orderCss from '../cssfolder/categorylist.module.css'
import { Link } from 'react-router-dom'




const CategoryList = () => {

  const { id } = useParams();
  const [data, setData] = useState([])
  const [product, setProduct] = useState([])
  


  useEffect(() => {
    const ListData = async () => {
      const resp = await axios.get(`http://127.0.0.1:8000/api/product/catelist/${id}`)
      const response = await axios.get("http://127.0.0.1:8000/api/product/products/")
      

      const informArray = Array.isArray(response.data) ? response.data : [response.data];
  
      setData(resp.data)
      console.log(resp.data)
      setProduct(informArray)
      
  
    }
    ListData()

  }, [id]);




  return (
    <div>
      <Container id={orderCss.container}>
        <Row>
          {data.map((item) => (
            <Col key={item.id} md={3}>
              <Card style={{ width: '250px' }} id={orderCss.card}>
                <Card.Img variant="top" src={item.image} id={orderCss.img} />
                <Card.Body style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <Card.Title id={orderCss.head}>{(item.title).slice(0,15)}</Card.Title>
                  <Card.Text>
                    Price:  {item.price}
                  </Card.Text>
                 
                    <Link to={`/productinfo/${item.id}`}><Button variant="primary" id={orderCss.bts}>View</Button></Link>
                
                    
      
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default CategoryList