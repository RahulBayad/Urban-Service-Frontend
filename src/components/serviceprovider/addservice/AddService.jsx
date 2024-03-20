import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form';
import './addservice.css';
import axios from 'axios';


export const AddService = () => {

  const {register,handleSubmit} = useForm();
  const [categories , setCategories] = useState([]);
  const [subcategories , setsubcategories] = useState([]);

  const submitHandler = (data)=>{
    console.log("Data.....",data);
  }

  const loadsubcategories = async()=>{
    let selectTag = document.getElementById("category");
    let selectvalue = selectTag.options[selectTag.selectedIndex].value;

    try{
      const res = await axios.get("http://localhost:4001/subcategory/subcategory/"+selectvalue);
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

  const loadCategories = async ()=>{
    try{
      const res = await axios.get("http://localhost:4001/category/category");
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
          <form id="form">
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
                      <option value={category._id}>{category.name}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="input">
              <label htmlFor="">Select sub-category <span style={{verticalAlign:"middle",color:"red"}}>*</span></label>
              <select className='subcategories' {...register('subcategory')}>         
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
            <div className="input-add">
              <label htmlFor="">Address (to deliver joining kit) <span style={{verticalAlign:"middle",color:"red"}}>*</span></label>
              <textarea name="" id="" rows="5"></textarea>
            </div>
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
    </div>
    
  )
}
