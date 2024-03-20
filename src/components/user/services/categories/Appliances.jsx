import React from 'react'
import css from './category.module.css'
import { Link } from 'react-router-dom'
import ac from './../../images/Appliances repair/ac.jpg'
import fridge from './../../images/Appliances repair/fridge.jpg'
import geyser from './../../images/Appliances repair/geyser.jpg'
import laptop from './../../images/Appliances repair/laptop.jpg'
import oven from './../../images/Appliances repair/oven.jpg'
import ro from './../../images/Appliances repair/ro.jpg'
import tv from './../../images/Appliances repair/tv.jpg'
import washingmachine from './../../images/Appliances repair/washingmachine.jpg'

export const Appliances = () => {
  return (
    <div>
        <h2 className={css.heading2}>Home Appliances repair</h2>
        <div className={css.categoryContainer} id='categoryContainer'>

          <Link to='/user/services/ac/service' className={css.category} id='category'>
            <img src={ac} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Air Conditioner</div>
          </Link>
          <Link to='/user/services/fridge/doubleDoor' className={css.category} id='category'>
            <img src={fridge} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Refrigerator</div>
          </Link>
          <Link to='/user/services/oven/repair' className={css.category} id='category'>
            <img src={oven} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Microwave oven </div>
          </Link>
          <Link to='/user/services/laptop/windows' className={css.category} id='category'>
            <img src={laptop} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Laptop & Desktop </div>
          </Link>
          <Link to='/user/services/washingmachine/repair' className={css.category} id='category'>
            <img src={washingmachine} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Washing Machine</div>
          </Link>
          <Link to='/user/services/geyser/repair' className={css.category} id='category'>
            <img src={geyser} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Geyser</div>
          </Link>
          <Link to='/user/services/ro/service' className={css.category} id='category'>
            <img src={ro} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Water purifier</div>
          </Link>
          <Link to='/user/services/tv/repair' className={css.category} id='category'>
            <img src={tv} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>TV</div>
          </Link>
          
          
        </div>
        <br /><br />
    </div>
  )
}
