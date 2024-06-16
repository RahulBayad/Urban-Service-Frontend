import React, { useEffect, useState } from 'react'
import css from './home.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

export const ServProHome = () => {

  const [requests , setRequests] = useState([])
  const [orderInfo , setOrderInfo] = useState();

  const calcTotal = (array)=>{
    // console.log("array",array)
    var total = 0
    for(let a of array){
      total = total + (a.cost * a.qty)
    }
    return total
  }

  const addOrder = async(order)=>{
    try {
      let response = await axios.post(`/servprohistory/addservice/${sessionStorage.getItem("servProEmail")}`,order)
      console.log("response",response)
      toast.success(response.data.message,{position:"top-center",theme:"colored"})
      fetchRequests();
    } catch (error) {
      console.log(error)
    }
  }

  const removeRow = async(rowId)=>{
    console.log("row id ",rowId)
    let row = document.getElementById(rowId)
    row.style.display = "none";
  }

  const fetchRequests = async ()=>{
    try {
      let request = await axios.get(`/serviceprovider/fetchServiceRequests/${sessionStorage.getItem("servProEmail")}`)
      console.log("request are",request.data.data)
      setRequests(request.data.data)
    } catch (error) {
      console.log(error)
    }
  } 
  const getOrderInfo = async(order)=>{
    await setOrderInfo(order);
    console.log("order",order)
    console.log("order info",orderInfo)
    let bookingDetailsBody = document.getElementById("bookingDetailsBody")
    bookingDetailsBody.style.display = "block" 
  }
  const closeOrderInfo = async(order)=>{
    let bookingDetailsBody = document.getElementById("bookingDetailsBody")
    bookingDetailsBody.style.display = "none" 
  }

  useEffect(()=>{
    fetchRequests();
  },[])

  return (
    <div className="body">
      <div className={css.homepageBody}>

        <div className={css.requestContainer}>
          <h1 style={{fontWeight:500,fontSize:"25px"}}>Order Requests</h1>
          <div className={css.requestTableContainer}>
            {
              requests?.length > 0 ?
              requests.map((request,index)=>{
                let rowId = "request"+index
                return(
                  <div className={css.requestRow} id={rowId}>
                    <div>
                    {
                      request?.service.map((service)=>{
                        return(
                            <div>{service.service.name}</div>
                          )
                        })
                      }
                    </div>
                    
                    {
                      request?.service? 
                      <div>₹ {calcTotal(request.service)}</div> : null
                    }
                    
                    <div>{request?.deliveryAddress.area}</div>
                    <div>
                      <button className={css.infoBtn} onClick={()=>getOrderInfo(request)}>
                        <span class="material-symbols-outlined">info</span>
                      </button>
                    </div>
                    <div className={css.actionBtn}>
                      <button className={css.acceptBtn} onClick={()=>addOrder(request)}>
                        <span class="material-symbols-outlined">check_circle</span>
                      </button>
                      <button className={css.rejectBtn} onClick={()=>removeRow(rowId)}>
                        <span class="material-symbols-outlined">block</span>
                      </button> 
                    </div>
                  </div>
                )
              }) 
              : <h2 style={{fontWeight:500,textAlign:"center"}}>Currently no order requests</h2>

            }
            
            {/* <div className={css.requestRow}>
              <div>TV repair (Demo)</div>
              <div>Shahibaug</div>
              <div>₹ 400</div>
              <div>
                <button className={css.infoBtn} >
                  <span class="material-symbols-outlined">info</span>
                </button>
              </div>
              <div className={css.actionBtn}>
                <button className={css.acceptBtn}>
                  <span class="material-symbols-outlined">check_circle</span>
                </button>
                <button className={css.rejectBtn}>
                  <span class="material-symbols-outlined">block</span>
                </button> 
              </div>
            </div> */}

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
                        ))
                      }
                      <tr>
                        <td>Total</td>
                        <td></td>
                        {/* {
                          orderInfo?.service.map((service)=>(
                            <td>₹ {service.cost * service.qty}</td>
                          ))
                          
                        } */}
                        {
                          orderInfo?.service? 
                          <td>{calcTotal(orderInfo.service)}</td> : null
                        }
                      </tr>   
                      <tr>
                        <td>Discount {orderInfo?.discount1}</td>
                        <td></td>
                        <td>- ₹ 0</td>
                      </tr>
                      <tr>
                        <td>Grand Total </td>
                        <td></td>
                        {
                          orderInfo?.service? 
                          <td>{calcTotal(orderInfo.service)}</td> : null
                        }
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
                              <div style={{display:"grid",gridTemplateColumns:"auto 80px"}}>
                                <span className={css.serviceName}>{services.service.name}</span>
                                {/* {
                                  orderInfo.status == "Success" ? <button className={css.statusSuccess}>{orderInfo.status}</button>
                                  : orderInfo.status == "Pending" ?
                                  <button className={css.statusPending}>{orderInfo.status}</button>
                                  : orderInfo.status == "Cancelled" ?
                                  <button className={css.statusCancelled}>{orderInfo.status}</button> : null
                                } */}
                              </div>
                                
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
                              <div>
                                <span style={{fontSize:"13px",marginTop:"0px",fontWeight:"500",color:"rgb(60, 60, 60)"}}>₹ {services.service.fees}</span>
                                &nbsp;&nbsp;
                              </div>
                            </div>
                            
                          </div>
                        )
                      })
                    }
                  </div>
          </div> 
          
      </div>
    </div>
    <ToastContainer/>
    </div>
  )
}
