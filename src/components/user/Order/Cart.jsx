import React, { useEffect, useState } from 'react'
import css from './cart.module.css'
import axios from 'axios';
import { getCart } from '../services/ServicesApi';
import { Link } from 'react-router-dom';
export const Cart = () => {

    const [serviceCart , setServiceCart] = useState([]) ;
    const [totalAmount , setTotalAmount] = useState(0);
  
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
        cart.map((service)=>(
          updatedAmount = updatedAmount + (service.fees*service.qty)
        ))
        return updatedAmount;
    }

    useEffect(()=>{
        const initializeCart = async () => {
            let cart = await getCart();
            console.log("cart is updated", cart);
            setServiceCart(cart);
            let updatedAmount = 0;
            cart.map((service)=>(
              updatedAmount = updatedAmount + (service.fees*service.qty)
            ))
            setTotalAmount(updatedAmount)

        };
      
          initializeCart();
    },[])

    return (
        <div className='body'>
            
            <div className={css.CartPageBody}>
                
                <div className={css.cart}>
                {
                    serviceCart.length > 0 ?
                    serviceCart.map((service,index)=>{
                      return (
                        <div className={css.service}> 
                          {/* <div  > */}
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
                                        return <li>{description?.line}</li>
                                    })
                                    }     
                                </ul>
                                :<div style={{fontSize:"13px"}}>{service.description[0]?.line}</div>
                            }
                            <br />
                            <div>
                                <button id='decreaseQty' onClick={()=>updateQty(service,service.qty - 1,index)}>-</button>&nbsp;&nbsp;
                                {service.qty}&nbsp;&nbsp;
                                <button id='increaseQty' onClick={()=>updateQty(service,service.qty + 1,index)} >+</button>
                            </div>
                          </div>
                          {/* </div> */}
                          
                            <div className={css.serviceImgBox}>
                                <img src={service.serviceImageUrl} className={css.serviceImg} alt="" />
                            </div>  
                        </div>

                      )
                    }) : <h4 style={{textAlign:"center"}}>Empty</h4> 
                    }
                </div>
                <div className={css.placeOrderContainer}>
                  {
                    serviceCart.length > 0 ?
                    <>
                      <div style={{overflow:"auto"}}>
                        <table className={css.billingTable} border='0px'>
                          <tbody>
                            <tr>
                              <th width='45%'></th>
                              <th >Qty.</th>
                              <th >Price</th>
                              <th >Total</th>
                            </tr>
                              {
                                
                                serviceCart?.map((service)=>{
                                  return(
                                    <tr>
                                      <td>{service.name}</td>
                                      <td>{service.qty}</td>
                                      <td>₹ {service.fees}</td>
                                      <td>₹ {service.qty*service.fees}</td>
                                    </tr>
                                  )
                                })
                              }
                            
                            <tr style={{borderTop:" 1px solid black"}}>
                              <td>Total </td>
                              <td></td>
                              <td></td>
                              <td>₹ {totalAmount }</td>
                            </tr>
                            <tr>
                              <td>Discount (10%)</td>
                              <td></td>
                              <td></td>
                              <td>- ₹ {totalAmount/10}</td>
                            </tr>
                            <tr style={{borderTop:" 1px solid black"}}>
                              <td>Total Fair Price</td>
                              <td></td>
                              <td></td>
                              <td >₹ {totalAmount - totalAmount/10}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>                  
                      <div style={{display:"grid",gridTemplateColumns:"auto 100px",marginTop:"20px"}}>

                        <div style={{lineHeight:"35px",fontWeight:"500",fontSize:"13px",paddingLeft:"8px"}}>&nbsp;Final Amount ₹ {totalAmount - totalAmount/10}</div>
                        <Link className={css.Link} to="/user/checkout">Place Order </Link>
                      </div>
                    </>

                  : <h3>Cart is Empty</h3>
                  }

                </div>







            </div>
        
        </div>
    )
}
