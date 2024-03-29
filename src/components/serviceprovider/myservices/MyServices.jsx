import React, { useEffect, useState } from 'react'
import './myservices.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

export const MyServices = () => {

  const [services , setServices] = useState([]);

  

  const getServices = async()=>{
    try{
      let serviceResult = await axios.get("/serviceprovider/serviceprovider/"+sessionStorage.getItem("servProEmail"))
      console.log("result",serviceResult.data.data)
      setServices(serviceResult.data.data)
    }catch (error) {
      console.log("error",error)
    }
  }

  useEffect(()=>{
      
      getServices()

    
  },[])
  return (
    <div className="body">
      <div className='myservices'>
        
        <div className="table-container">
          <table  className='table' border="1px">
            <tbody>
              <tr>
                <td width='7%'> No.</td>
                <td width="20%">Service</td>
                <td width="20%">Sub-Category</td>
                <td width="20%">Category</td>
                <td width="20%">Action</td>
                {/* <td></td> */}
              </tr>
              {
                
                services?.map((service , index)=>{
                  return(
                    <tr>
                      <td>{index+1}</td>
                      <td>{service.serviceType.name}</td>
                      <td>{service.serviceType.subcategory.name}</td>
                      <td>{service.serviceType.subcategory.category.name}</td> 
                      <td>
                        {/* <button className='delete-btn'>Delete</button> */}
                        <span class="material-symbols-outlined">delete</span>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        
      </div>

    </div>
  )
}
