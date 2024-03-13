import { useContext } from "react";
import SearCss from '../cssfolder/searchresult.module.css'
import { Link } from 'react-router-dom'
import { Searchcontext } from "../Context/AppContext";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const SearchResult = () => {


  const {searchData} = useContext(Searchcontext);
  console.log(searchData)
  
  return (
    <div className={SearCss.main}> 

      <Container id={SearCss.container}>
        <Row>
          {searchData.map((item) => (
            <Col key={item.id} md={3}>
              <Card style={{ width: '250px' }} id={SearCss.card}>
                <Card.Img variant="top" src={item.image} id={SearCss.img} />
                <Card.Body style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <Card.Title id={SearCss.head}>{(item.title).slice(0,15)}</Card.Title>
                  <Card.Text>
                    Price:  {item.price}
                  </Card.Text>
                  <Link to={`/productinfo/${item.id}`}><Button variant="primary" id={SearCss.bts}>View</Button></Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

    </div>
  );
};

export default SearchResult;