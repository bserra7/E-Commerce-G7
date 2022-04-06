import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useUser from "../Login/hooks/useUser";
import { Link } from "react-router-dom";
import { getOrderByUserId } from "../../redux/actions/index";
import { FormattedMessage } from 'react-intl'

const Orders = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state);
    const { isLogged } = useUser();
   
    useEffect(() => {
        if (isLogged) {
            dispatch(getOrderByUserId(user?.id));
        }
    }, []); //eslint-disable-line

    return (
        <div>
            {!isLogged ? <span><FormattedMessage id="app.chat-login" defaultMessage="To see your orders you must be Logged. Please Login "/><Link to= "/login"><FormattedMessage id="app.here" defaultMessage="here"/></Link></span>
            : <span><FormattedMessage id="app.chat-see-orders" defaultMessage="You can see your orders"/><Link to="/user/account/orders"><FormattedMessage id="app.chat-here" defaultMessage="here"/></Link></span>            }
        </div>
    );
};

export default Orders;   
