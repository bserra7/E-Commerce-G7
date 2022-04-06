import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

export function Payment(props) {

  const intl = useIntl();

  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  const url = window.location.href;
  const query = new URL(url);
  const { paymentStatus } = props.match.params
  const orderId = query?.searchParams?.get("external_reference");
  return (
    <div className='container'>
      <div className="orderDetails shadow" style={{minHeight: 0}}>
           <div className="orderDetails__item" style={styles}>
              <div className="item__details">
                <div className="item__title">
                    {paymentStatus === 'success' ? intl.formatMessage( { id: "message-success"}) `✅` : 
                    paymentStatus === 'failure' ? intl.formatMessage( { id: "message-failure"})`❌` : 
                    intl.formatMessage( { id: "message-pending"})`⏱️`}
                </div>
                <div className="item__description">
                  {<Link to={`/user/account/order/detail/${orderId}`}>
                    <button className="register__button" style={{marginBottom: "0px"}}><FormattedMessage id="app.order-detail" defaultMessage="Order Details"/></button>
                  </Link>}
                </div>
              </div>
            </div>
      </div>
    </div>

  );
}

export default Payment;
