import React, { useState } from 'react'
import EditCss from '../cssfolder/edit.module.css'

const EditAddress = () => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Here you can send the formData to your server using fetch or any other method
        // For example, using fetch:
        fetch('http://127.0.0.1:8000/api/product/myprofile/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then(response => response.json())
          .then(data => {
            // Handle success or error response from the server
            console.log('Success:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };

  return (
    <div>
        <div className={EditCss.addressContainer}>
            <form onSubmit={handleSubmit} >
                <div className={EditCss.items}><h4>My Profile</h4></div>
                <div className={EditCss.items}><label >First Name</label><input type="text" name="first_name" value={formData.first_name} onChange={handleChange}/></div>
                <div className={EditCss.items}><label >Last Name</label><input type="text" name="last_name" value={formData.last_name} onChange={handleChange}/></div>
                <div className={EditCss.items}><label >Phone Number</label><input type="number" name="phone" value={formData.phone} onChange={handleChange}/></div>
                <div className={EditCss.items}><label >Address</label><textarea name="address" id="" cols="60" rows="5"  value={formData.address} onChange={handleChange}></textarea></div>
                <div className={EditCss.items}><button className='btn btn-success'>Submit</button></div>
            </form>

        </div>
    </div>
  )
}

export default EditAddress