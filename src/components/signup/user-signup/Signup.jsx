import React from 'react'
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from'./userSignup.module.css'
import urbanServiceLogo from './urbanServiceLogo.png'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import imgForSignup from './../../login/imgForLoginPage.png' 

export const Signup = () => {

  // console.log(req.params.id);
  const currentUrl = window.location.pathname;
  const parts = currentUrl.split('/');
  const urlId = parts[parts.length - 1];

  const {register,handleSubmit,formState:{errors},reset} = useForm();

  const navigate = useNavigate();
  const submitHandler = async(data)=>{

      if(data.phone.length != 10){
        toast.error("Phone number is not valid ",{theme:"colored",position:"top-center"});
        return null;
      }
      let userObj = {
        email : data.email,
        phone : data.phone,
        role : urlId,
        password : data.password
      }
      try{

        const signUp = await axios.post("/user/user",userObj);
        console.log(signUp.data.data);
        alert("Signup success");
        navigate("/")
      }catch(err){
        toast.error(err.response.data.message,{
          theme:"colored",
          position:"top-center"
        });
        console.log(err);
      }
  }

  return (
    // <>
    <div className={css.signupBody}>
    <div className={css.bkgImage}>
      <div className={css.imgBox}>
        < img src={imgForSignup} className={css.imgBox} height="100vh" alt="" />
      </div>
    </div>
    
      <div className={css.navbarSignup}>
        <img src={urbanServiceLogo} height='60px' alt="Oops!!!" />
      </div>
      <br />

      <div className={css.userSignupContainer}>
        <div className={css.signupFormContainer}>
            <h1 >Sign-up</h1>
            <form className={css.signupForm} id="signupForm" onSubmit={handleSubmit(submitHandler)} >
              <div className={css.input}>
                  <label htmlFor="email">Email</label>
                  <input type="text" id='email' placeholder='' {...register("email")}  />
              </div>
              <div className={css.input}>
                  <label htmlFor="phone">Phone</label>  
                  <input type="number" id='phone' length='10' placeholder='' {...register("phone")}  />
              </div>
              <div className={css.input}>
                  <label htmlFor="password">Password</label>
                  <input type="password" id='password' className={css.forgetPwd} placeholder='' {...register("password")}  />
                  <Link className={css.forgetPwd}>Forget Password ?</Link>
              </div>
              <div className={css.input}>
                  <input type="submit" value="Signup" />
              </div>
            </form>
            <p style={{textAlign:"center",fontSize:"13px",lineHeight:"15px"}}>OR</p>
            <div className={css.loginBtn} >Already Registered ? <Link to="/" className={css.loginLink}>Login Here</Link></div>

            {/* <Link className={css.registerLink} to="/">Login</Link> */}
            <br /> 
            <br />  
        </div>
      
      </div>
    
      <ToastContainer style={{fontSize:"13px"}}/>
    </div>
    // </>
  )
}


