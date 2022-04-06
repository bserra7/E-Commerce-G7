import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../redux/actions";
import axios from 'axios';
import Select from 'react-select'
import CreateCategory from "./CreateCategory";
import swal from 'sweetalert';
import { FormattedMessage, useIntl, createIntl, createIntlCache } from 'react-intl'
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
        errors.categories = intl.formatMessage({id: "validation-categories-product"});
    }
    return errors;
}


export function CreateProduct(){
    const dispatch = useDispatch();
    const stateCategories = useSelector((state)=>state.categories)
    const intl = useIntl();
    

    const options = stateCategories.map((e)=> {
        return {label: e.name, value: e.id}
    })

    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        price: "",
        description:"",
        images:"",
        stock: 0,
        rating: 0,
        categories:[]
    })

    useEffect(() => {
        dispatch(getCategories());
    }, []); //eslint-disable-line

    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    }

    const handleSelect = (e) =>{
        setInput({
            ...input,
            categories: e?.map(x => x.label)
        })
        setErrors(validate({
            ...input,
            categories: e?.map(x => x.label)
        }));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await axios.post("/product", input)
        if(response.status === 200){
            swal({
                title: intl.formatMessage({ id: "message-product-create" }),
                text: ' ',
                icon: 'success',
                timer: 3000,
                button: null
            })
            setInput({
                name: "",
                price: "",
                description:"",
                images:"",
                stock: 0,
                rating: 0,
                categories:[]
            })
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

    return(
        <div className="adminContainer editForms">
            <div className="register createProduct">
                <h1 className="register__title"><FormattedMessage id="app.new-product" defaultMessage="New Product"/></h1>
                <form onSubmit={(e)=>{handleSubmit(e)}} action="" method="post"  id="contact_form">
                    <div className="register__group">
                        <label className="col-md-4 control-label"><FormattedMessage id="app.name-prod" defaultMessage="Name"/></label>
                        <input name="name" value={input.name} onChange={handleChange} className="form-control" />
                        <div className="register__error">{errors.name}</div>
                    </div>
                    <div className="register__group">
                        <label className="col-md-4 control-label"><FormattedMessage id="app.price" defaultMessage="Price"/></label>
                        <input name="price" value={input.price} onChange={handleChange} className="form-control"/>
                        <div className="register__error">{errors.price}</div>
                    </div>
                    <div className="register__group">
                        <label className="col-md-4 control-label"><FormattedMessage id="app.description" defaultMessage="Description"/></label>
                        <textarea name="description" value={input.description} onChange={handleChange} className="form-control"></textarea>
                        <div className="register__error">{errors.description}</div>
                    </div>
                    <div className="register__group">
                        <label className="col-md-4 control-label"><FormattedMessage id="app.image" defaultMessage="Image"/></label>
                        <input name="images" value={input.images} onChange={handleChange} className="form-control"/>
                    </div>
                    <div className="register__group">
                        <label className="col-md-4 control-label"><FormattedMessage id="app.stok-prod" defaultMessage="Stock"/></label>
                        <input type='number' min='0' max='100' name="stock" value={input.stock} onChange={handleChange} className="form-control"/>
                        <div className="register__error">{errors.stock}</div>
                    </div>
                    <div className="register__group categories">
                        <label className="col-md-4 control-label"><FormattedMessage id="app.categories" defaultMessage="Categories"/></label>
                        <div style={{width:'100%'}}>
                            <Select isMulti options={options} onChange={handleSelect}/>
                        </div>
                        <CreateCategory />
                        <div className="register__error">{errors.categories}</div>
                    </div>
                    <button className="register__button"
                     type="submit"
                     disabled={!input.name || !input.price || !input.description || !input.stock || !input.categories.length}><FormattedMessage id="app.btn-create-prod" defaultMessage="Create product"/></button>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct;