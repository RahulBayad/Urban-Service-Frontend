import React from 'react'
import { Link } from 'react-router-dom'
import css from './checkLogin.module.css'

export const CheckLogin = () => {
  return (
    <div className={css.body12}>
        
        <h1 className={css.heading}>You are not logged in</h1>
        <Link to='/'>Click here to login</Link>
    </div>
  )
}
