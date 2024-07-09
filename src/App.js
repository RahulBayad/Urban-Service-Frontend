import './App.css';
import { Route , Routes } from 'react-router-dom';
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
import { Error404 } from './components/validations/Error404.jsx';
import { SearchService } from './components/user/searchService/SearchService.jsx';
import { Cart } from './components/user/Order/Cart.jsx';
import { Checkout } from './components/user/Order/Checkout.jsx';
import axios from 'axios';
import { ServProBooking } from './components/serviceprovider/booking/ServProBooking.jsx';
import { ForgetPassword } from './components/login/forget-password/ForgetPassword.jsx';



function  App() {

  // axios.defaults.baseURL = "http://localhost:4001"
  axios.defaults.baseURL = "https://urban-service-backend-6wmj.onrender.com";
    
  return (
    <div className="App">

        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/forgetPassword" element={<ForgetPassword/>}/>
          <Route path="/user/signup/:role" element={<Signup/>}/>
          <Route path="/serviceprovider/signup/:role" element={<ServProSignup/>}/>
          <Route path="/" element={<Navbar/>}>
            <Route index element={<UserHome/>}></Route>
            <Route path='user/searchServices' element={<SearchService/>}></Route>
            <Route path='user/services' element={<Categories/>}></Route>
            <Route path='user/services/:categories/:type' element={<UserServices/>} ></Route>
            <Route path='user/bookings' element={<UserBooking/>}></Route>
            <Route path='user/profile' element={<UserProfile/>}></Route>
            <Route path='user/cart' element={<Cart/>}></Route>
            <Route path='user/checkout' element={<Checkout/>}></Route>
          </Route>  

          <Route path='/serviceprovider' element={<Navbar/>} >
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
