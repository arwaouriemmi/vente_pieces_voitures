import { AiFillShopping  } from "react-icons/ai";
import { BiStats  } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { AiFillHome,AiTwotoneStar } from "react-icons/ai";

import  "../css/style.css";
import React from "react";

export default class NavBar extends React.Component{
    constructor(props) {
        super(props)
        this.state = { clicked: false}
        this.ohandleClick = this.handleClick.bind(this)
      }
  

  handleClick(){
    this.setState({clicked: !this.state.clicked});
  
  }

   handleSignOut = async (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };
  render() {
    return (
      <div className="navbaritems1">
        <h1 className="logo1">logo</h1>
        <div className="menu_icons1" onClick={this.handleClick()}>
          <i className= "fa-times" ></i>
        </div>

        <ul className="nav_menu1">
          

         
          
         
         
          <li>
            <a href="/sign in" className="link1">
              <CgProfile className="icon1" />Sign In
            </a>
          </li>
          <li>
            <a href="/" className="link1">
              <AiFillHome className="icon1" />Home
            </a>
          </li>
         
         
        </ul>
      </div>
    );
  }
}