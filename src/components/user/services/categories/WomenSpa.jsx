import React from 'react'
import css from './category.module.css'
import { Link } from 'react-router-dom'
import painRelief from './../../images/Spa for women/painRelief.jpg'
import postworkout from './../../images/Spa for women/postworkout.jpg'
import skincareScrub from './../../images/Spa for women/skincareScrub.jpg'
import stressRelief from './../../images/Spa for women/stressRelief.jpg'


export const WomenSpa = () => {
  return (
    <div>
         <h2 className={css.heading2}>Spa for Women</h2>
        <div className={css.categoryContainer} id='categoryContainer'>

          <Link to='/user/services/womenSpa/stressrelief' className={css.category} id='category'>
            <img src={stressRelief} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Stress Relief</div>
          </Link>
          <Link to='/user/services/womenSpa/painrelief' className={css.category} id='category'>
            <img src={painRelief} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Pain Relief</div>
          </Link>
          {/* <Link to='/user/services/womenSpa/postworkout' className={css.category} id='category'>
            <img src={postworkout} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Post workout</div>
          </Link> */}
          <Link to='/user/services/womenSpa/skincare' className={css.category} id='category'>
            <img src={skincareScrub} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Skin Care Scrubs</div>
          </Link>
          
          
          
        </div>
        <br /><br />
    </div>
  )
}
