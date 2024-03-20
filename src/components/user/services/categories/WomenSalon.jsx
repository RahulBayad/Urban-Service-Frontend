import React from 'react'
import css from './category.module.css'
import { Link } from 'react-router-dom'
import detaning from './../../images/salon for women/detan.jpg'
import facial from './../../images/salon for women/facial.jpg'
import haircolor from './../../images/salon for women/haircolor.jpg'
import manicure from './../../images/salon for women/manicure.jpg'
import pedicure from './../../images/salon for women/pedicure.jpg'
import threading from './../../images/salon for women/threading.jpg'
import waxing from './../../images/salon for women/waxing.jpg'

export const WomenSalon = () => {
  return (
    <div>
        <h2 className={css.heading2}>Salon for women</h2>
      <div className={css.categoryContainer} id='categoryContainer'>

          <Link to='/user/services/salonForWomen/haircare' className={css.category} id='category'>
            <img src={haircolor} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Hair color</div>
          </Link>
          <Link to='/user/services/salonForWomen/facial' className={css.category} id='category'>
            <img src={facial} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Cleanup and facial</div>
          </Link>
          <Link to='/user/services/salonForWomen/detan' className={css.category} id='category'>
            <img src={detaning} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Detain and Bleach</div>
          </Link>
          <Link to='/user/services/salonForWomen/threading' className={css.category} id='category'>
            <img src={threading} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Threading</div>
          </Link>
          <Link to='/user/services/salonForWomen/waxing' className={css.category} id='category'>
            <img src={waxing} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Waxing</div>
          </Link>
          <Link to='/user/services/salonForWomen/manicure' className={css.category} id='category'>
            <img src={manicure} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Manicure</div>
          </Link>
          <Link to='/user/services/salonForWomen/pedicure' className={css.category} id='category'>
            <img src={pedicure} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Pedicure</div>
          </Link>
          {/* <Link to='/user/services/salonForWomen' className={css.category} id='category'>
            <div className={css.moreBox}>more</div>
          </Link> */}
          
        </div><br /><br />
    </div>
  )
}
