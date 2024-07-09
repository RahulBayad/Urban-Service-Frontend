import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react'
import urbanServiceLogo from './urbanServiceLogo.png'
import  css from './servProSignup.module.css'
import uploadIcon from './uploadIcon.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const formValidation = require('./ServProValidations');

// import './servProSignup.css'

export const ServProSignup = () => {
    const [imgIcon , setImgIcon] = useState(uploadIcon);
    const {register , handleSubmit} = useForm();
    const navigate = useNavigate();
    
    
    const submitHandler = async (data) =>{
        console.log(typeof data.phone)
        
        console.log(data)
        let flag = formValidation.validateServProForm(data);
        if(!flag){
            return null;
        }
        
        try {
            let reqObj = new FormData();
                reqObj.append('fname',data.fname)
                reqObj.append('lname',data.lname)
                reqObj.append('dob',data.dob)
                reqObj.append('gender',data.gender)
                reqObj.append('maritalStatus',data.maritalStatus)
                reqObj.append('email',data.email)
                reqObj.append('phone',data.phone)
                reqObj.append('country',data.country)
                reqObj.append('area',data.area)
                reqObj.append('street',data.street)
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
            
            const res = await axios.post("/serviceprovider/serviceprovider",reqObj)
            // console.log("res",res.response.data.data);
            console.log("Registration successful",res.data);
            toast.success(`${res.data.data}`,{position:"top-center",theme:'colored'});
            setTimeout(()=>{
                navigate('/login');
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
                console.log(URL.createObjectURL(events.dataTransfer.files[0]))
                setImgIcon(URL.createObjectURL(events.dataTransfer.files[0]))
                imgMessage.textContent = "Image Dropped";
            })
        }
            
    },[]);

  return (
    <div className={css.signupBody}>
    
        <div className={css.navbar}>
            <img src={urbanServiceLogo} height='60px' alt="Oops!!!" />
        </div><br />
        <div className={css.formbody}>
            <br />
            <div className={css.formcontainer}>
            <div id={css.heading1}>Registration form to become a partner</div>
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
                                <input type="text" {...register('fname')}/>
                                <span id='fname'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="lname">Last Name</label>
                                <input type="text" {...register('lname')} />
                                <span id='lname'></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="dob">Date of Birth</label>
                                <input type="date"  {...register('dob')} />
                                <span id='dob'></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="gender">Gender</label>
                                <select name=""  {...register('gender')}>
                                    <option value="select" selected disabled> </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <span id="gender"></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="maritalStatus">Marital Status</label>
                                <select name="" {...register('maritalStatus')}>
                                    <option value="" selected disabled> </option>
                                    <option value="Married">Married</option>
                                    <option value="Unmarried">Unmarriad</option>
                                    <option value="Widowed">Widowed</option>
                                </select>
                                <span id="maritalStatus"></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="email">Email</label>
                                <input type="text" {...register('email')}/>
                                <span id='email'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="phone">Phone</label>
                                <input type="number" {...register('phone')}/>
                                <span id='phone'></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="country">Country</label>
                                <select name=""  {...register('country')}>
                                    <option value="select" selected disabled></option>
                                    <option value="India" >India</option>
                                    <option value="Nepal">Nepal</option>
                                </select>
                                <span id="country"></span>
                            </div>
                        </div>
                        <div className={css.rowCols1}>
                            <div className={css.input}>
                                <label htmlFor="street" >Street, Area or Society</label>
                                <textarea  cols="10" rows="5"  {...register('street')}></textarea>
                                <span id='street'></span>
                            </div>
                            
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="area" >Area</label>
                                <input type="text"  {...register('area')}/>
                                <span id='area'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="city" >City</label>
                                <input type="text"  {...register('city')}/>
                                <span id='city'></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="state" >State</label>
                                <input type="text"  {...register('state')}/>
                                <span id='state'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="pincode" >Postal Code</label>
                                <input type="text" {...register('pincode')}/>
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
                                            <img id="displaySelectedFile" className={css.displaySelectedFile} src={imgIcon} height="100px" alt="wait" />
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
                                <select  {...register('qualification')}>
                                    <option value="select" selected disabled></option>
                                    <option value="10th Pass">10th Pass</option>
                                    <option value="12th Pass">12th Pass</option>
                                    <option value="Graduate">Graduate</option>
                                    <option value="Post-gradute">Post-gradute</option>
                                </select>
                                <span id='qualification'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="degree">Degree (If graduate)</label>
                                <input type="text"  {...register('degree')} />
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
                                <input type="text" {...register('accountHolder')} />
                                <span id='accountHolder'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="accountNumber">Account Number</label>
                                <input type="text"  {...register('accountNumber')}/>
                                <span id='accountNumber'></span>
                            </div>
                        </div>
                        <div className={css.rowCols2}>
                            <div className={css.input}>
                                <label htmlFor="bank">Bank Name</label>
                                <input type="text"  {...register('bank')} />
                                <span id='bank'></span>
                            </div>
                            <div className={css.input}>
                                <label htmlFor="ifsc">IFSC code</label>
                                <input type="text" {...register('ifsc')}/>
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
                                <input type="text"  {...register('password')} />
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
