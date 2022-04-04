import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getProductDetail } from '../redux/actions';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

export function validate(input) {
    let errors = {};
  
    if (!input.name) {
      errors.name = "Introduce the product name";
    } 
    else if (input.name.length < 4) {
        errors.name = "Product name is too short.";
    } 
    else if (!input.price) {
        errors.price = "Introduce the product price"
    } 
    else if (!/^-?\d+\.?\d*$/.test(input.price)){
        errors.price = "Only numbers allowed"
    }
    else if(!input.description){
       errors.description = "Write a brief description of your product"
    }
    else if(!input.stock){
        errors.stock = "Stock number"
    } 
    else if (!/^-?\d+\.?\d*$/.test(input.stock)){
        errors.stock = "Only numbers allowed"
    }
    else if(!input.categories.length){
        errors.categories = "Choose the categories"
    }
    return errors;
}


export function UpdateProduct(props){
    const dispatch = useDispatch();
    const id = props.id || props.match.params.id;
    const history = useHistory();

    const productDetails = useSelector((state)=>state.details)
    const stateCategories = useSelector((state)=>state.categories)

    useEffect(()=>{
        dispatch(getProductDetail(id))
        dispatch(getCategories());
    }, [id]) //eslint-disable-line

    const [errors, setErrors] = useState({})

    useEffect(()=>{
        setInput({
            name: productDetails.name,
            price: productDetails.price,
            description:productDetails.description,
            images:productDetails.images,
            stock: productDetails.stock,
            rating: productDetails.rating,
            categories: productDetails.categories?.map(e=>e.name)
        })
    }, [productDetails])
    
    const [input, setInput] = useState({})

    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    const handleSelect = (e) =>{
        if(input.categories.includes(e.target.value)) return;
        setInput({
            ...input,
            categories: [...input.categories, e.target.value]
        })
        setErrors(validate({
            ...input,
            categories: [...input.categories, e.target.value]
        }));
    }


    const handleDelete = event => {
        setInput({
            ...input,
            categories: input.categories?.filter(category => category !== event.target.id)
        })
    }
    
   
    const handleSubmit = async (e) => {
        const product = {...input, id}
        e.preventDefault();
        const response = await axios.put("/product/update", product);
        if(response.status === 200){
            swal({
                title: 'Product was updated successfully!',
                text: ' ',
                icon: 'success',
                timer: 3000,
                button: null
            })
            if(history.location.pathname === '/admincp') props.showComponent('products')
            else history.push("/")
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

    return (
         <div className={history.location.pathname === '/admincp' ? "adminContainer editForms" : "container"}>
            <div className="updateProduct register">
                <h1 className='updateProduct__title'>Update Product</h1>
                <form onSubmit={(e)=>{handleSubmit(e)}} className="well form-horizontal">
                    <div className="register-group">
                        <label className="col-md-4 control-label">Name:</label>
                        <input name="name" value={input.name} onChange={handleChange} />
                        <div className='register__error'>{errors.name}</div>
                    </div>
                    <div className="register-group">
                    <label className="col-md-4 control-label">Price:</label>
                    <input name="price" value={input.price} onChange={handleChange} />
                    <div className='register__error'>{errors.price}</div>
                    </div>
                    <div className="register-group">
                    <label className="col-md-4 control-label">Description:</label>
                    <textarea name="description" value={input.description} onChange={handleChange} ></textarea>
                    <div className='register__error'>{errors.description}</div>
                    </div>
                    <div className="register-group">
                    <label className="col-md-4 control-label">Image:</label>
                    <input name="images" value={input.images} onChange={handleChange} />
                    <div className='register__error'>{errors.images}</div>
                    </div>
                    <div className="register-group">
                    <label className="col-md-4 control-label">Stock:</label>
                    <input type='number' min='0' max='100' name="stock" value={input.stock} onChange={handleChange} />
                    <div className='register__error'>{errors.stock}</div>
                    </div>
                    <div className="register-group">
                    <label className="col-md-4 control-label">Categories:</label>
                    <div>
                    <select defaultValue='none' name="categories" onChange={handleSelect} autoComplete='off'>
                    <option value="none" disabled hidden>Choose one or more</option>
                    {stateCategories?.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
                    </select>
                    <div className='register__error'>{errors.categories}</div>
                    </div>
                    <div className="formWrapper"><div className="addedCat">{input.categories?.map(category => <div key={category} className="catContainer"><div className="category">{category}</div><div className="deleteCat" id={category} onClick={handleDelete}>x</div></div>)}</div></div>
                    </div>
                    <div className="wrapper-buttons">
                    {history.location.pathname === '/admincp' ? false : <Link to='/'><button className="register__button">Back</button></Link>}
                        <button className={history.location.pathname === '/admincp' ? 'register__button' : "register__button save" }
                     type="submit"
                     disabled={!input.name || !input.price || !input.description || !input.stock || !input.categories.length}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct;
