import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react'
import urbanServiceLogo from './urbanServiceLogo.png'
import  css from './editProfile.module.css'
import uploadIcon from './uploadIcon.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const formValidation = require('./editProfileScripts');

export const ServProProfile = () => {

  const [imgIcon , setImgIcon] = useState(uploadIcon);
  const [servProData , setServProData] = useState();
  const {register , handleSubmit} = useForm();
  const navigate = useNavigate();
  
  const country = ['India','Nepal']
  const gender = ['Male','Female','Other']
  const maritalStatus = ['Married','Unmarried','Widowed']
  const qualification = ["10th Pass","12th Pass",'Graduate','Post-gradute'];

  const printGender = (genderVal)=>{
    return gender.map((gender)=>{
        if(gender != genderVal){
            console.log("gender is",gender)
            return (<option value={gender}>{gender}</option>)
        }
    })
  }
  const printCountry = (countryVal)=>{
    return country.map((country)=>{
        if(country != countryVal){
            return (<option value={country}>{country}</option>)
        }
    })
  }
  const printMaritalStatus = (maritalStatusVal)=>{
    return maritalStatus.map((maritalStatus)=>{
        if(maritalStatus != maritalStatusVal){
            return (<option value={maritalStatus}>{maritalStatus}</option>)
        }
    })
  }
  const printQualification = (qualificationVal)=>{
    return qualification.map((qualification)=>{
        if(qualification != qualificationVal){
            return (<option value={qualification}>{qualification}</option>)
        }
    })
  }

  const submitHandler = async (data) =>{
      
      console.log(data)
      let flag = formValidation.validateServProProfile(data);
      if(!flag){
          return null;
      }
      
      try {
          let reqObj = new FormData();
          {
              reqObj.append('fname',data.fname)
              reqObj.append('lname',data.lname)
              reqObj.append('dob',data.dob)
              reqObj.append('gender',data.gender)
              reqObj.append('maritalStatus',data.maritalStatus)
              reqObj.append('email',data.email)
              reqObj.append('phone',data.phone)
              reqObj.append('country',data.country)
              reqObj.append('street',data.street)
              reqObj.append('area',data.area)
              reqObj.append('city',data.city)
              reqObj.append('state',data.state)
              reqObj.append('pincode',data.pincode)
              reqObj.append('qualification',data.qualification)
              reqObj.append('degree',data.degree)
              reqObj.append('accountHolder',data.accountHolder)
              reqObj.append('accountNumber',data.accountNumber)
              reqObj.append('bank',data.bank)
              reqObj.append('ifsc',data.ifsc)
              reqObj.append('password',data.password)
              reqObj.append("profilePictureUrl",data.profilePictureUrl[0]);
          }
          const res = await axios.update("/serviceprovider/serviceprovider",reqObj)
          // console.log("res",res.response.data.data);
          console.log("Registration successful",res.data);
          toast.success(`${res.data.data}`,{position:"top-center",theme:'colored'});
          setTimeout(()=>{
              navigate('/');
          },3000)
      } catch (error) {
          console.log(error)
          console.log(error.response.data.data)
          toast.error(`${error.response.data.data}`,{position:"top-center",theme:"light"});
      }

  }
  
  const uploadImage = (selectedImg,imgMessage)=>{
      try{
          let fileUrl = selectedImg.files[0];
          console.log(fileUrl);
          setImgIcon(URL.createObjectURL(selectedImg.files[0])); 
          imgMessage.textContent = "Image Selected";
          
      }catch(err){
          console.log("error is...",err);
      }
  }

  const getServPro = async()=>{
    try {
        let response = await axios.get(`/serviceprovider/serviceprovider/${sessionStorage.getItem('servProEmail')}`)
        setServProData(response.data.data);
    } catch (error) {
        console.log("error",error)
    }
  }
 
  useEffect(()=>{
      console.log("use effect");
      var selectedImg = document.getElementById('selectedImg');
      var imgMessage = document.getElementById('image-message');
      var dropBox = document.getElementById('dropBox');
      if(selectedImg){
          selectedImg.addEventListener("change",()=>uploadImage(selectedImg,imgMessage))
      }
      if(dropBox){
          dropBox.addEventListener("dragover",(events)=>{
              events.preventDefault();
          })
          dropBox.addEventListener("drop",(events)=>{
              events.preventDefault();
              console.log(events.dataTransfer.files[0]);
              console.log("url is ",URL.createObjectURL(events.dataTransfer.files[0]))
              setImgIcon(URL.createObjectURL(events.dataTransfer.files[0]))
              imgMessage.textContent = "Image Dropped";
          })
      }
       getServPro();   
  },[]);

  return (
    <div className='body'>
        <div className={css.formbody}>
          {/* <h1>sfdgjndfng</h1> */}
            <div id={css.heading1}>Edit your profile</div>
            {/* <h2>sfdnj</h2> */}
            <br />
            <div className={css.formcontainer}>
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
                                <input type="text" defaultValue={servProData?.fname} {...register('fname')}/>
                                <span id='fname'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="lname">Last Name</label>
                                <input type="text" defaultValue={servProData?.lname} {...register('lname')} />
                                <span id='lname'></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="dob">Date of Birth</label>
                                <input type="date" defaultValue={servProData?.dob} {...register('dob')} />
                                <span id='dob'></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="gender">Gender</label>
                                <select name="" defaultValue={servProData?.gender} {...register('gender')}>
                                    <option value={servProData?.gender}>{servProData?.gender}</option>
                                    {printGender(servProData?.gender)}
                                </select>
                                <span id="gender"></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="maritalStatus">Marital Status</label>
                                <select name="" defaultValue={servProData?.maritalStatus} {...register('maritalStatus')}>
                                    <option value={servProData?.maritalStatus} selected >{servProData?.maritalStatus} </option>
                                    {printMaritalStatus(servProData?.maritalStatus)}
                                </select>
                                <span id="maritalStatus"></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="email">Email</label>
                                <input type="text" defaultValue={servProData?.email} disabled {...register('email')}/>
                                <span id='email'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="phone">Phone</label>
                                <input type="number" defaultValue={servProData?.phone} {...register('phone')}/>
                                <span id='phone'></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="country">Country</label>
                                <select name="" defaultValue={servProData?.address?.country} {...register('country')}>
                                    <option value={servProData?.address?.country} selected >{servProData?.address?.country}</option>
                                    {printCountry(servProData?.address?.country)}
                                </select>
                                <span id="country"></span>
                            </div>
                        </div>
                        <div className={css.rowCols1}>
                            <div className={css.input}>
                                <label htmlFor="street" >Street, Area or Society</label>
                                <textarea  cols="10" rows="5" defaultValue={servProData?.address?.street} {...register('street')}></textarea>
                                <span id='street'></span>
                            </div>
                            
                        </div>

                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="area" >Area</label>
                                <input type="text" defaultValue={servProData?.address?.area} {...register('area')}/>
                                <span id='area'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="city" >City</label>
                                <input type="text" defaultValue={servProData?.address?.city} {...register('city')}/>
                                <span id='city'></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="state" >State</label>
                                <input type="text" defaultValue={servProData?.address?.state} {...register('state')}/>
                                <span id='state'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="pincode" >Postal Code</label>
                                <input type="text" defaultValue={servProData?.address?.pincode} {...register('pincode')}/>
                                <span id='pincode'></span>
                            </div>
                        </div>
                        <div className={css.rowCols1}>
                            <div className={css.input}>
                                <label htmlFor="">Photo</label>
                                <div className={css.uploadImage}>
                                    <input type="file" id="selectedImg" {...register('profilePictureUrl')} hidden/>
                                    <label htmlFor="selectedImg" id='dropBox' className={css.dropBox} >
                                        <div className={css.dropBoxInner} id='dropBoxInner'>
                                            <br />
                                            <br />
                                            <img id="displaySelectedFile" className={css.displaySelectedFile} src={servProData?.profilePictureUrl} height="100px" alt="wait" />
                                            <p id='image-message'>Click here to upload image</p>
                                        </div>
                                    </label>
                                    <span id="selectedImgMsg"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br /><br />
                    <div className={css.formheading}>Education </div>
                    <br />
                    <div className={css.horizLine}></div>
                    <br />
                        
                    <div className={css.formInfoTypeContainer}>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="qualification">Qualification</label>
                                <select defaultValue={servProData?.education?.qualification} {...register('qualification')}>
                                    <option value={servProData?.education?.qualification} selected >{servProData?.education?.qualification}</option>
                                    {printQualification(servProData?.education?.qualification)}
                                </select>
                                <span id='qualification'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="degree">Degree (If graduate)</label>
                                <input type="text" defaultValue={servProData?.education?.degree} {...register('degree')} />
                                <span id='degree'></span>
                            </div>
                        </div>
                    </div>
                    <br /><br /><br />
                    <div className={css.formheading}>Bank Account Details </div>
                    <br />
                    <div className={css.horizLine}></div>
                    <br />
                    
                    <div className={css.formInfoTypeContainer}>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="accountHolder">Name as per bank account</label>
                                <input type="text" defaultValue={servProData?.bankAccount.accountHolder} {...register('accountHolder')} />
                                <span id='accountHolder'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="accountNumber">Account Number</label>
                                <input type="text" defaultValue={servProData?.bankAccount.accountNumber} {...register('accountNumber')}/>
                                <span id='accountNumber'></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="bank">Bank Name</label>
                                <input type="text" defaultValue={servProData?.bankAccount.bank} {...register('bank')} />
                                <span id='bank'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="ifsc">IFSC code</label>
                                <input type="text" defaultValue={servProData?.bankAccount.ifsc} {...register('ifsc')}/>
                                <span id='ifsc'></span>
                            </div>
                        </div>
                    </div>
                    <br /><br /><br />
                    <div className={css.formheading}>Set Password </div>
                    <br />
                    <div className={css.horizLine}></div>
                    <br />
                    <div className={css.formInfoTypeContainer}>
                        
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="password">Password</label>
                                <input type="text" defaultValue={servProData?.password} {...register('password')} />
                                <span id='password'></span>
                            </div>
                            
                        </div>
                    </div>


                    <br />
                    <br />
                    <br />
                    <div style={{textAlign:"center"}}>
                    <input type="checkbox" required/><span>I agree with Terms & Conditions</span>
                    </div>
                    <br />
                
                    
                    <div style={{textAlign:"center"}}> 
                        <input type="submit" value="Submit"  />
                    </div>
                </form>
            </div>
        </div>

    <ToastContainer className={css.toaster}/>
    </div>
  )
}
