import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import '../styles/styles.scss'
import useUser from "./Login/hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/actions";
import swal from 'sweetalert';
import WhatsApp from "./WhatsApp";
import { FormattedMessage, useIntl, createIntl, createIntlCache } from 'react-intl'
import MessageEnglish from './../lang/en-UK.json'
import MensajeEspañol from './../lang/es-ES.json'

export function validate(user, users) {
    const emails = users?.map(user => user.email)
    const usernames = users?.map(user => user.username)
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

    if (!user.name) {
        errors.name = intl.formatMessage({id: "validation-name"}); 
    }
    else if (!/^[^\W0-9_][a-zA-Z\u00f1\u00d1\s]+$/.test(user.name)) {
        errors.name = intl.formatMessage({id: "validation-name-invalid"});
    }
    else if (!user.lastName) {
        errors.lastName = intl.formatMessage({id: "validation-lastname"}); 
    }
    else if (!/^[^\W0-9_][a-zA-Z\u00f1\u00d1\s]+$/.test(user.lastName)) {
        errors.lastName = intl.formatMessage({id: "validation-lastname-invalid"}); 
    }
    else if (!user.username) {
        errors.username = intl.formatMessage({id: "validation-username"});
    }
    else if (!/^[^\W0-9_][a-zA-Z0-9\u00f1\u00d1\s]+$/.test(user.username)) {
        errors.username = intl.formatMessage({id: "validation-username-invalid"});
    }
    else if (usernames.includes(user.username)) {
        errors.username = intl.formatMessage({id: "validation-username-in-use"});
    }
    else if (!user.password) {
        errors.password = intl.formatMessage({id: "validation-password"});
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(user.password)) {
        errors.password = intl.formatMessage({id: "validation-password-req"});
    }
    else if (!user.password2) {
        errors.password2 = intl.formatMessage({id: "validation-password-repeat"});
    }
    else if (user.password !== user.password2) {
        errors.password2 = intl.formatMessage({id: "validation-password-match"});
    }
    else if (!user.email) {
        errors.email = intl.formatMessage({id: "validation-email"});
    }
    else if (!/\S+@\S+\.\S+/.test(user.email)) {
        errors.email = intl.formatMessage({id: "validation-email-invalid"});
    }
    else if (emails.includes(user.email)) {
        errors.email = intl.formatMessage({id: "validation-email-in-use"});
    }
    else if (!user.country) {
        errors.country = intl.formatMessage({id: "validation-country"});
    }
    else if (!user.city) {
        errors.city = intl.formatMessage({id: "validation-city"});
    }
    else if (!user.address) {
        errors.address = intl.formatMessage({id: "validation-address"});
    }
    else if (!user.dateOfBirth) {
        errors.dateOfBirth = intl.formatMessage({id: "validation-birthday"});
    }
    else if (!user.zip_code) {
        errors.zip_code = intl.formatMessage({id: "validation-zip"});
    }
    else if (!/^-?\d+\.?\d*$/.test(user.zip_code)) {
        errors.zip_code = intl.formatMessage({id: "validation-zip-numbers"});
    }
    return errors;
}


export function CreateUser() {
    const history = useHistory();
    const dispatch = useDispatch();
    const users = useSelector(state => state.allUsers);

    const intl = useIntl();

    const { isLogged } = useUser();

    const [errors, setErrors] = useState({})

    const [user, setUser] = useState({
        name: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
        country: "",
        city: "",
        zip_code: "",
        address: "",
        dateOfBirth: "",
    })

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    useEffect(_ => {
        if (isLogged) history.push('/');
    }, [isLogged, history])

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...user,
            [e.target.name]: e.target.value
        }, users))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUser({
            name: "",
            lastName: "",
            username: "",
            password: "",
            password2: "",
            email: "",
            country: "",
            city: "",
            zip_code: "",
            address: "",
            dateOfBirth: "",
        })
        const response = await axios.post("/user", user)
        if (response.status === 200) {
            swal({
                title: intl.formatMessage({ id: "message-register" }),
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
            history.push("/")
        }

    };

    return (
        <>
            <div className="container">
                <div className="register">
                    <h1 className="register__title"><FormattedMessage id="app.sign-up" defaultMessage="Sign Up"/></h1>
                    <form onSubmit={(e) => { handleSubmit(e) }} className="register__form">
                        <div className="register__group">
                            <label><FormattedMessage id="app.name" defaultMessage="Name:"/></label>
                            <input name="name" value={user.name} onChange={handleChange} className="form-control" />
                            <div className="register__error">{errors.name}</div>
                        </div>
                        <div className="register__group">
                            <label><FormattedMessage id="app.lastname" defaultMessage="Last name:"/></label>
                            <input name="lastName" value={user.lastName} onChange={handleChange} className="form-control" />
                            <div className="register__error">{errors.lastName}</div>
                        </div>
                        <div className="register__group">
                            <label><FormattedMessage id="app.user" defaultMessage="Username:"/></label>
                            <input name="username" value={user.username} onChange={handleChange} className="form-control" />
                            <div className="register__error">{errors.username}</div>
                        </div>
                        <div className="register__group">
                            <label><FormattedMessage id="app.password" defaultMessage="Password:"/></label>
                            <input name="password" type="password" value={user.password} onChange={handleChange} className="form-control" />
                            <div className="register__error">{errors.password}</div>
                        </div>
                        <div className="register__group">
                            <label><FormattedMessage id="app.repeat" defaultMessage="Repeat Password:"/></label>
                            <input name="password2" type="password" value={user.password2} onChange={handleChange} className="form-control" />
                            <div className="register__error">{errors.password2}</div>
                        </div>
                        <div className="register__group">
                            <label><FormattedMessage id="app.email" defaultMessage="E-mail:"/></label>
                            <input name="email" value={user.email} onChange={handleChange} className="form-control" />
                            <div className="register__error">{errors.email}</div>
                        </div>
                        <div className="register__group">
                            <label><FormattedMessage id="app.country" defaultMessage="Country:"/></label>
                            <input name="country" value={user.country} onChange={handleChange} className="form-control" />
                            <div className="register__error">{errors.country}</div>
                        </div>
                        <div className="register__group">
                            <label><FormattedMessage id="app.city" defaultMessage="City:"/></label>
                            <input name="city" value={user.city} onChange={handleChange} className="form-control" />
                            <div className="register__error">{errors.city}</div>
                        </div>
                        <div className="register__group">
                            <label><FormattedMessage id="app.zip" defaultMessage="Zip code:"/></label>
                            <input type="number" name="zip_code" value={user.zip_code} onChange={handleChange} className="form-control" />
                            <div className="register__error">{errors.zip_code}</div>
                        </div>
                        <div className="register__group">
                            <label><FormattedMessage id="app.address" defaultMessage="Address:"/></label>
                            <input name="address" value={user.address} onChange={handleChange} className="form-control" />
                            <div className="register__error">{errors.address}</div>
                        </div>
                        <div className="register__group">
                            <label><FormattedMessage id="app.birthday" defaultMessage="Birthday:"/></label>
                            <input type='date' name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} className="form-control" />
                            <div className="register__error">{errors.dateOfBirth}</div>
                        </div>
                        <button className="register__button" type="submit" disabled={!user.name || !user.lastName || !user.username || !user.password || !user.password || !user.email || !user.country || !user.city || !user.address || !user.zip_code || !user.dateOfBirth || Object.keys(errors).length} ><FormattedMessage id="app.sign-up" defaultMessage="Sign Up"/></button>
                    </form>
                </div>
            </div>
            <WhatsApp />
        </>
    )
}

export default CreateUser;