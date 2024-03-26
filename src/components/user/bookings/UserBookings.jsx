import React, { useEffect, useState } from 'react'
import css from './booking.module.css'
import axios, { all } from 'axios'
import {allOrderBtn,pendingOrderBtn,prevOrderBtn,cancelledOrderBtn} from './bookingScripts'

export const UserBooking = () => {

  let [totalOrders, setTotalOrders] = useState([]);
  // let [totalAmount, setTotalAmount] = useState(0);
  let [orders, setOrders] = useState([]);
  let [orderInfo , setOrderInfo] = useState();

  const allOrders = async()=>{
    allOrderBtn()
    setOrders(totalOrders);
    console.log("order in current is",orders);
  }
  const pendingOrders = async()=>{
    pendingOrderBtn()
    let filterOrder = totalOrders?.filter((order)=>order.status == "Pending")
    filterOrder = filterOrder.reverse()
    setOrders(filterOrder);
    console.log("order in current is",orders);
  }
  const cancelledOrders = async()=>{
    cancelledOrderBtn()
    let filterOrder = totalOrders?.filter((order)=>order.status == "Cancelled")
    filterOrder = filterOrder.reverse()
    setOrders(filterOrder);
    console.log("order in cancelled is",orders);
    
  }
  const previousOrders = async()=>{
    prevOrderBtn()
    let filterOrder = totalOrders?.filter((order)=>order.status == "Finished")
    filterOrder = filterOrder.reverse()
    setOrders(filterOrder);
    console.log("order in prev is",orders);
  }

  const getOrderInfo = async(order)=>{
    setOrderInfo(order);
    let bookingDetailsBody = document.getElementById("bookingDetailsBody")
    bookingDetailsBody.style.display = "block" 
  }
  const closeOrderInfo = async(order)=>{
    let bookingDetailsBody = document.getElementById("bookingDetailsBody")
    bookingDetailsBody.style.display = "none" 
  }

  useEffect(()=>{
    let getOrders = async ()=>{
      try {
        let order = await axios.get(`/userhistory/userhistory/${sessionStorage.getItem("userEmail")}`);
        console.log("orders are",order.data.orders[0].history)
        let orderArr = order.data.orders[0].history;
        orderArr = orderArr.reverse();
        await setTotalOrders(orderArr);
        await setOrders(orderArr);
      } catch (error) {
        console.log("error is",error)
      }
    }
    getOrders()
    
  },[])

  return (
    <div className="body">

    <div className={css.bookingBody}>
      {/* <div className={css.h1}>Your orders</div> */}
      <div className={css.orderContainer}>
        <div className={css.headings}>
          <button className={css.totalOrderHeading} id='totalOrder' onClick={()=>allOrders()}>Your Orders </button > &nbsp;
          <button className={css.headingBtn} id='pendingOrder' onClick={()=>pendingOrders()}>Pending Orders </button > &nbsp;
          <button className={css.headingBtn} id='prevOrder' onClick={()=>previousOrders()}>Previous Orders </button > &nbsp;
          <button className={css.headingBtn} id='cancelledOrder' onClick={()=>cancelledOrders()}>Cancelled Orders </button >
        </div>
        <div className={css.innerOrderContainer} id='yourOrder'>
          {
            orders?.length > 0 ?
            orders.map((order)=>{
              return(
                <div className={css.order}>
                  <div className={css.orderHeadingContainer}>
                    <div className={css.orderHeading}>
                      <div className={css.orderHeaderBox}>
                        <div className={css.orderHead}>BOOKED ON</div>
                        <div className={css.orderHeadData}>{order?.bookingDate}</div>
                      </div>
                      <div className={css.orderHeaderBox}>
                        <div className={css.orderHead}>TOTAL</div>
                        <div className={css.orderHeadData}>₹ {order?.totalAmount}</div>
                      </div>
                      <div className={css.orderHeaderBox}>
                        <div className={css.orderHead}>TO</div>
                        <div className={css.orderHeadData}>{order?.name}</div>
                      </div>  
                    </div>
                    <div className={css.viewOrderDetails} onClick={()=>getOrderInfo(order)}>View Order Details</div> 
                  </div>
                  
                  <div className={css.orderBody}>
                    {
                      order?.service.map((services)=>{
                        return(
                          <div className={css.service}>
                            <div className={css.imgContainer}>
                              <img src={services.service.serviceImageUrl}  alt="" />
                            </div>
                            <div>
                              <div className={css.serviceName}>{services.service.name}</div>
                              <hr />
                              {
                                services.service.description.length > 1 
                                ?<ul style={{fontSize:"13px",padding:"0",paddingLeft:"15px"}}> 
                                  {
                                    services.service.description.map((description)=>{
                                      return <li>{description.line}</li>
                                    })
                                  }     
                                </ul>
                                :<div style={{fontSize:"13px",paddingBottom:"15px"}}>{services.service.description[0].line}</div>
                              }
                              <div style={{fontSize:"13px",marginTop:"0px",fontWeight:"500",color:"rgb(60, 60, 60)"}}>₹ {services.service.fees}</div>
                            </div>
                            
                          </div>
                        )
                      })
                    }
                  </div>
                </div> 
            )})
            : <h4>Please book service to check history</h4>
          }
        </div>
      </div>

    </div>

    <div id='bookingDetailsBody' className={css.bookingDetailsBody}>
      <div className={css.bookingDetailsContainer}>
          <div className={css.h1} style={{backgroundColor:"rgb(215, 180, 255)"}}>Order Details  <span class="material-symbols-outlined" onClick={()=>closeOrderInfo()} style={{cursor:"pointer",float:"right",margin:"13px 10px"}}>close</span></div>
          <div className={css.bookingContainer}>
            <div style={{paddingBottom:"10px",fontWeight:"500"}}>Booked On ({orderInfo?.bookingDate})</div>
            <div className={css.bookingInfoContainer}>
              <div>
                <div className={css.orderHeader}>Address</div>
                <div className={css.orderData}>{orderInfo?.name}</div>
                <div className={css.orderData}>{orderInfo?.deliveryAddress?.street}</div>
                <div className={css.orderData}>{orderInfo?.deliveryAddress?.city}, {orderInfo?.deliveryAddress?.state} - {orderInfo?.deliveryAddress?.pincode}</div>
                <div className={css.orderData}>{orderInfo?.deliveryAddress?.country}</div>
              </div>
              <div>
                <div className={css.orderHeader}>Payment type</div>
                <div className={css.orderData}>{orderInfo?.paymentMode}</div>
              </div>
              <div className={css.slotContainer}>
              <div className={css.orderHeader}>Slot</div>
              <div className={css.orderData}>Date : {orderInfo?.slotDate}</div>
              <div className={css.orderData}>Time : {orderInfo?.slotTime}</div>
              </div>
              <div className={css.bookingSummary}>
                <div>
                  <div className={css.orderHeader} style={{borderBottom:"0px solid rgb(200,200,200)"}}>Booking summary</div>
                  <table className={css.orderTable} border='0px'>
                    <tbody>
                      {
                        orderInfo?.service.map((service)=>(
                          <tr>
                            <td width='50%'>{service.service.name}</td>
                            <td width='30%'>{service.qty}</td>
                            <td width='20%'>₹ {service.cost}</td>
                          </tr>
                          // <div className={css.orderData}>{service.service.name}</div>
                        ))
                      }
                      <tr>
                        <td>Total</td>
                        <td></td>
                        <td>₹ {orderInfo?.totalAmount + orderInfo?.discount}</td>
                      </tr>
                      <tr>
                        <td>Discount {orderInfo?.discount1}</td>
                        <td></td>
                        <td>- ₹ {orderInfo?.discount}</td>
                      </tr>
                      <tr>
                        <td>Grand Total </td>
                        <td></td>
                        <td>₹ {orderInfo?.totalAmount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
              </div>
            </div>
            <div className={css.orderBody} style={{marginTop:"20px",background:"none",padding:"0"}}>
                    {
                      orderInfo?.service.map((services)=>{
                        return(
                          <div className={css.service}>
                            <div className={css.imgContainer}>
                              <img src={services.service.serviceImageUrl}  alt="" />
                            </div>
                            <div>
                              <div className={css.serviceName}>{services.service.name}</div>
                              <hr />
                              {
                                services.service.description.length > 1 
                                ?<ul style={{fontSize:"13px",padding:"0",paddingLeft:"15px"}}> 
                                  {
                                    services.service.description.map((description)=>{
                                      return <li>{description.line}</li>
                                    })
                                  }     
                                </ul>
                                :<div style={{fontSize:"13px",paddingBottom:"15px"}}>{services.service.description[0].line}</div>
                              }
                              <div style={{fontSize:"13px",marginTop:"0px",fontWeight:"500",color:"rgb(60, 60, 60)"}}>₹ {services.service.fees}</div>
                            </div>
                            
                          </div>
                        )
                      })
                    }
                  </div>
          </div>
      </div>
    </div>
    </div>
  )
}
