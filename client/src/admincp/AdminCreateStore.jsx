import React, { useState } from "react";
import axios from 'axios';
import '../styles/styles.scss'
import swal from 'sweetalert';

export function validate(store) {
    let errors = {};
  
    if (!store.name) {
      errors.name = "Write your name";
    } 
    else if (!store.country){
      errors.country = "Introduce store country"
    }
    else if (!store.city){
      errors.city = "Introduce store city"
    }
    else if (!store.address){
      errors.address = "Write store address"
    }
    else if(!store.state) {
        errors.state = "Introduce store state"
    }
    else if(!store.zip_code) {
        errors.zip_code = "Introduce the zip code"
    }
    else if (!/^-?\d+\.?\d*$/.test(store.zip_code)){
        errors.zip_code = "Only numbers allowed"
    }
    return errors;
}


export function AdminCreateStore({showComponent}){
    const [errors, setErrors] = useState({})

    const [store, setStore] = useState({
        name: "",
        country: "",
        city: "",
        zip_code:"",
        address: "",
        state: "",
    })

    const handleChange = (e) => {
        setStore({
          ...store,
          [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...store,
            [e.target.name] : e.target.value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStore({
            name: "",
            country: "",
            city: "",
            zip_code:"",
            address: "",
            state: "",
        })
        const response = await axios.post("/stores", store)
        if(response.status === 200){
            swal({
                title: 'Store was created successfully',
                text: ' ',
                icon: 'success',
                timer: 3000,
                button: null
            })
            showComponent('stores');
        }else{
            swal({
                title: 'Something went wrong',
                text: ' ',
                icon: 'error',
                timer: 3000,
                button: null
            })
        }

      };

    return(
        <div className="container">
            <div className="register">
                <h1 className="register__title">Create a New Store</h1>
                <form onSubmit={(e)=>{handleSubmit(e)}} className="register__form">
                    <div className="register__group">
                    <label>Name:</label>
                    <input name="name" value={store.name} onChange={handleChange} className="form-control"/>
                    <div className="register__error">{errors.name}</div>
                    </div>
                    <div className="register__group">
                    <label>Country:</label>
                    <input name="country" value={store.country} onChange={handleChange} className="form-control"/>
                    <div className="register__error">{errors.country}</div>
                    </div>
                    <div className="register__group">
                    <label>City:</label>
                    <input name="city" value={store.city} onChange={handleChange} className="form-control"/>
                    <div className="register__error">{errors.city}</div>
                    </div>
                    <div className="register__group">
                    <label>Zip code:</label>
                    <input type="number" name="zip_code" value={store.zip_code} onChange={handleChange} className="form-control"/>
                    <div className="register__error">{errors.zip_code}</div>
                    </div>
                    <div className="register__group">
                    <label>Address:</label>
                    <input name="address" value={store.address} onChange={handleChange} className="form-control"/>
                    <div className="register__error">{errors.address}</div>
                    </div>
                    <div className="register__group">
                    <label>State:</label>
                    <input  type='input' name="state" value={store.state} onChange={handleChange} className="form-control"/>
                    <div className="register__error">{errors.state}</div>
                    </div>
                    <button className="register__button" type="submit" disabled={!store.name || !store.country || !store.city || !store.address || !store.zip_code || !store.state || Object.keys(errors).length} >Create Store</button>
                </form>
            </div>
        </div>
    )
}

export default AdminCreateStore;