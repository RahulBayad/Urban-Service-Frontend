// import React from 'react'
import React from 'react'
import css from './categories.module.css'
import { MensSalon } from './categories/MensSalon.jsx'
import { WomenSalon } from './categories/WomenSalon.jsx'
import { Appliances } from './categories/Appliances.jsx'
import { Electrician } from './categories/Electrician.jsx'
import { Plumber } from './categories/Plumber.jsx'
import { Carpenter } from './categories/Carpenter.jsx'
import { MensSpa } from './categories/MensSpa.jsx'
import { WomenSpa } from './categories/WomenSpa.jsx'

export const Categories = () => {
  return (
    <div className="body">

    <div className={css.categoriesBody}>
      <br />
      <div className={css.heading1}>Some Essential services</div><br />
      <div className={css.horizLine}></div>
      <br />

      <Electrician/>

      <Plumber/>

      <Carpenter/>

      <Appliances/>
      <div className={css.heading1}>Top categories</div><br />
      
      <div className={css.horizLine}></div>
      <br />
      <WomenSalon/>
      
      <MensSalon/>

      <MensSpa/>

      <WomenSpa/>
      
    <br />
    </div>
    </div>
  )
}
