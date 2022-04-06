import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import useUser from './Login/hooks/useUser';
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

  if (!input.currentPassword) {
    errors.currentPassword = intl.formatMessage({id: "validation-current-pass"});
  } else if (!input.newPassword) {
    errors.newPassword = intl.formatMessage({id: "validation-new-password"});
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input.newPassword)) {
    errors.newPassword = intl.formatMessage({id: "validation-password-req"});
  } else if (!input.repeatPassword) {
    errors.repeatPassword = intl.formatMessage({id: "validation-password-repeat"});
  } else if (input.newPassword !== input.repeatPassword) {
    errors.repeatPassword = intl.formatMessage({id: "validation-password-match"});
  }
  return errors;
}

export default function ResetPassword() {
  const intl = useIntl();
  const user = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    currentPassword: '',
    newPassword: '',
    repeatPassword: '',
  });

  const { logout } = useUser();

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...inputs,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('/password/set', {
        userId: user.id,
        inputs,
      });
      if (response.status === 200) {
        swal({
          title: intl.formatMessage( { id: "message-reset-success"}),
          text: intl.formatMessage( { id: "message-new-pass"}),
          icon: 'success',
          timer: 2000,
        });
        logout();
      }
    } catch (error) {
      console.log(error);
      swal({
        title: intl.formatMessage( { id: "message-error"}),
        text: intl.formatMessage( { id: "message-error-password"}),
        icon: 'error',
        button: 'Ok',
      });
    }
  };

  return (
    <div className="resetPassword">
      <form className="resetPassword__form" onSubmit={handleSubmit}>
        <h2 className="resetPassword__title"><FormattedMessage id="app.reset-pass" defaultMessage="Reset Password"/></h2>
        <input
          value={inputs.currentPassword}
          type="password"
          name="currentPassword"
          placeholder={intl.formatMessage({ id: 'placeholderCurrent' })}
          onChange={handleChange}
        />
        <span className="error">{errors.currentPassword}</span>
        <input
          value={inputs.newPassword}
          type="password"
          name="newPassword"
          onChange={handleChange}
          placeholder={intl.formatMessage({ id: 'placeholderNew' })}
        />
        <span className="error">{errors.newPassword}</span>
        <input
          value={inputs.repeatPassword}
          type="password"
          name="repeatPassword"
          onChange={handleChange}
          placeholder={intl.formatMessage({ id: 'placeholderRepeat' })}
        />
        <span className="error">{errors.repeatPassword}</span>
        <button type="submit"><FormattedMessage id="app.new-pass" defaultMessage="Set New Password"/></button>
      </form>
    </div>
  );
}
