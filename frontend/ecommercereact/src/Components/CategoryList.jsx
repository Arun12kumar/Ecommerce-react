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




const CategoryList = () => {

  const { id } = useParams();
  const [data, setData] = useState([])

  const ListData = async () => {
    const resp = await axios.get(`http://127.0.0.1:8000/api/product/catelist/${id}`)

    setData(resp.data)
    console.log(resp)

  }

  useEffect(() => {
    ListData();
  }, []);

  return (
    <div>
      <Container id={orderCss.container}>
        <Row>
          {data.map((item) => (
            <Col key={item.id} md={3}>
              <Card style={{ width: '180px' }} id={orderCss.card}>
                <Card.Img variant="top" src={item.image} id={orderCss.img} />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>

                  </Card.Text>
                  <Button variant="primary" id={orderCss.bts}>View</Button>
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