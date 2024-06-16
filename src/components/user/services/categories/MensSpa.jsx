import React from 'react'
import css from './category.module.css'
import { Link } from 'react-router-dom'
import painRelief from './../../images/Spa for men/mensPainreliefMassage.jpg'
import postworkout from './../../images/Spa for men/mensPostworkoutMassage.jpg'
import relaxation from './../../images/Spa for men/mensRelaxationMassage.jpg'
import stressRelief from './../../images/Spa for men/mensStreeReliefMassage.jpg'


export const MensSpa = () => {
  return (
    <div>
         <h2 className={css.heading2}>Massage for Men</h2>
        <div className={css.categoryContainer} id='categoryContainer'>

          {/* <Link to='/user/services/menSpa/relaxation' className={css.category} id='category'>
            <img src={relaxation} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Relaxation</div>
          </Link> */}
          <Link to='/user/services/menSpa/stressrelief' className={css.category} id='category'>
            <img src={stressRelief} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Stress Relief</div>
          </Link>
          <Link to='/user/services/menSpa/postworkout' className={css.category} id='category'>
            <img src={postworkout} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Postworkout</div>
          </Link>
          <Link to='/user/services/menSpa/painrelief' className={css.category} id='category'>
            <img src={painRelief} height='280px' width='200px' style={{borderRadius : "10px"}} alt="" />
            <div>Pain Relief</div>
          </Link>
          
          
          
        </div>
        <br /><br />
    </div>
  )
}
