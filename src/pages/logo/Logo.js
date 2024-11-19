import "bootstrap/dist/css/bootstrap.min.css"
import "./Logo.css"
import React from "react"
import logo from './logo.png';

const Logo = () => {
  return (
      <div className="logo-container">
        <img className="logo-image" src={logo} alt=""/>
      </div>
  )
};

export default Logo;