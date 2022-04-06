import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl'

const Product = () => {

    return (
        <span><FormattedMessage id="app.chat-go" defaultMessage="Go to Shop. Click " /><Link to="/shop"><FormattedMessage id="app.chat-here-upper" defaultMessage="HERE"/></Link></span>
        );
    }
    
export default Product;