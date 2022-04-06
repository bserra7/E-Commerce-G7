import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import useCurrency from '../context/useCurrency';
import formatter from '../lang/NumberFormat';

export function Order({ order }) {
  const { currency, multiplier } = useCurrency();
  return (
    <Link to={`/user/account/order/detail/${order.id}`} className="order">
      <div className="order__item">
        <div><FormattedMessage id="app.number-order" defaultMessage="Order N°: "/><span>{order.id}</span></div>
        <div><FormattedMessage id="app.date" defaultMessage="Date: "/><span>{order.date}</span></div>
        <div><FormattedMessage id="app.status-order" defaultMessage="Order Status: "/><span>{order.status}</span></div>
        <div><FormattedMessage id="app.status-payment" defaultMessage="Payment Status: "/><span>{order.payment_status}</span></div>
        <div>Total: <span>{currency === "USD" && "US"} {formatter(currency).format(order?.total*multiplier)}</span></div>
      </div>
    </Link>
  );
}

export default Order;
