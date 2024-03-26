import React, { useEffect, useState } from 'react'
import css from './userprofile.module.css'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserProfile = () => {

  const [user , setUser] = useState();

  const country = ['Nepal','United States','India'];

  const {register , handleSubmit} = useForm();

  const submitHandler = async (updatedData)=>{
    if(updatedData.phone.length != 10){return toast.error("Phone number is not valid",{position:"top-center"})}
    let arr = ['area','city','country','state','pincode','fname','lname','phone'];
    updatedData.index = 0
    for(let key in updatedData){
      if (updatedData[key] === '' || updatedData[key] === undefined ) {
        if(arr.includes(key)){
          updatedData[key] = user.address[0][key];
          console.log("changing value is",key ,"and",updatedData[key])
        }else{
          updatedData[key] = user[key];
          console.log("changing value is",key ,"and",updatedData[key])
        }
      }
    }
    console.log("changed data",updatedData);

    try {
      const updateData = await axios.put(`http://localhost:4001/user/user/${sessionStorage.getItem('userEmail')}`,updatedData)
      console.log("upate response is",updateData)
      if(updateData.data.data.acknowledged === true){
          toast.success(updateData?.data?.message,{theme : "colored"});
      }
      
    } catch (error) {
      console.log("error is",error)
    }
  }

  const getUser = async ()=>{
    try{
      let email = sessionStorage.getItem('userEmail');
      let fetchedUser = await axios.post("http://localhost:4001/user/userByEmail" , {email : email})
      await setUser(fetchedUser.data.data)
    }catch(err){
      console.log("error is ",err)
    }
  }

  useEffect(()=>{
    let getUser1 = async ()=>{
      try{
        let email = sessionStorage.getItem('userEmail');
        console.log("emial",email)
        let fetchedUser = await axios.post("http://localhost:4001/user/userByEmail" , {email : email})
        console.log(fetchedUser.data.data)  
        await setUser(fetchedUser.data.data)
        console.log("user is ",user)
        // return fetchedUser.data.data
      }catch(err){
        console.log("error is ",err)
      }
    }
    getUser1();
  },[])

  return (
    <div className="body">

      <div className={css.profileBody}>

        <div className={css.profile}>
        
            <div className={css.formcontainer}>

            <div id={css.heading1}>User Profile</div>
            <br /><br />
                <form onSubmit={handleSubmit(submitHandler)} >
                    <br />
                    <div className={css.formheading}>Personal Information</div>
                    <br />
                    <div className={css.horizLine}></div>
                    <br />
                    <div className={css.formInfoTypeContainer}>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="fname">First Name</label>
                                <input type="text" defaultValue={user?.address[0]?.fname} required {...register('fname')}/>
                                <span id='fname'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="lname">Last Name</label>
                                <input type="text" defaultValue={user?.address[0]?.lname} required {...register('lname')} />
                                <span id='lname'></span>
                            </div>
                        </div>
                        
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="email">Email</label>
                                <input type="text" defaultValue={user?.email}{...register('email')} disabled style={{cursor:"not-allowed"}}/>
                                <span id='email'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="phone">Phone</label>
                                <input type="number" defaultValue={user?.address[0]?.phone} required {...register('phone')}/>
                                <span id='phone'></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="country">Country</label>
                                <select name="" required {...register('country')}>
                                  {
                                    user?.address[0]?.country   
                                    ? country.map((ctry)=>{
                                      if(ctry === user?.address[0]?.country){
                                        {
                                          console.log("country is ",ctry);
                                        }
                                        return (
                                          <option value={user?.address[0].country} selected >{user?.address[0].country}</option>
                                        )
                                      }else{
                                        return (
                                          <option value={ctry} >{ctry}</option>
                                        )
                                      }
                                    })  
                                       : <>
                                          <option value="" selected>Select</option>
                                          <option value="India" >India</option>
                                          <option value="Nepal">Nepal</option>
                                          <option value="United States">United States</option>
                                        </>
                                  }
                                </select>
                                <span id="country"></span>
                            </div>
                        </div>
                        <div className={css.rowCols1}>
                            <div className={css.input}>
                                <label htmlFor="street" >Street, Area or Society</label>
                                <textarea  cols="10" rows="5" defaultValue={user?.address[0]?.street} required  {...register('street')}></textarea>
                                <span id='street'></span>
                            </div>
                            
                        </div>
                        
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="area" >Area</label>
                                <input type="text" defaultValue={user?.address[0]?.area} required {...register('area')}/>
                                <span id='area'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="city" >City</label>
                                <input type="text" defaultValue={user?.address[0]?.city} required {...register('city')}/>
                                <span id='city'></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="state" >State</label>
                                <input type="text" defaultValue={user?.address[0]?.state} required {...register('state')}/>
                                <span id='state'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="pincode" >Postal Code</label>
                                <input type="text" defaultValue={user?.address[0]?.pincode} required {...register('pincode')}/>
                                <span id='pincode'></span>
                            </div>
                        </div>
                    </div>
                    <br /><br /><br />
                    <div className={css.formheading}>Change Password </div>
                    <br />
                    <div className={css.horizLine}></div>
                    <br />
                    <div className={css.formInfoTypeContainer}>
                        
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="password">Password</label>
                                <input type="text" defaultValue={user?.password}  {...register('password')} />
                                <span id='password'></span>
                            </div>    
                        </div>
                    </div>


                    <br />
                    <br />
                   <br />
                   <br />
                
                    
                    <div style={{textAlign:"center"}}> 
                        <input type="submit" value="Save"  />
                    </div>
                </form>
            </div>
        </div>
          {/* <form >

            <div className={css.rowWith2Cols}>

              <div className={css.input}>
                <label htmlFor="">First Name </label>
                <input type="text" />
              </div>
              <div className={css.input}>
                <label htmlFor="">Last Name </label>
                <input type="text" />
              </div>

            </div>
            <div className={css.rowWith1Cols}>
              <div className={css.input}>
                <label htmlFor="">Email </label>
                <input type="text" />
              </div>
            </div>
            
            <div className={css.rowWith1Cols}>
              <div className={css.input}>
                <label htmlFor="">Phone </label>
                <input type="text" />
              </div>
            </div>

            <div className={css.rowWith1Cols}>
              <div className={css.input}>
                <label htmlFor="">Email </label>
                <input type="text" />
              </div>
            </div>

              

          </form> */}
        

      </div>
    <ToastContainer/>
    </div>
  )
}
