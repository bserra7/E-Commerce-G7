import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getOrderDetail } from "../redux/actions";
import Payments from "./Payments";
import { FormattedMessage } from 'react-intl';
import useCurrency from '../context/useCurrency';
import formatter from '../lang/NumberFormat';

export default function OrderDetail(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const orderId = props.id || props.match.params.id ;
    const orderDetail = useSelector((state) => state.orderDetail);
    const { currency, multiplier } = useCurrency();

    useEffect(() => {
        dispatch(getOrderDetail(orderId));
    }, []); //eslint-disable-line

    return (
        <div className='container'>
                <div className="orderDetails shadow">
                     <div className="orderDetails__item">
                        <div className="item__details">
                        <div className="item__title">
                            <FormattedMessage id="app.number-order" defaultMessage="Order N°: "/>
                            {orderDetail?.id} 
                            {history.location.pathname === '/admincp' && <button className="orderDetails__btn" onClick={e => props.showComponent('orders')}><FormattedMessage id="app.button-back" defaultMessage="Back"/></button>}
                        </div>
                        <div className="item__description">
                            <ul>
                                <li>
                                    <span><FormattedMessage id="app.date" defaultMessage="Date: "/></span>
                                    <span>{orderDetail?.date}</span>
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.status-order" defaultMessage="Order status: "/></span>
                                    <span>{orderDetail?.status}</span>
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.status-payment" defaultMessage="Payment status: "/></span>
                                    <span>{orderDetail?.payment_status}</span>
                                    
                                </li>
                                {orderDetail?.payment_status === 'approved' && <Link to={`/user/account/order/payment/${orderDetail?.payment_meli_id}`}>
                                    <button className="orderDetails__btn" style={{position: "absolute", top: "2rem", right: "1rem"}}>Payment Details</button>
                                </Link>}
                                {(history.location.pathname !== '/admincp' && orderDetail?.payment_status !== 'approved') && <Payments className="orderCheckout" url={orderDetail?.payment_link}/>}
                                <li>
                                    <span><FormattedMessage id="app.email-notification" defaultMessage="Notification-Email: "/></span>
                                    <span>{orderDetail?.notification_email}</span>
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.address" defaultMessage="Adress: "/></span>
                                    <span>{orderDetail?.shipping_address}</span>
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.city" defaultMessage="City: "/></span>
                                    <span>{orderDetail?.shipping_city}</span>
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.zip" defaultMessage="Zip-Code: "/></span>
                                    <span>{orderDetail?.shipping_zip_code}</span>
                                </li>
                                <li>
                                    <div className='order__products'>
                                        <span><FormattedMessage id="app.items" defaultMessage="Items: "/></span>
                                        <ul>
                                            {orderDetail.products?.map(product=>(
                                                <li key={product.id}>
                                                    <Link to={`/product/${product.id}`}><span>{product.name}</span></Link>
                                                    <span>({product.product_order.amount})</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <br/>
                                    </div>
                                </li>
                            </ul>
                            <div className="total">
                                <span>Total: </span>
                                <span>{currency === "USD" && "US"} {formatter(currency).format(orderDetail?.total*multiplier)}</span>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}





