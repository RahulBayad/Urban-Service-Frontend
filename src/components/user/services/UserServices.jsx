import React, { useEffect, useState } from 'react'
import css from './UserServices.module.css'
import { ApiHandle } from './ApiHandle'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {getCart , addToCart} from './ServicesApi'
// import shoppingCart from './../images/shoppingCart.png'

export  const UserServices =  () => {

  let serviceRoutes = ['electrician','plumber','carpenter','ac','fridge','oven','laptop','washingmachine',
  'geyser','ro','tv','salonForWomen','salonForMen','menSpa','womenSpa'];

  const [types ,setTypes] = useState([]);
  const [services ,setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catImg, setCatImg] = useState();
  const [serviceCart , setServiceCart] = useState([]) ;
  const [totalAmount , setTotalAmount] = useState(0);

  var path = window.location.pathname;
  path = path.split('/')
  let category = path[path.length - 2];
  let type = path[path.length - 1];

  const updateQty = async (service , qty , index)=>{
    try { 
        service.qty = qty;
        let body = {service : service , index : index}
        if(qty >0){
          let increase = await axios.put(`/user/cart/${sessionStorage.getItem('userEmail')}`,body);
          if(increase.data.data.acknowledged === true){
            const updatedQtyCart = [...serviceCart];
            updatedQtyCart[index].qty = qty;
            await setServiceCart(updatedQtyCart);
            let amount = await updateCartAmount(serviceCart);
            setTotalAmount(amount);
          }
        }else{
          console.log("called and qty is",qty) 
          console.log("called and index is",index) 
          let obj = {index : index}
          let removeFromCart = await axios.delete(`/user/cart/${sessionStorage.getItem('userEmail')}`,{
            data : {
              index : index
            }
          });
          if(removeFromCart.data.data.acknowledged === true){
            let cart = await getCart();
            console.log("cart is updates",cart)
            await setServiceCart(cart);
            let amount = await updateCartAmount(serviceCart);
            setTotalAmount(amount);
          }
          console.log("remove cart",removeFromCart);
        }
        // console.log("increase",increase);
    } catch (error) {
      console.log(error)
    }

  }

  const updateCartAmount = async (cart)=>{
    let updatedAmount = 0;
      cart.map((service)=>{
        updatedAmount = updatedAmount + (service.fees*service.qty)
      })
      return updatedAmount;
  }
  const addBtnHandler = async (service)=>{
    await addToCart(service);

    let cart = await getCart();
    console.log("cart is updates",cart)
    setServiceCart(cart);

    let amount = await updateCartAmount(cart);
    setTotalAmount(amount);
  }

  const getServices =async (category ,type )=>{
    if(document.getElementById(`${catImg}`)){
      document.getElementById(`${catImg}`).style.border = "1px solid rgb(198,198,198)"
      document.getElementById(`${catImg}`).style.padding = "0px"
    }
    if(document.getElementById(`${type}`)){
     document.getElementById(`${type}`).style.border = "2px solid black"
     document.getElementById(`${type}`).style.padding = "2px"
    }
    setCatImg(type);
    try {
      let fetchedTypes = await ApiHandle(category , type); 
      console.log("fetched types",fetchedTypes)
      if(fetchedTypes){
        await setTypes(fetchedTypes.types);
        await setServices(fetchedTypes.services);
      }  
    }catch (error) {
      console.log(error)
    }
  }

  useEffect( ()=>{
      let getTypes= async ()=>{
        try {    
          let fetchedTypes = await ApiHandle(category , type );
          // console.log("fetched types are ",fetchedTypes) 
          if(fetchedTypes){
            await setTypes(fetchedTypes.types);
            await setServices(fetchedTypes.services);
          }   
            await setLoading(false);

          }catch (error) {
            console.log(error);
          }
      }
    getTypes();
    const totalCartAmount = async (cart)=>{
      let updatedAmount = 0;
      cart.map((service)=>{
        updatedAmount = updatedAmount +  parseInt(service.fees) * parseInt(service.qty) 
      })
      return updatedAmount;
    }
    const initializeCart = async () => {
      let cart = await getCart();
      console.log("cart is updated", cart);
      setServiceCart(cart);
      let amount = await totalCartAmount(cart);
      setTotalAmount(amount);
    };
  
    initializeCart();
  } , [])
  
   if( serviceRoutes.includes(category)){
    return (
      
      <div className="body">
      {loading ? <h1 className={css.loading}>Please wait...</h1> :
        <div className={css.servicesBody}>
          {/* <div className={css.serviceAndCartContainer} > */}
          <div>
            {/* { (types && types.length > 0) ? <div style={{paddingLeft:"0px",fontWeight:"600"}} className={css.h1}>{types[0].subcategory.name}</div> : null }  */}
            {/* <br /> */}
            <div className={css.categoriesContainer}>
              <div className={css.categoriesBox}> 
                  {
                    (types && types.length > 0) ?
                      types.map((type)=>{
                        var link = `/user/services/${category}/${type.link}`
                        return(
                          <Link className={css.link} to={link} onClick={()=>getServices(category , type.link )}>
                            <div className={css.category}>
                            <img id={type.link} src={type.typeImageUrl} height='60px' width='60px' alt="no" />
                            {/* <div>{type.name}</div> */}
                            </div>
                          </Link>
                          )
                        })
                      :(
                        <>
                        <h2>Error</h2>
                    
                        </>
                      )
                  }  
              </div>
            </div>
          </div>
        
          <div className={css.servicesContainer}>
            {/* {
              (services && services.length >0) ?<div className={css.h1} style={{paddingLeft:"0px",fontWeight:"600"}}>{services[0].type.name}</div>
              : <div></div>
            } */}
            {/* <br /> */}
            {/* <br />   */}
            <div style={{display:'flex',flexDirection:"column",gap:"0px"}}>
            {           
              (services && services.length >0) ?
                services.map((service)=>{
                  return(
                    <div className={css.service}>
                      <div style={{border:"0px solid red"}}>
                        <div className={css.h2}>{service.name}</div>
                        <div style={{fontSize:"14px",fontWeight:"500"}}>₹ {service.fees}</div>
                        <br />
                        <div style={{borderTop:"1px solid rgb(198,198,198)",width:"90%"}}></div>
                        <br />
                        {
                          service.description.length > 1 
                          ?<ul> 
                            {
                              service.description.map((description)=>{
                                return <li>{description.line}</li>
                              })
                            }     
                          </ul>
                          :<div style={{fontSize:"13px"}}>{service.description[0].line}</div>
                        }
                        <br />
                        <button className={css.addService} onClick={()=>addBtnHandler(service)}>Add</button>
                      </div>

                      <div className={css.serviceImgBox}>
                        <img src={service.serviceImageUrl} className={css.serviceImg} alt="" />
                      </div>  
                    </div>
                  )})  : ( <h2>services not found</h2> )
            }
            </div>
          </div>
          {/* </div> */}

          <div className={css.thirdContainer}>
            <div className={css.cartContainer}>
              <br />
              <div className={css.h1} style={{fontSize:"25px",paddingLeft:"25px"}}>Cart</div>
              <br />
              <div className={css.servicesBox} >
                  {
                    serviceCart.length > 0 ?
                    serviceCart.map((service,index)=>{
                      return (
                        <div className={css.cart}> 
                          <div  >
                            <div style={{fontWeight:"600",fontSize:"14px"}}>{service.name}</div>
                            <div style={{fontSize:"13px",fontWeight:500,lineHeight:"35px"}}>₹ {service.fees}</div>
                            <div>
                              <button id='decreaseQty' onClick={()=>updateQty(service,service.qty - 1,index)}>-</button>&nbsp;&nbsp;
                              {service.qty}&nbsp;&nbsp;
                              <button id='increaseQty' onClick={()=>updateQty(service,service.qty + 1,index)} >+</button>
                            </div>
                          </div>
                          <div>
                            <img src={service.serviceImageUrl}   alt="none" />
                          </div> 
                        </div>

                      )
                    }) : <h4>No items in cart</h4> 
                  }
              </div>  <br />
              <div className={css.placeOrderContainer}>
                <div style={{lineHeight:"35px",fontWeight:"500"}}>Total ₹ {totalAmount}</div>
                <Link className={css.Link} to="/user/cart">View Cart</Link>
              </div>
            </div>
            <br />
            {/* <div className={css.offersContainer}>

            </div> */}


          </div>
           
        </div>


        
      }
      </div>
    )
  }else{
    console.log("page not found");
  }
}
