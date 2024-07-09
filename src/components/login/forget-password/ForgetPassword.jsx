import React, { useState } from 'react'
import urbanServiceLogo from './../urbanServiceLogo.png'
import css from './forgetPassword.module.css'
import pw_img from './pw_img.png'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

export const ForgetPassword = () => {

  const [email , setEmail] = useState("")
  const {register , handleSubmit} = useForm()
  const navigate = useNavigate();

  const checkEmailFormHandler = async (e)=>{
    try {
      e.preventDefault()
      let email = e.target.email.value;
      if(!email){
        throw new Error("Email is required")
      }
      setEmail(email);
      await axios.get(`/user/checkEmail/${email}`)
      continueBtnHandler();
    } catch (error) {
      if(error.response){
        toast.error(error.response.data.message,{theme:"light",position:"top-right"})
        console.log("error in response",error.response.data)
      }else{
        toast.error(error.message,{theme:"light",position:"top-right"})
        console.log("Error",error)
      }
    }
  }

  const getOTP = async ()=>{
    try {
      const otp = await axios.get(`/user/getOTP/${email}`)

      if(otp.data.flag){
        toast.success("OTP sent to mail",{theme:"light",position:"top-center"})
      }

      console.log("otp rsponse",otp)
    } catch (error) {
      if(error.response){
        toast.error(error.response.data.message,{theme:"light",position:"top-right"})
        console.log("error in response",error.response.data)
      }else{
        toast.error(error.message,{theme:"light",position:"top-right"})
        console.log("Error",error)
      } 
    }
  }

  const resetPasswordFormhandler = async (data)=>{
    try {
      console.log("Data",data);   
      const {password , cnfPassword, otp} = data
      if(!password || !cnfPassword || !otp){
        throw new Error("All fields are required")
      }
      if(password !== cnfPassword){
        throw new Error("Both password must be same")
      }
      const forgetPassword = await axios.patch(`/user/forgetPassword/${email}`,{password , cnfPassword , otp})
      console.log("forget password response is : \n",forgetPassword)
      toast.success(forgetPassword.data.message,{theme:"light",position:"top-right"})

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
        if(error.response){
          toast.error(error.response.data.message,{theme:"light",position:"top-right"})
          console.log("error in response",error.response.data)
        }else{
          toast.error(error.message,{theme:"light",position:"top-right"})
          console.log("Error",error)
        }
    }
  }

  const continueBtnHandler = () =>{
    let checkEmail = document.getElementById('checkEmail')
    let forgetPw = document.getElementById('forgetPw')

      checkEmail.style.transform = "translate(-550px,0)";
      forgetPw.style.transform = "translate(0 ,0)";
      setTimeout(()=>{
        checkEmail.style.display = "none"
        forgetPw.style.display = "inherit"
      },200)
  }
  const backBtnHandler = () =>{
    let checkEmail = document.getElementById('checkEmail')
    let forgetPw = document.getElementById('forgetPw')

      forgetPw.style.transform = "translate(-550px,0)";
      checkEmail.style.transform = "translate(0,0)";
      setTimeout(()=>{
        forgetPw.style.display = "none"
        checkEmail.style.display = "inherit"
      },200)
  }

  return (
    <div className={css.body}>
      <div className={css.navbarLogin}>
        <img src={urbanServiceLogo} height='60px'  alt="Oops!!!" />
      </div>

      <div className={css.parentOfContainer}>
        <div className={css.container}>
          <div style={{zIndex: "2"}}>
            <img src={pw_img} alt="" height="100%" width="100%" style={{borderRadius:"10px"}}/>
          </div>
          {/* <div className={css.formContainer}> */}
            <div id='checkEmail' className={css.checkEmail}>
              <form onSubmit={(e)=>checkEmailFormHandler(e)}>
                <div className={css.input}>
                  <p style={{fontWeight:"500",color:"gray"}}>Enter the email address associated with your account</p>
                  <input 
                    type="text" 
                    style={{fontSize:"14px",padding:"9px 10px"}}
                    placeholder='e.g. xyz@gmail.com'
                    name="email"
                  />
                </div>
                <div className={css.input}>
                  <button type='submit' id='continueBtn' className={css.continueBtn}>Continue</button>
                </div>
              </form>
            </div>
            <div className={css.forgetPw} id='forgetPw'>
              <div className={css.backBtn} id='backBtn' onClick={backBtnHandler}>
                <span className="material-symbols-outlined">arrow_back</span>
              </div>
              <form onSubmit={handleSubmit(resetPasswordFormhandler)}>
                <div className={css.input}>
                  <input type="text" placeholder="New Password" {...register('password')}/>
                </div>
                <div className={css.input}>
                  <input type="text" placeholder="Confirm Password" {...register('cnfPassword')}/>
                </div>
                <div className={css.input}>
                  <input 
                    style={{marginBottom:"0px"}}
                    type="text"
                    placeholder="Enter OTP"
                    {...register('otp')}
                  />
                  <div 
                    style={{
                      fontSize:"11px",
                      paddingLeft:"5px",
                      marginTop:"5px",
                      display:"flex",
                      justifyContent:"space-between",
                      color:"gray",
                      fontWeight:"500"
                    }}
                  >OTP will be sent to email. 
                    <span className={css.getOtpText}
                      onClick={()=>getOTP()}
                    > 
                      Get OTP
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
          {/* </div> */}
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}
