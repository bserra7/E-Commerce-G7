import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getStoreDetail } from '../redux/actions';
import axios from 'axios';
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

export function AdminEditStore(props){
    const dispatch = useDispatch();

    const id = props.id;

    useEffect(()=>{
        dispatch(getStoreDetail(id))
    }, [id])

    const storeDetail = useSelector((state) => state.storeDetail)

    const [errors, setErrors] = useState({})

    const [store, setStore] = useState({});

    useEffect(() => {
        setStore({
            id: storeDetail?.id,
            name: storeDetail?.name,
            country: storeDetail?.country,
            city: storeDetail?.city,
            zip_code: storeDetail?.zip_code,
            address: storeDetail?.address,
            state: storeDetail?.state,
        })
    },[storeDetail])
        

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
        let token;
        if(localStorage.getItem('jwt')) token = localStorage.getItem('jwt');
        else if(sessionStorage.getItem('jwt')) token = sessionStorage.getItem('jwt');
        try {
            swal({
                title: 'Do you want save changes?',
                text: " ",
                icon: 'warning',
                buttons: ['No','Yes']
            }).then(async (result) => {
                if (result) {
                    await axios.put("/stores", {...store, token});
                    swal({
                        title: 'Store changes saved',
                        text: ' ',
                        icon: 'success',
                        timer: 2000,
                        button: null
                    })
                }
                props.showComponent('stores');
            })
        } catch (error) {
            swal({
                title: 'Something went wrong',
                text: 'Check console to see more about error',
                icon: 'error',
                timer: 2000,
                button: null
            })
            console.log(error);
        }
      };

    return (
        <div className="adminContainer editForms">
        <div className="register">
            <h1 className="register__title">Edit Store</h1>
            <form onSubmit={(e)=>{handleSubmit(e)}} className="register__form">
                <div className="register__group">
                <label>Name:</label>
                <input name="name" value={store?.name} onChange={handleChange} className="form-control"/>
                <div className="register__error">{errors.name}</div>
                </div>
                <div className="register__group">
                <label>Country:</label>
                <input name="country" value={store?.country} onChange={handleChange} className="form-control"/>
                <div className="register__error">{errors.country}</div>
                </div>
                <div className="register__group">
                <label>City:</label>
                <input name="city" value={store?.city} onChange={handleChange} className="form-control"/>
                <div className="register__error">{errors.city}</div>
                </div>
                <div className="register__group">
                <label>Zip code:</label>
                <input type="number" name="zip_code" value={store?.zip_code} onChange={handleChange} className="form-control"/>
                <div className="register__error">{errors.zip_code}</div>
                </div>
                <div className="register__group">
                <label>Address:</label>
                <input name="address" value={store?.address} onChange={handleChange} className="form-control"/>
                <div className="register__error">{errors.address}</div>
                </div>
                <div className="register__group">
                <label>State:</label>
                <input  type='text' name="state" value={store?.state} onChange={handleChange} className="form-control"/>
                <div className="register__error">{errors.state}</div>
                </div>
                <button className="register__button" type="submit" >Edit</button>
            </form>
        </div>
    </div>
    )
}

export default AdminEditStore;