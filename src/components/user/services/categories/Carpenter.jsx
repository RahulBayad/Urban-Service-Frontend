import React from 'react'
import css from './category.module.css'
import { Link } from 'react-router-dom'
import bed from './../../images/Quick home repairs/carpenter/bed.jpg'
import balcony from './../../images/Quick home repairs/carpenter/balcony.jpg'
import cupboard from './../../images/Quick home repairs/carpenter/cupboard.jpg'
import door from './../../images/Quick home repairs/carpenter/door.jpg'
import drillHang from './../../images/Quick home repairs/carpenter/drillHang.jpg'
import furniture from './../../images/Quick home repairs/carpenter/furniture.jpg'
import window from './../../images/Quick home repairs/carpenter/window.jpg'

export const Carpenter = () => {
  return (
    <div>
         <h2 className={css.heading2}>Carpenter Services</h2>
        <div className={css.categoryContainer} id='categoryContainer'>

          <Link to='/user/services/carpenter/bed' className={css.category} id='category'>
            <img src={bed} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Bed</div>
          </Link>
          <Link to='/user/services/carpenter/cupboard' className={css.category} id='category'>
            <img src={cupboard} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Cupboard</div>
          </Link>
          <Link to='/user/services/carpenter/drill' className={css.category} id='category'>
            <img src={drillHang} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Drill & Hang</div>
          </Link>
          <Link to='/user/services/carpenter/window' className={css.category} id='category'>
            <img src={window} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Window & Curtain</div>
          </Link>
          <Link to='/user/services/carpenter/door' className={css.category} id='category'>
            <img src={door} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Door</div>
          </Link>
          <Link to='/user/services/carpenter/balcony' className={css.category} id='category'>
            <img src={balcony} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Balcony</div>
          </Link>
          <Link to='/user/services/carpenter/furniture' className={css.category} id='category'>
            <img src={furniture} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Furniture</div>
          </Link>
          
          
          
        </div>
        <br /><br />
    </div>
  )
}
