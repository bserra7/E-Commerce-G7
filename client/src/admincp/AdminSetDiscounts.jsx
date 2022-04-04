import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../redux/actions";
import axios from 'axios';
import Select from 'react-select'
import CreateCategory from "../components/CreateCategory";
import swal from 'sweetalert';

export function validate(discount) {
    let errors = {};

    if(!discount.categoryId){
        errors.categoryId = "Select a category or create a new one"
    }
    else if(!discount.weekday){
        errors.weekday = "Set a Weekday"
    } 
    else if(!discount.discount){
        errors.discount = "Set a Discount"
    } 
    else if (!/^-?\d+\.?\d*$/.test(discount.discount)){
        errors.discount = "Only numbers allowed"
    }
    return errors;
}


export function AdminSetDiscounts({showComponent}){
    const dispatch = useDispatch();
    const stateCategories = useSelector((state)=>state.categories)
    
    const options = stateCategories.map((e)=> {
        return {name: "categoryId", label: e.name, value: e.id}
    })
    const weekdays = [
        {name: "weekday", label: "Sunday", value: "sunday"},
        {name: "weekday", label: "Monday", value: "monday"},
        {name: "weekday", label: "Tuesday", value: "tuesday"},
        {name: "weekday", label: "Wednesday", value: "wednesday"},
        {name: "weekday", label: "Thursday", value: "thursday"},
        {name: "weekday", label: "Friday", value: "friday"},
        {name: "weekday", label: "Saturday", value: "saturday"},
    ]

    const [errors, setErrors] = useState({})

    const [discount, setDiscount] = useState({
        categoryId: 0,
        discount: 0,
        weekday: ''
    })

    useEffect(() => {
        dispatch(getCategories());
    }, []); //eslint-disable-line

    const handleChange = (e) =>{
        setDiscount({
            ...discount,
            [e.target.name]: Number(e.target.value),
        })
        setErrors(validate({
            ...discount,
            [e.target.name] : Number(e.target.value)
        }));
    }

    const handleSelect = (e) =>{
        console.log(e);
        setDiscount({
            ...discount,
            [e.name]: e.value
        })
        setErrors(validate({
            ...discount,
            [e.name]: e.value
        }));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await axios.post("/discount", discount)
        if(response.status === 200){
            swal({
                title: 'Discount was set successfully!',
                text: ' ',
                icon: 'success',
                timer: 3000,
                button: null
            })
            setDiscount({
                categoryId: 0,
                discount: 0,
                weekday: ''
            })
            showComponent('discounts')
        }else {
            swal({
                title: 'Something went wrong',
                text: ' ',
                icon: 'error',
                timer: 3000,
                button: null
            })
        }

    }

    return(
        <div className="adminContainer editForms">
            <div className="register createProduct">
                <h1 className="register__title">New Discount</h1>
                <form onSubmit={(e)=>{handleSubmit(e)}} action="" method="post"  id="contact_form">
                    <div className="register__group categories">
                        <label className="">Categories</label>
                        <div style={{width:'100%'}}>
                            <Select options={options} name="category" onChange={handleSelect}/>
                        </div>
                        <div className="register__error">{errors.categoryId}</div>
                        <CreateCategory />
                        <label className="">Weekday</label>
                        <div style={{width:'100%'}}>
                            <Select options={weekdays} name="weekday" onChange={handleSelect}/>
                        </div>
                        <div className="register__error">{errors.weekday}</div>
                    </div>
                    <div className="register__group">
                        <label className="">Discount Percentage</label>
                        <input type='number' min='0' max='100' name="discount" value={discount.discount} onChange={handleChange} className="form-control"/>
                        <div className="register__error">{errors.discount}</div>                     
                    </div>
                    
                    <button className="register__button"
                     type="submit"
                     disabled={!discount.discount || !discount.categoryId}>Create Discount</button>
                </form>
            </div>
        </div>
    )
}

export default AdminSetDiscounts;