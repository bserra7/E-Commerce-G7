import React from "react";
import { Link } from "react-router-dom";

export function Order({ order }) {
  return (
    <Link to={`/user/account/order/detail/${order.id}`} className="order">
      <div className="order__item">
        <div>Order N°: <span>{order.id}</span></div>
        <div>Date: <span>{order.date}</span></div>
        <div>Order Status: <span>{order.status}</span></div>
        <div>Payment Status: <span>{order.payment_status}</span></div>
        <div>Total: <span>{order.total}</span></div>
      </div>
    </Link>
  );
}

export default Order;
