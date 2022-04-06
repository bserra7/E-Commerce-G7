import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"
import axios from 'axios';
import '../styles/styles.scss'
import swal from 'sweetalert';
import { FormattedMessage, useIntl, createIntl, createIntlCache } from 'react-intl'
import MessageEnglish from './../lang/en-UK.json'
import MensajeEspañol from './../lang/es-ES.json'

export function validate(form) {

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

    if (!form.name) {
        errors.name = intl.formatMessage({id: "validation-name"});
    }
    else if (!form.email) {
        errors.email = intl.formatMessage({id: "validation-email"});
    }
    else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = intl.formatMessage({id: "validation-email-invalid"});
    }
    else if (!form.message) {
        errors.message = intl.formatMessage({id: "validation-leave-message"});
    }
    return errors;
}


export function Contact() {
    const { user } = useSelector(s => s)

    const intl = useIntl();

    const history = useHistory();
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        name: user ? user.name : "",
        email: user ? user.email : "",
        message: "",
    })

    useEffect(() => {
        setForm({
            name: user ? user.name : "",
            email: user ? user.email : "",
            message: "",
        })
    }, [user])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setForm({
            name: "",
            email: "",
            message: "",
        })
        const response = await axios.post("/contact", form)
        if (response.status === 200) {
            swal({
                title: intl.formatMessage({ id: "message-sent" }),
                text: ' ',
                icon: 'success',
                timer: 3000,
                button: null
            })
            history.push("/")
        } else {
            swal({
                title: intl.formatMessage({ id: "message-error" }),
                text: ' ',
                icon: 'error',
                timer: 3000,
                button: null
            })
        }
    };

    return (
        <div className="container">
            <div className="register">
                <h1 className="register__title"><FormattedMessage id="app.contact-us" defaultMessage="Contact Us"/></h1>
                <form onSubmit={(e) => { handleSubmit(e) }} className="register__form">
                    <div className="register__group">
                        <label><FormattedMessage id="app.name" defaultMessage="Name:"/></label>
                        <input name="name" value={form.name} onChange={handleChange} className="form-control" />
                        <div className="register__error">{errors.name}</div>
                    </div>
                    <div className="register__group">
                        <label><FormattedMessage id="app.email" defaultMessage="E-mail:"/></label>
                        <input name="email" value={form.email} onChange={handleChange} className="form-control" />
                        <div className="register__error">{errors.email}</div>
                    </div>
                    <div className="register__group">
                        <label><FormattedMessage id="app.message" defaultMessage="Message:"/></label>
                        <textarea name="message" value={form.message} onChange={handleChange} className="form-control"></textarea>
                        <div className="register__error">{errors.message}</div>
                    </div>
                    <button className="register__button" type="submit" disabled={!form.name || !form.email || !form.message || Object.keys(errors).length}><FormattedMessage id="app.send" defaultMessage="Send"/></button>
                </form>
            </div>
        </div>
    )
}

export default Contact;