import React, { useEffect, useState } from 'react'
import './navbar.css'
import { Outlet , Link, useNavigate } from 'react-router-dom'
// import urbanServiceLogo from './../login/urbanServiceLogo.png';
import urbanServiceLogo1 from './urbanServiceLogo1.png';
import home from './icons/home.png'
import logout from './icons/logout.png'
import bookings from './icons/bookings.png'
import servicesIcon from './icons/services.png'
import user from './icons/user.png'
import addservice from './icons/addservice.png';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {searchServices} from './../../redux/SearchSlice'
import { getCart } from '../user/services/ServicesApi';


export const Navbar = () => {

  const dispatch = useDispatch();

  const path = window.location.pathname;
  const [services , setServices] = useState([]);
  const [cartLength , setCartLength] = useState(0);
  const navigate = useNavigate();

  const searchBar = async ()=>{
    try{
    const name = document.getElementById('search').value;
    let search = await axios.get("/service/getServiceBySearch",{
      params :{
        name : name
      }
    })
    console.log("search is ",search.data.data);
    dispatch(searchServices(search.data.data));
    setServices(search.data.data);
    navigate('/user/searchServices');
    }catch(err){
      console.log("err in search....",err);
      setServices([]);
    }
  }

  const handleCloseSidebar =()=>{
    document.getElementById("sidebar").style.transform = "translate(-300px,0)"
    document.getElementById("bkg-black").style.transform = "scaleX(0%)";
  }
  const handleOpenSidebar =()=>{
    document.getElementById("sidebar").style.transform = "translate(0,0)";
    document.getElementById("bkg-black").style.transform = "scaleX(100%)";
  }
  const [city,setCity] = useState(null);
  const changeCity = ()=>{
    let selectCity = document.getElementById('city');
    let cityVal = selectCity.value;
    setCity(cityVal);
  }

  
  const endSessionOnLogout = ()=>{
    sessionStorage.removeItem("servProEmail");
    sessionStorage.removeItem("userEmail");
    // sessionStorage.setItem("isLoggedIn","false");
    sessionStorage.removeItem("isLoggedIn");
    // history.replace('/');
  }
  const cartandSearch = ()=>{
    if(path.includes('user')){
      let user = sessionStorage.getItem("userEmail")
      if(user){
        return(
          <span className='search-and-cart'>
            <span style={{textAlign:"center"}}>
              <input type="search" placeholder='e.g. haircut' id="search" onKeyUp={(e)=>{
                if(e.key === 'Enter'){
                  searchBar()
                }
              }}/>
            </span>
            <span style={{border:"0px solid red",textAlign:"center"}}>
              <div style={{display:"flex",justifyContent:"end"}}>
              <Link to='/user/cart'>
              <span id='cart-icon' className="material-symbols-outlined">shopping_cart</span>
              </Link>
              {
                cartLength > 0 ?
                <span className='cartLength' >{cartLength}</span>
                : null
              }
              </div>   
            </span>
          </span>
        )
      }else{
        return (
          <span className='search-and-cart'>
            <span style={{border:"0px solid red",textAlign:"center"}}>
              <input type="search" placeholder='e.g. haircut, fan repair' id="search" onKeyUp={(e)=>{
                if(e.key === 'Enter'){
                  searchBar()
                }
              }}/>
            </span>
            <span style={{display:"flex",justifyContent:"end"}}>
              <button className='login-btn'>Login</button>   
              <button className='signup-btn'>SignUp</button>   
            </span>
          </span>
        )
      }

    }else{
        // console.log("cart icon not allowed here");
    }
  }

  useEffect(()=>{
    if(path.includes('user')){
      const initializeCart = async () => {
        let cart = await getCart();
        await setCartLength(cart?.length);
      };
      initializeCart(); 
    }
  })

  const userLinks = [
    { name :"Home",link : "/user",icon : home , css : {marginBottom :"2px"} , imgHeight : "21px"},
    { name :"Services",link : "/user/services",icon : servicesIcon , css : {marginBottom :"3px"},imgHeight : "21px"},
    { name :"Bookings",link : "/user/bookings",icon : bookings , css : {marginBottom :"3px"},imgHeight : "21px"},
    { name :"Profile",link : "/user/profile",icon : user , css : {marginTop:"-3px",marginLeft:"-1px"},imgHeight : "26px"},
    { name :"Logout",link : "/",icon : logout , css : {marginBottom:"2px",marginLeft:"3px"},imgHeight : "21px"}
  ]
  const serviceproviderLinks = [
    { name :"Dashboard",link : "/serviceprovider",icon : home , css : {marginBottom :"2px"},imgHeight : "21px"},
    { name :"Add service",link : "/serviceprovider/addservice",icon : addservice , css : {marginBottom :"2px"},imgHeight : "21px"},
    { name :"My Services",link : "/serviceprovider/myservices",icon : servicesIcon , css : {marginBottom :"3px"},imgHeight : "21px"},
    { name :"Bookings",link : "/serviceprovider/bookings",icon : bookings , css : {marginBottom :"3px"},imgHeight : "21px"},
    { name :"Profile",link : "/serviceprovider/profile",icon : user , css : {marginTop :"-3px",marginLeft : "-1px"},imgHeight : "26px"},
    { name :"Logout",link : "/",icon : logout , css : {marginBottom:"2px",marginLeft:"3px"},imgHeight : "21px"}
  ]

  



  return (
    <div className='' >
      <div className="bkg-black" id='bkg-black'></div>

      <div className='navbar-home' style={{width:"100%"}}>
          <span className="menu-logo">
            <span class="material-symbols-outlined" id="menu" onClick={handleOpenSidebar}>menu</span>
            <span className='logo-img'>
              <Link className='logo' to={path.includes("user") ? "/user" : "#"}>
                <img src={urbanServiceLogo1} height="38px" alt="<img>" style={{marginTop:"2px"}}/>
              </Link>
            </span>
          </span>
          
          {
            cartandSearch()
          }
      </div>
      
      <div className='sidebar' id='sidebar'>
        <close-icon><span class="material-symbols-outlined" onClick={handleCloseSidebar} style={{float:"right",cursor:"pointer"}}>close</span></close-icon>
        <br /><br />
        <div className="side-list">
          {
            path.includes("serviceprovider") 
            
            ? serviceproviderLinks.map((servPro)=>{
              if(servPro.name == "Logout"){
                return(
                  <side-list>
                  <Link className='link-tag' to={servPro.link} onClick={endSessionOnLogout}>
                  <span>
                    <img src={servPro.icon} height={servPro.imgHeight} style={servPro.css} />
                  </span>
                  <list-element>{servPro.name}</list-element>
                  </Link>
                  </side-list>
                )
              }
              return (
                <side-list>
                <Link className='link-tag' to={servPro.link} onClick={handleCloseSidebar}>
                <span>
                  <img src={servPro.icon} height={servPro.imgHeight} style={servPro.css} />
                </span>
                <list-element>{servPro.name}</list-element>
                </Link>
                </side-list>
                
              )
            }) :
            userLinks.map((user)=>{
              if(user.name == "Logout"){
                return (
                  <side-list>
                  <Link className='link-tag' to={user.link} onClick={endSessionOnLogout}>
                  <span>
                    <img src={user.icon} height={user.imgHeight} style={user.css} />
                  </span>
                  <list-element>{user.name}</list-element>
                  </Link>
                  </side-list>
                )
              }
              return (
                <side-list>
                <Link className='link-tag' to={user.link} onClick={handleCloseSidebar}>
                <span>
                  <img src={user.icon} height={user.imgHeight} style={user.css} />
                </span>
                <list-element>{user.name}</list-element>
                </Link>
                </side-list>
              )
            }) 
            
          }

        </div>
        {/* <div className="log-out">
          Logout
        </div> */}
      </div>

      <div className='searchBody'>

      </div>
      <Outlet/>
    </div>
    
  )
}
