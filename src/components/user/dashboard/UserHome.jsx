import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
// import { Outlet } from 'react-router-dom';
import Slider from "react-slick";
import './home.css';
// import urbanServiceLogo from './../../login/urbanServiceLogo.png';
import slide1 from './slide1.jpg';
import slide2 from './slide2.png';
import slide3 from './slide3.png';
import box1 from './../images/box1.png'
import acIcon from './../images/acIcon.png'
import cleaningIcon from './../images/cleaningIcon.png'
import makeoverIcon from './../images/makeoverIcon.png'
import painterIcon from './../images/painterIcon.png'
import technicianIcon from './../images/technicianIcon.png'
import haircutIcon from './../images/haircutIcon.png'
import { Carpenter } from '../services/categories/Carpenter';
import { Plumber } from '../services/categories/Plumber';
import axios from 'axios';



export const UserHome = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="body">
      <div className='dashboard-page'>
        
        <div className="slider-container">
          <Slider className='slider' {...settings}>
            <div className='slides'>
              <Link to='/user/services/menSpa/stressrelief'>
                <img src={slide1} height='100%' width='100%' alt="" />
              </Link>
            </div>
            <div className='slides'>
              <Link to='/user/services/salonForWomen/facial'>
                <img src={slide2} height='100%' width='100%' alt="" />
              </Link>
            </div>
            <div className='slides'>
              <img src={slide3} height='100%' width='100%' alt="" />
            </div>
            
          </Slider>
        </div>
        <br />
        <div className="main">
          <h1  className='heading1'>Home services at your doorstep</h1>
          {/* <h1>sffsf</h1> */}
          <div className="services-container1">
            <div className='services-container'>
              <h2 style={{paddingLeft:"20px",fontWeight:"500",fontSize:"20px",color:"rgb(91, 91, 91)"}}>What are you looking for</h2>
              <div className="services-list">
                <Link to="/user/services/salonForWomen" className="service">
                  <img src={makeoverIcon} height="90px" alt="" />
                  <h4>Womens's Salon</h4>
                </Link>
                <Link to="/user/services/salonForMen" className="service">
                  <img src={haircutIcon} height="90px" alt="" />
                  <h4>Mens's Salon </h4>
                </Link>
                <Link to="/user/services/ac/service" className="service">
                  <img src={acIcon} height="90px" alt="" />
                  <h4>AC & Appliances Repair</h4>
                </Link>
                <Link to="" className="service"> 
                  <img src={cleaningIcon} height="90px" alt="" />
                  <h4>Cleaning</h4>
                </Link>
                <Link to='/user/services/electrician' className="service">
                  <img src={technicianIcon} height="90px" alt="" />
                  <h4>Electrician,Plumber & Carpenter</h4>
                </Link>
                <Link to='' className="service">
                  <img src={painterIcon} height="90px" alt="" />
                  <h4>House Painters</h4>
                </Link>
              </div>
            </div>
            <div className="box1">
              <img src={box1} height="480px" alt="" />
            </div>
          </div>
          <Carpenter/>
          <br />
          <Plumber/>
          <div>
            <h3>NEXT</h3>
          </div>
        </div> 
          
      </div>
    </div>
  )
}
