import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getStoreDetail } from '../redux/actions';
import axios from 'axios';
import swal from 'sweetalert';
import { FormattedMessage, useIntl, createIntl, createIntlCache } from 'react-intl'
import MessageEnglish from '../lang/en-UK.json'
import MensajeEspañol from '../lang/es-ES.json'
const API_KEY = "AIzaSyBXDnxAg_a40ale9Hb5Hm8uejsM17qdKs4";

export function validate(store) {
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

    if (!store.name) {
        errors.name = intl.formatMessage({id: "validation-name-store"});
    }
    else if (!store.country) {
        errors.country = intl.formatMessage({id: "validation-store-country"});
    }
    else if (!store.city) {
        errors.city = intl.formatMessage({id: "validation-store-city"});
    }
    else if (!store.address) {
        errors.address = intl.formatMessage({id: "validation-store-address"});
    }
    else if (!store.state) {
        errors.state = intl.formatMessage({id: "validation-store-state"});
    }
    else if (!store.zip_code) {
        errors.zip_code = intl.formatMessage({id: "validation-store-zip"});
    }
    else if (!/^-?\d+\.?\d*$/.test(store.zip_code)) {
        errors.zip_code = intl.formatMessage({id: "validation-zip-numbers"});
    }
    return errors;
}

export function AdminEditStore(props) {
    const dispatch = useDispatch();
    const intl = useIntl();

    const id = props.id;

    useEffect(() => {
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
    }, [storeDetail])


    const handleChange = (e) => {
        setStore({
            ...store,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...store,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token;
        if (localStorage.getItem('jwt')) token = localStorage.getItem('jwt');
        else if (sessionStorage.getItem('jwt')) token = sessionStorage.getItem('jwt');
        const url = `${store.address} ${store.city} ${store.country} ${store.state} ${store.zip_code}`
        const promise = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${url}&key=${process.env.REACT_APP_MAPS_API_KEY || API_KEY}`)
        const location = promise.data.results[0].geometry.location
        try {
            swal({
                title: intl.formatMessage({ id: "message-save-changes" }),
                text: " ",
                icon: 'warning',
                buttons: ['No', intl.formatMessage({ id: "message-yes" })]
            }).then(async (result) => {
                if (result) {
                    await axios.put("/stores", { ...store, ...location, token });
                    swal({
                        title: intl.formatMessage({ id: "message-save-store-changes" }),
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
                title: intl.formatMessage({ id: "message-error" }),
                text:  intl.formatMessage({ id: "message-error-check" }),
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
                <h1 className="register__title"><FormattedMessage id="app.edit-store" defaultMessage="Edit Store"/></h1>
                <form onSubmit={(e) => { handleSubmit(e) }} className="register__form">
                    <div className="register__group">
                        <label><FormattedMessage id="app.name" defaultMessage="Name:"/></label>
                        <input name="name" value={store?.name} onChange={handleChange} className="form-control" />
                        <div className="register__error">{errors.name}</div>
                    </div>
                    <div className="register__group">
                        <label><FormattedMessage id="app.country" defaultMessage="Country:"/></label>
                        <input name="country" value={store?.country} onChange={handleChange} className="form-control" />
                        <div className="register__error">{errors.country}</div>
                    </div>
                    <div className="register__group">
                        <label><FormattedMessage id="app.city" defaultMessage="City:"/></label>
                        <input name="city" value={store?.city} onChange={handleChange} className="form-control" />
                        <div className="register__error">{errors.city}</div>
                    </div>
                    <div className="register__group">
                        <label><FormattedMessage id="app.zip" defaultMessage="Zip code:"/></label>
                        <input type="number" name="zip_code" value={store?.zip_code} onChange={handleChange} className="form-control" />
                        <div className="register__error">{errors.zip_code}</div>
                    </div>
                    <div className="register__group">
                        <label><FormattedMessage id="app.address" defaultMessage="Address:"/></label>
                        <input name="address" value={store?.address} onChange={handleChange} className="form-control" />
                        <div className="register__error">{errors.address}</div>
                    </div>
                    <div className="register__group">
                        <label><FormattedMessage id="app.state" defaultMessage="State:"/></label>
                        <input type='text' name="state" value={store?.state} onChange={handleChange} className="form-control" />
                        <div className="register__error">{errors.state}</div>
                    </div>
                    <button className="register__button" type="submit" ><FormattedMessage id="app.btn-edit" defaultMessage="Edit"/></button>
                </form>
            </div>
        </div>
    )
}

export default AdminEditStore;