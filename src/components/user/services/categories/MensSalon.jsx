import React from 'react'
import css from './category.module.css'
import { Link } from 'react-router-dom'
import mensBeard from './../../images/salon for men/mensBeard.jpg'
import mensHairstyle from './../../images/salon for men/mensHairstyle.jpg'
import mensHaircolor from './../../images/salon for men/mensHaircolor.jpg'
import mensFacial from './../../images/salon for men/mensFacial.jpg'
import mensHeadmassage from './../../images/salon for men/mensHeadmassage.jpg'

export const MensSalon = () => {
  

  return (
    <div>
      <h2 className={css.heading2}>Salon for men</h2>
      <div className={css.categoryContainer} id='categoryContainer'>

          <Link to='/user/services/salonForMen/haircut' className={css.category} id='category'>
            <img src={mensHairstyle} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Hair cut</div>
          </Link>
          <Link to='/user/services/salonForMen/haircut' className={css.category} id='category'>
            <img src={mensBeard} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Beard style</div>
          </Link>
          <Link to='/user/services/salonForMen/haircolor' className={css.category} id='category'>
            <img src={mensHaircolor} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Hair color</div>
          </Link>
          <Link to='/user/services/salonForMen/facial' className={css.category} id='category'>
            <img src={mensFacial} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Facial & Detaning</div>
          </Link>
          <Link to='/user/services/salonForMen/massage' className={css.category} id='category'>
            <img src={mensHeadmassage} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Head massage</div>
          </Link>
          <Link to='/user/services/salonForMen/facial' className={css.category} id='category'>
            <div className={css.moreBox}>more</div>
          </Link>
          
        </div>
        <br /><br />
    </div>
  )
}
