import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail, getPaymentDetail } from "../redux/actions";
import { FormattedMessage, useIntl } from "react-intl";

export default function PaymentDetail(props, {meliId, idOrder}) {
    const dispatch = useDispatch();
    const intl = useIntl();
    const orderDetail = useSelector((state) => state.orderDetail);
    const paymentDetail = useSelector((state) => state.paymentDetail);
    const paymentId = meliId || props.match?.params.id;
    const orderId = idOrder || paymentDetail?.orderId;

    useEffect(() => {
        dispatch(getOrderDetail(orderId));
        dispatch(getPaymentDetail(paymentId));
    }, []); //eslint-disable-line

    return (
        <div className='container'>
                <div className="orderDetails shadow">
                     <div className="orderDetails__item">
                        <div className="item__details">
                        <div className="item__title" style={{textAlign: "center", marginBottom: "1.5rem"}}>
                            {paymentDetail?.status === 'approved' ? intl.formatMessage( {id: "message-payment" })` ${paymentDetail?.status} ✅` : 
                            paymentDetail?.status === 'rejected' ? intl.formatMessage( {id: "message-payment" })` ${paymentDetail?.status} ❌` : 
                            intl.formatMessage( {id: "message-payment-is" })` ${paymentDetail?.status} ⏱️`}
                        </div>
                        <div className="item__description">
                            <ul>
                                <li>
                                    <span><FormattedMessage id="app.number-order" defaultMessage="Order N°:"/> </span>
                                    <span>{orderDetail?.id}</span>
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.payment-number" defaultMessage="Payment N°: "/></span>
                                    <span>{paymentDetail?.id_meli}</span>
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.pay-status" defaultMessage="Order Payment status: "/></span>
                                    <span>{orderDetail?.payment_status}</span>
                                    
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.mercado" defaultMessage="Mercado Pago status: "/></span>
                                    <span>{paymentDetail?.status}</span>
                                    
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.pay-method" defaultMessage="Payment Method: "/></span>
                                    <span>{paymentDetail?.payment_type_id?.split('_').join(' ')}</span>
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.pay-type" defaultMessage="Payment Type: "/></span>
                                    <span>{paymentDetail?.payment_method_id}</span>
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.expiration" defaultMessage="Expiration: "/></span>
                                    <span>{paymentDetail?.card_expiration_month} / {paymentDetail?.card_expiration_year}</span>
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.pay-acred" defaultMessage="Payment Acredited: "/></span>
                                    <span>{paymentDetail?.money_release_date?.slice(0,19).split('T').reverse().join(' ')}</span>
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.install" defaultMessage="Installments: "/></span>
                                    <span>{paymentDetail?.installments}</span>
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.install-amount" defaultMessage="Installments Amount: "/></span>
                                    <span>{paymentDetail?.installment_amount}</span>
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.order-total" defaultMessage="Order Total: "/></span>
                                    <span>{orderDetail.total} USD</span>
                                </li>
                                <li>
                                    <span><FormattedMessage id="app.total-pay" defaultMessage="Total Paid: "/></span>
                                    <span>{paymentDetail?.total_paid_amount} USD</span>
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}





