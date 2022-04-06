import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getProductDetail } from '../redux/actions';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl, createIntl, createIntlCache } from 'react-intl'
import swal from 'sweetalert';
import MessageEnglish from './../lang/en-UK.json'
import MensajeEspañol from './../lang/es-ES.json'

export function validate(input) {
    let errors = {};

    const cache = createIntlCache();
    
    let localeDefault;
    let messagesDefault;

    const lang = localStorage.getItem('lang')

    if(lang) {
        
        localeDefault = lang

        if(lang === 'en-UK') {
            messagesDefault = MessageEnglish;
        } else if (lang === 'es-ES') {
            messagesDefault = MensajeEspañol
        } else {
            localeDefault = 'en-UK'
            messagesDefault = MessageEnglish;
        }
    }

    const intl = createIntl({ locale: localeDefault, messages: messagesDefault, }, cache);
  
    if (!input.name) {
      errors.name = intl.formatMessage({id: "validation-name-product"});
    } 
    else if (input.name.length < 4) {
        errors.name = intl.formatMessage({id: "validation-name-product-length"});
    } 
    else if (!input.price) {
        errors.price = intl.formatMessage({id: "validation-product-price"});
    } 
    else if (!/^-?\d+\.?\d*$/.test(input.price)){
        errors.price = intl.formatMessage({id: "validation-zip-numbers"});
    }
    else if(!input.description){
       errors.description = intl.formatMessage({id: "validation-description-product"});
    }
    else if(!input.stock){
        errors.stock = intl.formatMessage({id: "validation-stock-product"});
    } 
    else if (!/^-?\d+\.?\d*$/.test(input.stock)){
        errors.stock = intl.formatMessage({id: "validation-zip-numbers"});
    }
    else if(!input.categories.length){
        errors.categories = intl.formatMessage({id: "validation-choose-categories"});
    }
    return errors;
}


export function UpdateProduct(props){
    const dispatch = useDispatch();
    const intl = useIntl();
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
                title: intl.formatMessage({ id: "message-product-update" }),
                text: ' ',
                icon: 'success',
                timer: 3000,
                button: null
            })
            if(history.location.pathname === '/admincp') props.showComponent('products')
            else history.push("/")
        }else {
            swal({
                title: intl.formatMessage({ id: "message-error" }),
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
                <h1 className='updateProduct__title'><FormattedMessage id="app.update-product" defaultMessage="Update Product"/></h1>
                <form onSubmit={(e)=>{handleSubmit(e)}} className="well form-horizontal">
                    <div className="register-group">
                        <label className="col-md-4 control-label"><FormattedMessage id="app.name" defaultMessage="Name:"/></label>
                        <input name="name" value={input.name} onChange={handleChange} />
                        <div className='register__error'>{errors.name}</div>
                    </div>
                    <div className="register-group">
                    <label className="col-md-4 control-label"><FormattedMessage id="app.price-product" defaultMessage="Price:"/></label>
                    <input name="price" value={input.price} onChange={handleChange} />
                    <div className='register__error'>{errors.price}</div>
                    </div>
                    <div className="register-group">
                    <label className="col-md-4 control-label"><FormattedMessage id="app.description-product" defaultMessage="Description:"/></label>
                    <textarea name="description" value={input.description} onChange={handleChange} ></textarea>
                    <div className='register__error'>{errors.description}</div>
                    </div>
                    <div className="register-group">
                    <label className="col-md-4 control-label"><FormattedMessage id="app.image-product" defaultMessage="Image:"/></label>
                    <input name="images" value={input.images} onChange={handleChange} />
                    <div className='register__error'>{errors.images}</div>
                    </div>
                    <div className="register-group">
                    <label className="col-md-4 control-label"><FormattedMessage id="app.stock-product" defaultMessage="Stock:"/></label>
                    <input type='number' min='0' max='100' name="stock" value={input.stock} onChange={handleChange} />
                    <div className='register__error'>{errors.stock}</div>
                    </div>
                    <div className="register-group">
                    <label className="col-md-4 control-label"><FormattedMessage id="app.stock-categories" defaultMessage="Categories:"/></label>
                    <div>
                    <select defaultValue='none' name="categories" onChange={handleSelect} autoComplete='off'>
                    <option value="none" disabled hidden>{intl.formatMessage({ id: "message-options" })}</option>
                    {stateCategories?.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
                    </select>
                    <div className='register__error'>{errors.categories}</div>
                    </div>
                    <div className="formWrapper"><div className="addedCat">{input.categories?.map(category => <div key={category} className="catContainer"><div className="category">{category}</div><div className="deleteCat" id={category} onClick={handleDelete}>x</div></div>)}</div></div>
                    </div>
                    <div className="wrapper-buttons">
                    {history.location.pathname === '/admincp' ? false : <Link to='/'><button className="register__button"><FormattedMessage id="app.button-back" defaultMessage="Back"/></button></Link>}
                        <button className={history.location.pathname === '/admincp' ? 'register__button' : "register__button save" }
                     type="submit"
                     disabled={!input.name || !input.price || !input.description || !input.stock || !input.categories.length}><FormattedMessage id="app.button-save" defaultMessage="Save"/></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct;
