import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import css from './searchService.module.css'
import axios from 'axios'
import {getCart , addToCart} from './../services/ServicesApi'
import { Link } from 'react-router-dom'

export const SearchService = () => {

  const [serviceCart , setServiceCart] = useState([]) ;
  const [totalAmount , setTotalAmount] = useState(0);

  const serviceState = useSelector((state)=>state.search.services);
  console.log("Service state is",serviceState);

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

  useEffect(()=>{
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
  
  },[]);

  return (
    <div className='body'>
      <div className={css.searchPageBody}>
        <div className={css.serviceContainer}>
          {
               serviceState[0]?.map((service)=>{
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
              )
            })
          }
        </div>
        <div className={css.cartContainer}><br />
          <div className={css.h1} style={{fontSize:"25px",paddingLeft:"0px",textAlign:"center"}}>Cart</div>
          <br />
          <div className={css.cart}>
          {
                    serviceCart.length > 0 ?
                    serviceCart.map((service,index)=>{
                      return (
                        <div className={css.serviceInCart}> 
                          <div  >
                            <div style={{fontWeight:"600",fontSize:"14px"}}>{service.name}</div>
                            <div style={{fontSize:"13px",fontWeight:500,lineHeight:"35px"}}>₹ {service.fees}</div>
                            <div>
                              <button id='decreaseQty' onClick={()=>updateQty(service,service.qty - 1,index)}>-</button>&nbsp;&nbsp;
                              {service.qty}&nbsp;&nbsp;
                              <button id='increaseQty' onClick={()=>updateQty(service,service.qty + 1,index)} >+</button>
                            </div>
                          </div>
                          {/* {
                            totalAmount
                          } */}
                          <div>
                            <img src={service.serviceImageUrl}   alt="none" />
                          </div> 
                        </div>

                      )
                    }) : <h4>No items in cart</h4> 
          }
          </div>
          {/* <br /> */}
          {/* <br /> */}
          <div className={css.placeOrderContainer}>
            <div style={{lineHeight:"35px",fontWeight:"500"}}>Total ₹ {totalAmount}</div>
            <Link className={css.Link} to="/user/cart">View Cart </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
