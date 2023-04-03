import React from "react";
import { FiSearch } from "react-icons/fi";

import  "../css/style.css";

export default class Filtre extends React.Component{
    constructor(props){
        super(props);
        
    }
    render(){
     return(
        <form>
  <fieldset>
  <legend>Marque de voiture  :</legend>
  <select className="select">
   
  {
                    this.props.voitures.map((p)=>{
                        return(
                            
                            <option >{p.marque}</option>
                            
                        
                           
    
                        )

                    })
                    
 }

</select>
<legend>Modele de voiture  :</legend>
  <select className="select">
   
  {
                    this.props.voitures.map((p)=>{
                        return(
                            
                            <option >{p.modele}</option>
                            
                        
                           
    
                        )

                    })
                    
 }

</select>
  
  
</fieldset>
<fieldset>
  <legend>Piéces :</legend>
  <select className="select">
   
  {
                    this.props.products.map((p)=>{
                        return(
                            
                            <option >{p.Title}</option>
                            
                        
                           
    
                        )

                    })
                    
 }

</select>
  
</fieldset>
<button className="button">
    <span>Search</span>
    <span><FiSearch  className="icon1" style={{fill:"cadetblue" , size:"100px"}}/></span>
</button>

</form>

     )
    }
    }
