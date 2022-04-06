import React from "react";
import { Link } from "react-router-dom";
import useUser from "../Login/hooks/useUser";
import { FormattedMessage } from 'react-intl'

const ViewProfile = () => {    
    const { isLogged } = useUser();
    return (
        <>
    {!isLogged 
        ? <span><FormattedMessage id="chatbot-viewProfile-logged" defaultMessage="If you can't find where log in, please click "/><Link to="/user/account/profile"><FormattedMessage id="app.chat-here-upper" defaultMessage="HERE"/></Link><FormattedMessage id="app.chat-redirect" defaultMessage="to redirect"/></span>
        : <span><span><FormattedMessage id="app.chat-profile" defaultMessage="If you can't find where is your Profile, please click "/><Link to="/user/account/profile"><FormattedMessage id="app.chat-here-upper" defaultMessage="HERE"/></Link><FormattedMessage id="app.chat-redirect" defaultMessage="to redirect"/></span></span>}
    </>
        
        );
    }
export default ViewProfile;