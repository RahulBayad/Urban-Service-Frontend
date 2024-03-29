import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import css from './login.module.css'
import urbanServiceLogo from './urbanServiceLogo.png'
import { Link, redirect, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import imgForLogin from './imgForLoginPage.png';
import {openRegister , closeRegister} from './loginScripts';
import user from './user.png'
import serviceProvider from './serviceProvider.png'
import axios from 'axios';

export const Login = () => {
  const navigate = useNavigate();
  const {register,handleSubmit,formState:{errors},reset} = useForm();

  const submitHandler = async(data)=>{
      // navigate('/user')
      
      try {
      if(!data.email){
        // console.log(data.email);
        toast.warning("Kindly enter your email",{position:"top-center",theme:"colored"})
      }
      if(data.role == "role"){
        toast.warning("Kindly select your role",{position:"top-center",theme:"colored"})
      }
      if(!data.password){
        toast.warning("Kindly enter your password",{position:"top-center",theme:"colored"})
      }
      const formData = {
        email:data.email,
        password:data.password
      }
          if(data.role == "65ce45bddb522781cc3c0c9a"){
            // let userLogin = await axios.post("http://localhost:4001/user/login",formData)
            let userLogin = await axios.post("/user/login",formData)
            toast.success("Login success",{position:"top-center",theme:"colored"});
            sessionStorage.setItem("userEmail",data.email);
            sessionStorage.setItem("isLoggedIn" , "true");
            
            setTimeout(()=>{
              navigate('/user')
            },2000)
          }
          if(data.role == "65ce45cfdb522781cc3c0c9c"){
            
            // let serProLogin = await axios.post("http://localhost:4001/serviceprovider/login",formData)
            let serProLogin = await axios.post("/serviceprovider/login",formData)
            toast.success("Login success",{position:"top-center",theme:"colored"});
            sessionStorage.setItem("servProEmail",data.email);
            sessionStorage.setItem("isLoggedIn" , true);
            setTimeout(()=>{
              navigate('/serviceprovider')
            },2000)
          }
      } catch (error) {
        // console.log(error);
        if(error)
        {toast.error(error.response.data.message,{position:"top-center",theme:"colored"})}
      }
  }

  return (
    <>
    <div className={css.bkgImage}>
      <div className={css.imgBox}>
      < img src={imgForLogin} className={css.imgBox} height="100vh" alt="" />
      </div>
    </div>

    <div className={css.loginBody} id='loginBody'>
      <div className={css.navbarLogin}>
        <img src={urbanServiceLogo} height='60px'  alt="Oops!!!" />
      </div>
      <br />
        {/* <br /><br /><br /> */}
      <div className={css.container}>
        <div className={css.imgFormContainer}>
          <div className={css.loginFormContainer}  id='loginForm'>
              
              <h1 >Login</h1><br />
              <form className={css.loginForm} onSubmit={handleSubmit(submitHandler)}>
              <div className={css.input}>
                  <label htmlFor="email">Email</label>
                  <input type="text" placeholder='' id='email' name="email" {...register("email")} />
              </div>
              <div className={css.input}>
                <label htmlFor="role">Role</label>
                  <select name="role" id='role' className={css.selectTag} {...register("role")} >
                    {/* <option value="role" disabled selected>Role</option> */}
                    <option value="65ce45bddb522781cc3c0c9a">User</option>
                    <option value="65ce45cfdb522781cc3c0c9c">Service Provider</option>
                  </select>
              </div>
              <div className={css.input}>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' placeholder='' {...register("password")} />
                <Link className={css.forgetPwd}>Forget Password ?</Link>
              </div>
              <div className={css.input}>
                  <input type="submit" value="Login" />
              </div>
              </form>
              <p style={{textAlign:"center",fontSize:"13px"}} >
                OR
                </p>
                <span className={css.registerBtn}>Dont't have an account ? <Link onClick={openRegister} className={css.signupBtn}>SignUp Here</Link></span>
                {/* <button onClick={openRegister} className={css.signupBtn}>Signup</button> */}
              <br /><br />
              
             <br />
          </div>
      
        </div>
      </div>

    </div>
      <div className={css.registerBox} id='registerBox'>
        <div className={css.wrapSubRegister}>
        <div className={css.cancel} onClick={closeRegister}><span class="material-symbols-outlined">close</span></div>
            <br /><br/>
        <div className={css.subRegisterBox}>
            {/* <br /> */}
            {/* <br /> */}
            {/* <br /> */}
            
            <div className={css.selectType}> 
                <div className={css.typeBox} >
                <Link className={css.link} to="signup/user/65ce45bddb522781cc3c0c9a">
                  <div className={css.selectUser}><img src={user} height='100px' alt="" /></div>
                  {/* <div ><span class="material-symbols-outlined">person</span></div> */}
                  {/* <br /> */}
                  <div>User</div>
                </Link>
                </div>
                <div></div>
                <div className={css.typeBox}>
                  <Link className={css.link} to='signup/serviceprovider/65ce45cfdb522781cc3c0c9c'>
                    <div className={css.selectServiceProvider} ><img height='100px' src={serviceProvider} alt="" /></div>
                    {/* <div ><span class="material-symbols-outlined" >person_apron</span></div> */}
                    <div className={css.serviceProvider}>Service Provider</div>
                  </Link>
                </div>
            {/* <br /> */}
            </div>
        </div>
        </div>
      </div>
    
    <div className={css.blackBKG} id='blackBKG'></div>
    <ToastContainer/>
    </>
  )
}

