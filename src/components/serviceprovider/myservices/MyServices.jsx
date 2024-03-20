import React from 'react'
import './myservices.css'
import { Link } from 'react-router-dom';

export const MyServices = () => {
  return (
    <div className="body">
      <div className='myservices'>
        
        <div className="table-container">
          <table width='85%' className='table' border="0px">
            <tbody>
              <tr>
                <td width="20%">Service</td>
                <td width="20%">Sub-Category</td>
                <td width="40%">Category</td>
                <td width="20%">Action</td>
              </tr>
              <tr>
                <td>Hair cut</td>
                <td>Mens</td>
                <td>Beauty,Spa and massage</td>
                <td>
                  <button className='edit-btn'>Edit</button> &nbsp;
                  <button className='delete-btn'>Delete</button>
                </td>
              </tr>
              <tr>
                <td>Beard Styling</td>
                <td>Mens</td>
                <td>Beauty,Spa and massage</td>
                <td>
                  <button className='edit-btn'>Edit</button> &nbsp;
                  <button className='delete-btn'>Delete</button>
                </td>
              </tr>
              <tr>
                <td>AC Repairing</td>
                <td>Electronics</td>
                <td>Home appliances and service</td>
                <td>
                  <button className='edit-btn'>Edit</button> &nbsp;
                  <button className='delete-btn'>Delete</button>
                </td>
              </tr>
              <tr>
                <td>Bathroom Cleaning</td>
                <td>Cleaning</td>
                <td>Home appliances and service</td>
                <td >
                  <button className='edit-btn'>Edit</button> &nbsp;
                  <button className='delete-btn'>Delete</button>        
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>

    </div>
  )
}
