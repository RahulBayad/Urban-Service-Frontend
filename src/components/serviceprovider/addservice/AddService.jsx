import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './addservice.css';
import axios from 'axios';


export const AddService = () => {

  const {register,handleSubmit} = useForm();
  const [categories , setCategories] = useState([]);
  const [subcategories , setsubcategories] = useState([]);
  const [types , setTypes] = useState([]);
  

  const submitHandler = async (data)=>{
    console.log("Data.....",data);

    try {
      let serviceResult = await axios.put(`/serviceprovider/addService/${sessionStorage.getItem("servProEmail")}`,data)
      console.log("result",serviceResult.data.data)
      if(serviceResult.data.data.acknowledged === true){
        toast.success("Service Added",{position:"top-center"})
      }

    } catch (error) {
      toast.error(error.response.data.message,{"position":"top-center"})
      console.log("error",error)
    }
  }

  const loadsubcategories = async()=>{
    let selectTag = document.getElementById("category");
    let selectvalue = selectTag.options[selectTag.selectedIndex].value;

    try{

      console.log("cat value is",selectvalue);
      const res = await axios.get("/subcategory/subcategory/"+selectvalue);
      console.log(res);
      setsubcategories(res.data.data);
      console.log(subcategories);
      const data  = res.data.data;
      console.log("data.....",data);
    }catch(err){
      
      console.log("error....",err);
      setsubcategories([]);
    } 
  }
  const loadTypes = async()=>{
    let selectTag = document.getElementById("subcategory");
    let selectvalue = selectTag.options[selectTag.selectedIndex].value;
    
    try{

      console.log("cat value is",selectvalue);
      const res = await axios.post('/type/type/getBySubcategory' , {subcategory : selectvalue});
      console.log(res);
      setTypes(res.data.data);
      console.log("types", types);
      const data  = res.data.data;
      console.log("data.....",data);
    }catch(err){
      
      console.log("error....",err);
      setsubcategories([]);
    } 
  }

  const loadCategories = async ()=>{
    try{
      const res = await axios.get("/category/category");
      console.log(res.data.data);
      setCategories(res.data.data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    loadCategories();
  },[])

  return (
    
    <div className="body">
      
      <div className='addservice-page'>
      
      <div className="service-form-container">
        {/* <br /> */}
        <div className="service-form">
          <form id="form" onSubmit={handleSubmit(submitHandler)}>
            <div id='heading1'>Add Service</div>
            
            <div className="input">
              <label htmlFor="" >Name <span style={{verticalAlign:"middle",color:"red"}}>*</span></label>
              <input type="text" placeholder='' disabled value="Rahul"/>
            </div>
            <div className="input">
              <label htmlFor="">Email <span style={{verticalAlign:"middle",color:"red"}}>*</span></label>
              <input type="text" placeholder='' disbaled value="rahul123@gmail.com"/>
            </div>
            <div className="input">
              <label htmlFor="">Mobile Number <span style={{verticalAlign:"middle",color:"red"}}>*</span></label>
              <input type="text" placeholder='' disabled value="9157994959"/>
            </div>
            <div className="input">
              <label htmlFor="">City <span style={{verticalAlign:"middle",color:"red"}}>*</span></label>
              <input type="text" placeholder='' disbaled value="Ahmedabad" />
            </div>
            <div className="input">
              <label htmlFor="">State <span style={{verticalAlign:"middle",color:"red"}}>*</span></label>
              <input type="text" placeholder='' disabled value="Gujarat" />
            </div>
            <div className="input">
              <label htmlFor="">Select Category <span style={{verticalAlign:"middle",color:"red"}}>*</span></label>
              <select id="category" className="category" {...register('categories')} onChange={loadsubcategories}>
                <option selected disabled >Select Category</option>
                {
                  categories.map((category)=>{
                    return (
                      <option value={category._id} >{category.name}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="input">
              <label htmlFor="">Select sub-category <span style={{verticalAlign:"middle",color:"red"}}>*</span></label>
              <select className='subcategories' id='subcategory'  {...register('subcategory')} onChange={loadTypes}>         
                <option  selected disabled>Select sub-category</option>
                { 
                  subcategories?.map((category)=>{
                    return (
                      <option value={category._id}>{category.name}</option>
                    )
                  })
                }
                </select>
            </div>
            <div className="input">
              <label htmlFor="">Select Service-Type <span style={{verticalAlign:"middle",color:"red"}}>*</span></label>
              <select className='types' id='types'  {...register('types')} onChange={loadTypes}>         
                <option  selected disabled>Select Service-Type</option>
                { 
                  types?.map((type)=>{
                    return (
                      <option value={type._id}>{type.name}</option>
                    )
                  })
                }
                </select>
            </div>
            {/* <div className="input-add">
              <label htmlFor="">Address (to deliver joining kit) <span style={{verticalAlign:"middle",color:"red"}}>*</span></label>
              <textarea name="" id="" rows="5"></textarea>
            </div> */}
            <div className='input1'>
              
              <input type="checkbox" required style={{lineHeight:"61px"}}/>
              <span>I agree with terms and conditions </span><span style={{verticalAlign:"middle",color:"red"}}>*</span>
             
            </div>
            <div className="input">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
                
        {/* <br /> */}
        {/* <br /> */}
        
      </div>
      <ToastContainer/>
    </div>
    
  )
}
