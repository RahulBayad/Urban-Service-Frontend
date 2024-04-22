import React, { useEffect, useState } from 'react'
import css from './checkout.module.css'
import { getCart} from '../services/ServicesApi';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import deleteIcon from './deleteIcon.png'
import editIcon from './editIcon.png'
import cardIcon from './cardIcon.png'
import { Link, useNavigate } from 'react-router-dom';
import { todaySlotFunction , tomorrowSlotFunction,openCard,openUpi,closeAll } from './checkoutScripts';

export const Checkout = () => {

  const navigate = useNavigate();
  const {register , handleSubmit} = useForm();
  const { register: registerEditForm, handleSubmit: handleEditForm } = useForm();
  const { register: checkoutForm, handleSubmit: handleCheckoutForm } = useForm();

  const months = [1,2,3,4,5,6,7,8,9,10,11,12];
  const years = [2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2036,2037,2037,2038,2039,2040];

  const [serviceCart , setServiceCart] = useState([]) ;
  const [totalAmount , setTotalAmount] = useState(0);
  const [finalAmount , setFinalAmount] = useState(0);
  const [user , setUser] = useState();
  const [userAddress , setUserAddress] = useState();
  const [todaySlot , setTodaySlot] = useState([]);
  const [tomorrowSlot , setTomorrowSlot] = useState([]);
  const [date,setDate] = useState(null);

  let addIndexToChangeBkg = '';

  const changeBkg = (addId)=>{
    let prevAddress = document.getElementById(addIndexToChangeBkg)
    if(prevAddress){prevAddress.style.background = "none"}
    let address = document.getElementById(addId)
    address.style.backgroundColor = "rgba(207, 147, 255, 0.2)"
    addIndexToChangeBkg = addId;
  }
  
  const closeAddressForm = async()=>{
    let addressBox = document.getElementById('addAddress')
    addressBox.style.display = "none"
  }
  const openAddressForm = async(address)=>{
    let addressBox = document.getElementById('addAddress')
    // console.log("add is",address)
    addressBox.style.display = "block";
  }
  const closeEditForm = async()=>{
    let addressBox = document.getElementById('editAddress')
    addressBox.style.display = "none"
  }
  const openEditForm = async(address,index)=>{
    let addressBox = document.getElementById('editAddress')
    addressBox.style.display = "block";
    console.log("address is is",address)
    address.index = index;
    setUserAddress(address);
  }

  let getUser = async ()=>{
    try{
      let email = sessionStorage.getItem('userEmail');
      let fetchedUser = await axios.post("/user/userByEmail" , {email : email})
      await setUser(fetchedUser.data.data)
    }catch(err){
      console.log("error is ",err)
    }
  }

  const removeAddress = async(index)=>{
    try {
      let removedAddress = await axios.delete(`/user/removeAddress/${sessionStorage.getItem('userEmail')}`,{
        data:{index:index}
      })
      console.log("removeAddress",removedAddress)
      toast.success(removedAddress.data.message,{theme:'colored',position:"top-center"});
      getUser()
    } catch (error) {
      console.log("error",error);
      toast.error(error.data.message)
    }
  }

  const getSlots =()=>{
    let time = new Date().getHours();
    let todaySlots = [];
    let tomorrowSlots = [];
    let iterator = time;
    if(time < 10){iterator = 9}
    let timingSign;
    for(let i = iterator+1; i<22 ; i++){
      if(i<12){timingSign = "AM"}
      if(i>=12){timingSign = "PM"}
      todaySlots.push(`${i}:00 ${timingSign}`)
      todaySlots.push(`${i}:30 ${timingSign}`)
    }
    for(let i = 10 ; i<22 ; i++){
      if(i<12){timingSign = "AM"}
      if(i>=12){timingSign = "PM"}
      tomorrowSlots.push(`${i}:00 ${timingSign}`)
      tomorrowSlots.push(`${i}:30 ${timingSign}`)
    }
    setTodaySlot(todaySlots);
    setTomorrowSlot(tomorrowSlots);
    return null
  }

  const checkFormHandler = async (formData)=>{
    let calender = new Date();
    let todayDate = calender.getDate()+"-"+(calender.getMonth()+1)+"-"+calender.getFullYear()
    formData.address = JSON.parse(formData.address);
    formData.user = user;
    formData.email = user.email;
    formData.service = serviceCart;
    formData.discount = (totalAmount/10);
    formData.totalAmount = totalAmount - (totalAmount/10)
    formData.slotDate = date;
    formData.bookingDate = todayDate;
    formData.status = "Pending";
    console.log("checkout form data is ",formData);

    try {
      let order = await axios.post('/userhistory/addorder',formData);
      console.log("order",order);
      toast.success(order.data.message,{theme:'colored',position:"top-center"})
      let deleteCart = await axios.put(`/user/cart/emptyCart/${user.email}`)
      console.log("cart response is",deleteCart)
      setTimeout(() => {
        navigate('/user');
      }, 2000);
      
    } catch (error) {
      console.log("error is ",error)
    }

  }

  const submitHandler = async(formData)=>{
    console.log("submited data is",formData)
    try {
        let email = sessionStorage.getItem('userEmail');
        let result = await axios.put(`/user/addAddress/${email}`, formData)
        console.log("result is",result);
        toast.success(result?.data?.message,{theme:"colored",position:"top-center"});
        await getUser();
        closeAddressForm();
      }catch (error) {
          console.log("error",error)
      }
  }

  const editFormHandler = async(formData)=>{
    // console.log("index is",userAddress.index)
    let index = userAddress.index;
    let email = sessionStorage.getItem('userEmail');
    for(let key in formData){
      if(formData[key] == ''){
        formData[key] = userAddress[key]
      }
    }
    console.log("edit address",formData)
    try {
      let result = await axios.put(`/user/editAddress/${email}`,{data:formData,index : index})
      if(result.data.data.acknowledged === true){
        toast.success(result.data.message,{theme:"colored",position:"top-center"})
        closeEditForm();
        getUser();
      }
    } catch (error) {
      console.log("error",error)
    }
  }

  useEffect(()=>{
    const initializeCart = async () => {
        let cart = await getCart();
        setServiceCart(cart);
        let updatedAmount = 0;
        cart?.map((service)=>{
          updatedAmount = updatedAmount + (service.fees*service.qty)
        })
        await setTotalAmount(updatedAmount)
        await setFinalAmount(updatedAmount - updatedAmount/10)
    };
    initializeCart();
    let getUser = async ()=>{
      try{
        let email = sessionStorage.getItem('userEmail');
        let fetchedUser = await axios.post("/user/userByEmail" , {email : email})
        await setUser(fetchedUser.data.data)
      }catch(err){
        console.log("error is ",err)
      }
    }
    getUser();
    getSlots();
    setDate(todaySlotFunction())
  
},[])
  return (
    <div className='body'>
        
        <div className={css.CheckoutBody}>
          <div style={{maxWidth:"auto"}}>
            <form onSubmit={handleCheckoutForm(checkFormHandler)} className={css.checkoutForm}>
            <div className={css.h1}>1. Select your address</div>
            <div className={css.addressContainer}>
                <div className={css.h2} style={{lineHeight:"40px"}}>Your addresses</div>
                
                <div className={css.hr}></div>
                <br />
                <div className={css.innerAddressContainer}>                  
                      {
                        user?.address ?
                        user?.address?.map((address,index)=>{
                          
                          var addId = "add"+index;
                          var radioId = "radio"+(index)
                          return(
                            <div className={css.address} id={addId}>
                              <div className={css.radio} onClick={()=>changeBkg(addId)}>
                                <input type="radio" name='address' id={radioId} required value={JSON.stringify(address)} style={{width:"15px" , border:"none"}} {...checkoutForm('address')}  />
                              </div>
                              <label htmlFor={radioId} onClick={()=>changeBkg(addId)}>
                                <div>{address.fname} {address.lname}, ({address.phone})</div>
                                <div>{address.street} , {address.area} , {address.city}, {address.state}-{address.pincode}, {address.country},</div>
                              </label>
                              <div className={css.actionIcons}>
                                <div>
                                  <img src={editIcon} onClick={()=>openEditForm(address , index)} height='25px' alt="" />
                                  &nbsp;&nbsp;  
                                  <img src={deleteIcon} onClick={()=>removeAddress(index)} height='25px' alt="" />
                                </div>
                              </div>
                            </div>
                          )
                        }) : <h5>no address</h5>
                      }
                    {/* </div> */}
                    {/* <br /> */}
                </div>
                <div onClick={()=>openAddressForm()} style={{cursor:"pointer",display:"grid",gridTemplateColumns:"10px auto",gap:"25px",padding: "10px 0",border:"0px solid red"}}> 
                  <span style={{fontSize:"23px",lineHeight:"27px",paddingLeft:"4px"}}>+</span><span style={{lineHeight:"30px"}}> Add a new address</span>
                </div>
            </div>
            
            <div className={css.h1} style={{marginTop:"20px"}}>2. Slot</div>
            <div className={css.slotContainer}>
              <div className={css.innerSlotContainer}>
                <div className={css.dateHeadings}>
                  <div className={css.h3} id='todayHeader' onClick={()=>setDate(todaySlotFunction())} style={{cursor:"pointer",textAlign:"center",borderBottom:"2px solid rgb(170, 0, 255)"}}>Today</div>
                  <div className={css.h3} id='tomHeader' onClick={()=>setDate(tomorrowSlotFunction())} style={{cursor:"pointer",textAlign:"center"}}>Tomorrow</div> 
                </div>
                <br />
                <div >
                  <div id='today' className={css.todayBox}>
                    {todaySlot?.map((slot)=>{
                      let id= "today"+slot
                      return(
                      <div className={css.slot}>
                        {/* <div style={{display:"flex",gap:"0px"}}> */}
                        <input type='radio' name='slot' value={slot} id={id}  style={{width:"1px"}} required {...checkoutForm('slotTime')}/>
                        <label htmlFor={id}>
                          {slot}</label>
                        
                        {/* </div> */}
                      </div>)
                    })}
                  </div>  
                  <div id='tomorrow' className={css.tomorrowBox} >
                    {tomorrowSlot?.map((slot)=>{
                      return(
                        <div className={css.slot}>                      
                          <input type='radio' name='slot' value={slot} id={slot}  style={{width:"1px"}} required {...checkoutForm('slotTime')}/>
                          <label htmlFor={slot} >
                          {slot}</label>
                      </div>)
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className={css.h1} style={{marginTop:"20px"}}>3. Payment Method</div>
            <div className={css.paymentContainer}>
              <div className={css.innerPaymentContainer}>
                <div className={css.input} id='cardContainer'>
                  <input type="radio" name="paymentType" id="card" className={css.card} required value="Card" onClick={()=>openCard()} {...checkoutForm('paymentType')} />
                  <div>
                    <label htmlFor='card' onClick={()=>openCard()}>Credit or debit card</label>
                    <div id='addCard' className={css.addCard} >
                        <div style={{fontSize:"14px",letterSpacing:"0.3px",border:"0px solid red",display:"flex",gap:"10px",cursor:"pointer"}} >
                          <img src={cardIcon} height="18px" alt="" /><span>Enter card details</span>
                        </div>
                        
                          <div><input type="number" placeholder='Card Number' /> <button>Verify Card</button></div>
                          <input type="number" placeholder='CVV' />
                          <div>
                            <select id="">
                              {
                                months.map((month)=>{
                                  return (<option value={parseInt(month)}>{month}</option>)
                                })
                              }
                            </select> &nbsp; 
                            <select id="">
                              {
                                years.map((year)=>{
                                  return (<option value={parseInt(year)}>{year}</option>)
                                })
                              }
                            </select>
                          </div>  
                    </div>
                  </div>
                </div>
                <div id='upiContainer' className={css.input} style={{border:"0px solid black"}}>
                  <input type="radio" name="paymentType" id="upi" value="UPI" required {...checkoutForm('paymentType')} onClick={()=>openUpi()}/>
                  <div>
                    <label htmlFor="upi" onClick={()=>openUpi()}>UPI</label>
                    <div className={css.upiVerify} id='upiVerify'>
                      <input type="text" placeholder='Enter UPI ID' /> <button>Verify</button>
                      <div></div>
                    </div>
                  </div>
                </div>
                <div className={css.input} id='cashContainer'>
                  <input type="radio" name="paymentType" id="cash" value="Cash" required onClick={()=>closeAll()}{...checkoutForm('paymentType')}/>
                  <label htmlFor="cash" onClick={()=>closeAll()}>Cash</label>
                </div>
              </div>
            </div>
            <br />
            <button type="submit" className={css.placeOrderButton} >Place Order</button>
            <br /><br />
            </form>
          </div>

          <div className={css.billingContainer}>
          <div >
                {
                  serviceCart.length > 0 ?
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

                : <h3>Cart is Empty</h3>
                }
                  </div>
                  <br />
                  <br />
          </div>
        </div>
               
        
      <div className={css.addNameAddressContainer} id='addAddress' >
        <div className={css.addNameAddress}>
          <div style={{backgroundColor:"rgb(179,0,255)",color:"black",padding:"10px 0px",paddingLeft:"40px"}}>
            <span className={css.h2} style={{color:"white",paddingLeft:"5px"}}>
              Add a new address
            </span>
            <span onClick={()=>closeAddressForm()} class="material-symbols-outlined" style={{float:"right",marginRight:"5px",cursor:"pointer"}}>close</span>
          </div>
          <form onSubmit={handleSubmit(submitHandler)} className={css.addressForm}>
              <div className={css.input}>
                <input type="text" id='fname' placeholder='First Name'  required  {...register('fname')} />
              </div>
              <div className={css.input}>
                <input type="text" id='lname' placeholder='Last Name'  required {...register('lname')}  />
              </div>
              <div className={css.input}>
                <input type="text" id='phone' placeholder='Mobile No.'  required {...register('phone')}  />
              </div>
              <div className={css.input}>
                <textarea cols="30" rows="25" id='textarea'  placeholder='Street/ Flat no./ Building Name/ House no.' required {...register('street')} />
              </div>
              <div className={css.input}>
                <input type="text" id='area' placeholder='Area' required  {...register('area')}  />
              </div>
              <div className={css.input}>
                <input type="text" id='city' placeholder='City' required  {...register('city')}  />
              </div>
              <div className={css.input}>
                <input type="text" id='state' placeholder='State' required  {...register('state')} />
              </div>
              <div className={css.input}>
                <input type="text" id='pincode' placeholder='Pincode' required  {...register('pincode')} />
              </div>
              <div className={css.input}>
                <select id="country" required {...register('country')} >
                  <option value="" disabled selected>Country</option>
                  <option value="India">India</option>
                  <option value="Nepal">Nepal</option>
                  <option value="United States">United States</option>
                </select>
              </div>
              <button type='submit'>Add</button>
                      {/* <br /> */}
          </form>
        </div>
      </div>
      <div className={css.addNameAddressContainer} id='editAddress' >
        <div className={css.addNameAddress}>
          <div style={{backgroundColor:"rgb(179,0,255)",color:"black",padding:"10px 0px",paddingLeft:"40px"}}>
            <span className={css.h2} style={{color:"white",paddingLeft:"5px"}}>
              Edit existing address
            </span>
            <span onClick={()=>closeEditForm()} class="material-symbols-outlined" style={{float:"right",marginRight:"5px",cursor:"pointer"}}>close</span>
          </div>
          <form onSubmit={handleEditForm(editFormHandler)} className={css.addressForm}>
              <div className={css.input}>
                <input type="text" id='fname' placeholder='First Name' defaultValue={userAddress?.fname}  required  {...registerEditForm('fname')} />
              </div>
              <div className={css.input}>
                <input type="text" id='lname' placeholder='Last Name' defaultValue={userAddress?.lname} required {...registerEditForm('lname')}  />
              </div>
              <div className={css.input}>
                <input type="text" id='phone' placeholder='Mobile No.' defaultValue={userAddress?.phone}  required {...registerEditForm('phone')}  />
              </div>
              <div className={css.input}>
                <textarea cols="30" rows="25" id='textarea' defaultValue={userAddress?.street} placeholder='Street/ Flat no./ Building Name/ House no.' required {...registerEditForm('street')} />
              </div>
              <div className={css.input}>
                <input type="text" id='area' placeholder='Area' required defaultValue={userAddress?.area} {...registerEditForm('area')}  />
              </div>
              <div className={css.input}>
                <input type="text" id='city' placeholder='City' required defaultValue={userAddress?.city} {...registerEditForm('city')}  />
              </div>
              <div className={css.input}>
                <input type="text" id='state' placeholder='State' required defaultValue={userAddress?.state} {...registerEditForm('state')} />
              </div>
              <div className={css.input}>
                <input type="text" id='pincode' placeholder='Pincode' required defaultValue={userAddress?.pincode} {...registerEditForm('pincode')} />
              </div>
              <div className={css.input}>
                <select id="country" required  {...registerEditForm('country')} >
                  <option value={userAddress?.country}  selected>{userAddress?.country}</option>
                  <option value="India">India</option>
                  <option value="Nepal">Nepal</option>
                  <option value="United States">United States</option>
                </select>
              </div>
            
              <button type='submit' onSubmit={()=>closeEditForm()} >Edit</button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}
