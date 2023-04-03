import React from "react";
import  "../css/style.css";

import ProductCard from '../Components/ProductCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filtre from "./Filtre";

export default class ProductCards extends React.Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return(
            <section className="block">
                
            <Container  className="sousblock">
            <div className='asideStyle'>
                <Filtre  voitures={this.props.voitures} products={this.props.products}/>
            </div>
            <Row className="row">
                {
                    this.props.products.map((p)=>{
                        return(
                            <Col className="column" sm={3}>
                               <div className="col">
                                  <ProductCard product={p}  />
                              </div>
                             </Col>
                        )

                    })
                }
              
            </Row>
           
           
          </Container>
          </section>
        )}}