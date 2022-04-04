import React from "react";
import { Link } from "react-router-dom";

export function Payment(props) {
  const url = window.location.href;
  const query = new URL(url);
  const { paymentStatus } = props.match.params
  const orderId = query?.searchParams?.get("external_reference");
  return (
    <div className='container'>
      <div className="orderDetails shadow">
           <div className="orderDetails__item">
              <div className="item__details">
                <div className="item__title">
                    {paymentStatus === 'success' ? `Your Payment has been Approved ✅` : 
                    paymentStatus === 'failure' ? `Your Payment has been Rejected ❌` : 
                    `Your Payment is Pending ⏱️`}
                </div>
                <div className="item__description">
                  {<Link to={`/user/account/order/detail/${orderId}`}><button className="register__button">Order Details</button></Link>}
                </div>
              </div>
            </div>
      </div>
    </div>

  );
}

export default Payment;
