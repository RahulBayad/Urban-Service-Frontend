import React from 'react'
import urbanServiceLogo from './../urbanServiceLogo.png'
import css from './forgetPassword.module.css'

export const ForgetPassword = () => {
  return (
    <div className={css.body}>
      <div className={css.navbarLogin}>
        <img src={urbanServiceLogo} height='60px'  alt="Oops!!!" />
      </div>

      <div>
        <div className={css.container}>
            <div className={css.h2} >Forget Password</div>
            <br />
            <br />

          <form>
            <div className={css.input}>
              <input type="text" placeholder="New Password"/>
            </div>
            <div className={css.input}>
              <input type="text" placeholder="Confirm Password"/>
            </div>
            <div className={css.input}>
              <input 
                style={{marginBottom:"0px"}}
                type="text"
                placeholder="Enter OTP"
              />
              <div 
                style={{fontSize:"11px",paddingLeft:"5px",marginTop:"5px",display:"flex",justifyContent:"space-between"}}
              >OTP sent to email. 
                <span style={{textDecoration:"underline",color:"blue",fontWeight:"600",cursor:"pointer"}}> 
                  Resend it
                </span>
              </div>
            </div>
            <div className={css.input}>
              <button 
              className={css.saveBtn}
                type='submit'
                style={{marginTop:"10px"}}
              >Save</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
