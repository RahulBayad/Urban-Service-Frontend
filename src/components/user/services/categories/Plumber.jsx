import React from 'react'
import css from './category.module.css'
import { Link } from 'react-router-dom'
import bathfitting from './../../images/Quick home repairs/plumber/bathfitting.jpg'
import drainage from './../../images/Quick home repairs/plumber/drainage.jpg'
import grouting from './../../images/Quick home repairs/plumber/grouting.jpg'
import motor from './../../images/Quick home repairs/plumber/motor.jpg'
import tapMixer from './../../images/Quick home repairs/plumber/tapMixer.jpg'
import toilet from './../../images/Quick home repairs/plumber/toilet.jpg'
import washbasin from './../../images/Quick home repairs/plumber/washbasin.jpg'
import waterFilter from './../../images/Quick home repairs/plumber/waterFilter.jpg'
import waterTank from './../../images/Quick home repairs/plumber/waterTank.jpg'
import waterpipe from './../../images/Quick home repairs/plumber/waterpipe.jpg'


export const Plumber = () => {
  return (
    <div>
         <h2 className={css.heading2}>Plumber Services</h2>
        <div className={css.categoryContainer} id='categoryContainer'>

          <Link to='/user/services/plumber/bathFitting' className={css.category} id='category'>
            <img src={bathfitting} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Bathroom fitting</div>
          </Link>
          <Link to='/user/services/plumber/basin' className={css.category} id='category'>
            <img src={washbasin} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Basin & sink</div>
          </Link>
          <Link to='/user/services/plumber/tap' className={css.category} id='category'>
            <img src={tapMixer} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Tap mixer</div>
          </Link>
          <Link to='/user/services/plumber/filterTap' className={css.category} id='category'>
            <img src={waterFilter} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Water filter tap</div>
          </Link>
          <Link to='/user/services/plumber/grouting' className={css.category} id='category'>
            <img src={grouting} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Grouting</div>
          </Link>
          <Link to='/user/services/plumber/drainage' className={css.category} id='category'>
            <img src={drainage} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Drainage</div>
          </Link>
          <Link to='/user/services/plumber/toilet' className={css.category} id='category'>
            <img src={toilet} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Toilet</div>
          </Link>
          <Link to='/user/services/plumber/motor' className={css.category} id='category'>
            <img src={motor} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Water Motor</div>
          </Link>
          <Link to='/user/services/plumber/tank' className={css.category} id='category'>
            <img src={waterTank} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Water Tank</div>
          </Link>
          <Link to='/user/services/plumberpipe' className={css.category} id='category'>
            <img src={waterpipe} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Pipeline</div>
          </Link>
          
          
          
        </div>
        <br /><br />
    </div>
  )
}
