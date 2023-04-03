import React from "react";
import { Card, Row, Col } from 'react-bootstrap';
import { AiFillHome,AiTwotoneStar } from "react-icons/ai";
import  "../css/style.css";



export default class ProductCard extends React.Component{
    constructor(props){
        super(props);
        
    }
    render(){
      var  items=[];
      for(let i=0;i<this.props.product.stars;i++){
       items.push(1);
   
      }
      
        return(
            <div>
               <Card style={{ width: '18rem' }} >
                     <Card.Header>
                        <Row>
                            <Col>
                              <Card.Img className="image" src={this.props.product.image}/>
                            </Col>
                            <Col>
                              <Card.Title>{this.props.product.Title}</Card.Title>
                            </Col>
                          
            
                        </Row>
                      </Card.Header>
     
      
    
                       <Card.Body>
                         <Card.Text>
                           {this.props.product.Description}
                          </Card.Text>
                          <div>
                            <div> <a href="">Details Fournisseur</a></div>
                            <div> <a href="">Details Voitures</a></div>
                            <div>
        {
                    items.map((p)=>{
                        return(
                           < AiTwotoneStar  className="icon1" style={{fill : "yellow" , size: "100px"}}/>
                        )

                    })
                }
  
    </div>
                            
                              
                            
                       

                   
                         
                         
                            <p style={{ float: 'left' , fontSize:'30px'}}>{this.props.product.Price}</p>
                           
                              
                  
                        </div>
                      </Card.Body>
                </Card>
    

            </div>
                 )
}
}