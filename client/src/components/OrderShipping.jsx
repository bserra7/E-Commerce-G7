import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { createIntl, createIntlCache, FormattedMessage, useIntl } from 'react-intl';
import MessageEnglish from './../lang/en-UK.json';
import MensajeEspañol from './../lang/es-ES.json';

export function validate(field) {
    let errors = {};

    const cache = createIntlCache();
    
    let localeDefault;
    let messagesDefault;

    const lang = localStorage.getItem('lang');

    if(lang) {
        localeDefault = lang

        if(lang === 'en-UK') messagesDefault = MessageEnglish; 
        else messagesDefault = MensajeEspañol
    }

    const intl = createIntl({ locale: localeDefault, messages: messagesDefault, }, cache);
    
    if (!field.email){
        errors.email = intl.formatMessage({id: "validation-email"});
    }  
    else if (!field.city){
      errors.city = intl.formatMessage({id: "validation-city"});
    }
    else if (!field.address){
      errors.address = intl.formatMessage({id: "validation-address"});
    }
    else if(!field.zip_code) {
        errors.zip_code = intl.formatMessage({id: "validation-zip"});
    }
    else if (!/^-?\d+\.?\d*$/.test(field.zip_code)){
        errors.zip_code = intl.formatMessage({id: "validation-zip-numbers"});
    }
  
    return errors;
}

export default function OrderShipping ({confirmed,setShipping}){

    const intl = useIntl();

    const { user } = useSelector(state => state)

    const [field, setField] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(()=>{
        setField({
            email: user.email,
            city: user.city,
            address: user.address,
            zip_code: user.zip_code,
        })
    }, [user])

    const handleChange = (e) => {
        setField({
            ...field,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...field,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = event => {
        event.preventDefault();
        swal({
            title: intl.formatMessage( { id: "message-shipping-updated"}),
            text: ' ',
            icon: 'success',
            timer: 2000,
            button: null
        })
        setShipping(field)
    }

    return (
        <div className="order_shipping">
            <h4 className="order_shipping__title"><FormattedMessage id="app.shipping-notification" defaultMessage="Confirm Shipping Address & Email Notification"/></h4>
            <form onSubmit={handleSubmit} className="order_shipping__form">
                <div>
                    <label><FormattedMessage id="app.email" defaultMessage="E-mail: "/></label>
                    <input name='email' value={field.email} onChange={handleChange}/>
                </div>
                <div className="register__error">{errors.email}</div>
                <div>
                    <label><FormattedMessage id="app.city" defaultMessage="City: "/></label>
                    <input name='city' value={field.city} onChange={handleChange}/>
                </div>
                <div className="register__error">{errors.city}</div>
                <div>
                    <label><FormattedMessage id="app.address" defaultMessage="Address: "/></label>
                    <input name='address' value={field.address} onChange={handleChange}/>
                </div>
                <div className="register__error">{errors.address}</div>
                <div>
                    <label><FormattedMessage id="app.zip" defaultMessage="Zip Code: "/></label>
                    <input name='zip_code' value={field.zip_code} onChange={handleChange}/>
                </div>
                <div className="register__error">{errors.zip_code}</div>
                <button disabled={confirmed || Object.keys(errors).length} type="submit"><FormattedMessage id="app.data-confirm" defaultMessage="Confirm data"/></button>
            </form>
        </div>
    )
}