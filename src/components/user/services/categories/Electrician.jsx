import React from 'react'
import css from './category.module.css'
import { Link } from 'react-router-dom'
import doorbell from './../../images/Quick home repairs/electrician/doorbell.jpg'
import fan from './../../images/Quick home repairs/electrician/fan.jpg'
import inverter from './../../images/Quick home repairs/electrician/inverter.jpg'
import light from './../../images/Quick home repairs/electrician/light.jpg'
import mcb from './../../images/Quick home repairs/electrician/mcb.jpg'
import switchbox from './../../images/Quick home repairs/electrician/switchbox.jpg'
import wiring from './../../images/Quick home repairs/electrician/wiring.jpg'


export const Electrician = () => {
  return (
    <div>
        <h2 className={css.heading2}>Electrician Services</h2>
        <div className={css.categoryContainer} id='categoryContainer'>

          <Link to='/user/services/electrician/switch' className={css.category} id='category'>
            <img src={switchbox} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Switch Box</div>
          </Link>
          <Link to='/user/services/electrician/fan' className={css.category} id='category'>
            <img src={fan} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Ceiling fan</div>
          </Link>
          <Link to='/user/services/electrician/light' className={css.category} id='category'>
            <img src={light} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Light</div>
          </Link>
          <Link to='/user/services/electrician/wiring' className={css.category} id='category'>
            <img src={wiring} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Wiring</div>
          </Link>
          <Link to='/user/services/electrician/doorbell' className={css.category} id='category'>
            <img src={doorbell} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Doorbell</div>
          </Link>
          <Link to='/user/services/electrician/inverter' className={css.category} id='category'>
            <img src={inverter} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Inverter & Stabilizer</div>
          </Link>
          <Link to='/user/services/electrician/mcb' className={css.category} id='category'>
            <img src={mcb} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>MCB & Fuse</div>
          </Link>
          
          
          
        </div>
        <br /><br />
    </div>
  )
}
