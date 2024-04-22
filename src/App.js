import './App.css';
import { Link, Route , Routes, Navigate } from 'react-router-dom';
import { Login } from './components/login/Login.jsx';
import { Signup } from './components/signup/user-signup/Signup.jsx';
import { UserHome } from './components/user/dashboard/UserHome';
import { Navbar } from './components/commons/NavbarAndSidebar';
import { UserServices } from './components/user/services/UserServices';
import { UserBooking } from './components/user/bookings/UserBookings';
import { UserProfile } from './components/user/profile/UserProfile';
import { ServProHome } from './components/serviceprovider/Dashboard/ServProHome';
import { AddService } from './components/serviceprovider/addservice/AddService';
import { MyServices } from './components/serviceprovider/myservices/MyServices';
import { ServProProfile } from './components/serviceprovider/profile/ServProProfile';
import { ServProSignup } from './components/signup/servicepro-signup/ServProSignup.jsx';
import { Categories } from './components/user/services/Categories.jsx';
import { useEffect, useState } from 'react';
import { CheckLogin } from './components/validations/CheckLogin.jsx';
import { Error404 } from './components/validations/Error404.jsx';
import { SearchService } from './components/user/searchService/SearchService.jsx';
import { Cart } from './components/user/Order/Cart.jsx';
import { Checkout } from './components/user/Order/Checkout.jsx';
import axios from 'axios';
import { ServProBooking } from './components/serviceprovider/booking/ServProBooking.jsx';



function  App() {
  const [loginStatus , setLoginStatus] = useState(false);

 

  axios.defaults.baseURL = "http://localhost:4001"
  // axios.defaults.baseURL = "https://urban-service-backend-6wmj.onrender.com";
  const checkLogin = async()=>{
  
    if(sessionStorage.getItem("isLoggedIn")){
      await setLoginStatus(true)
      // console.log("true")
      // return true 
    }else{
      await setLoginStatus(false)
      // console.log("false")
      // return false
    }
  }

  useEffect(() => {
    checkLogin();
  }, [window.location.pathname]);
  
  return (
    <div className="App">

        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup/user/:id" element={<Signup/>}/>
          <Route path="/signup/serviceprovider/:id" element={<ServProSignup/>}/>
          <Route path="/user" element={sessionStorage.getItem("isLoggedIn") ? <Navbar/> : <CheckLogin/>}>
            <Route index element={<UserHome/>}></Route>
            <Route path='searchServices' element={<SearchService/>}></Route>
            <Route path='services' element={<Categories/>}></Route>
            <Route path='services/:categories/:type' element={<UserServices/>} ></Route>
            <Route path='bookings' element={<UserBooking/>}></Route>
            <Route path='profile' element={<UserProfile/>}></Route>
            <Route path='cart' element={<Cart/>}></Route>
            <Route path='checkout' element={<Checkout/>}></Route>
          </Route>  

          <Route path='/serviceprovider' render={()=>setLoginStatus(sessionStorage.getItem("isLoggedIn"))} element={loginStatus ? <Navbar/> : <CheckLogin/>} >
            <Route index element={<ServProHome/>} />
            <Route path='addservice'  element={<AddService/>}></Route>
            <Route path='bookings'  element={<ServProBooking/>}></Route>
            <Route path='myservices' element={<MyServices/>}></Route>
            <Route path='profile' element={<ServProProfile/>}></Route>
          </Route>
            <Route path='*' element={<Error404/>}></Route>
          
          </Routes>
      </div>
    );
  }


  export default App;
