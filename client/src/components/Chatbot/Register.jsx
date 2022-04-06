import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl'

const Register = () => {    
    return (
        <span><FormattedMessage id="app.chat-sign" defaultMessage="If you can't find where Sign Up is, please click "/><Link to="/register"><FormattedMessage id="app.chat-here-upper" defaultMessage="HERE"/></Link><FormattedMessage id="app.chat-redirect" defaultMessage="to redirect"/></span>
        );
    }
export default Register;