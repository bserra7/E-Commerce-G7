import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import '../../styles/styles.scss';
import validate from './services/validateLogin.js';
import useUser from './hooks/useUser';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/actions';
import { FormattedMessage, useIntl } from 'react-intl'

export default function Login() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    username: '',
    rememberMe: false,
    password: '',
  });
  const history = useHistory();
  const { login, isLogged, isLoginLoading, hasLoginError } = useUser();

  useEffect(() => {
    if (isLogged) history.push('/');
  }, [isLogged, history]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleCheckbox = () => {
    if (input.rememberMe) setInput({ ...input, rememberMe: false });
    if (!input.rememberMe) setInput({ ...input, rememberMe: true });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(input);
  };

  const responseGoogle = (response) => {
    axios
      .post('/googleLogin', { id_token: response.tokenId })
      .then((res) => {
        input.rememberMe
          ? localStorage.setItem('jwt', res.data.token)
          : sessionStorage.setItem('jwt', res.data.token);
        dispatch(userLogin(res.data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      {isLoginLoading && <span><FormattedMessage id="app.check-info" defaultMessage="Checking credentials..."/></span>}
      {!isLoginLoading && (
        <div className="resetPassword login">
          <form className="resetPassword__form" onSubmit={handleSubmit}>
            <h2 className="resetPassword__title"><FormattedMessage id="app.please" defaultMessage="Please login"/></h2>
            {hasLoginError && <span><FormattedMessage id="app.error-credentials" defaultMessage="Credentials are invalid"/></span>}
            <input
              value={input.username}
              type="text"
              className="form-control"
              name="username"
              placeholder={intl.formatMessage({ id: 'placeholderUsername' })}
              onChange={handleChange}
            />
            <input
              value={input.password}
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
              placeholder={intl.formatMessage({ id: 'placeholderPassword' })}
            />
            <span className="error">{errors.username}</span>
            <span className="error">{errors.password}</span>
            <label className="checkbox">
              <FormattedMessage id="app.remember" defaultMessage="Remember me"/>
              <input
                type="checkbox"
                onChange={handleCheckbox}
                id="rememberMe"
                name="rememberMe"
              />{' '}
            </label>
            <button type="submit"><FormattedMessage id="app.login" defaultMessage="Log In" /></button>
            <GoogleLogin
              className="btn-google"
              clientId="827278609523-buiubpo31u43c0snvgsjhukdtces0ijo.apps.googleusercontent.com"
              buttonText= {intl.formatMessage({ id: 'placeholderLogin' })}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </form>
        </div>
      )}
    </div>
  );
}
