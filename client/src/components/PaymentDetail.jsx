import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail, getPaymentDetail } from "../redux/actions";

export default function PaymentDetail(props, {meliId, idOrder}) {
    const dispatch = useDispatch();
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
                        <div className="item__title">
                            {paymentDetail?.status === 'approved' ? `Your Payment has been ${paymentDetail?.status} ✅` : 
                            paymentDetail?.status === 'rejected' ? `Your Payment has been ${paymentDetail?.status} ❌` : 
                            `Your Payment is ${paymentDetail?.status} ⏱️`}
                        </div>
                        <div className="item__description">
                            <ul>
                                <li>
                                    <span>Order N°: </span>
                                    <span>{orderDetail?.id}</span>
                                </li>
                                <li>
                                    <span>Payment N°: </span>
                                    <span>{paymentDetail?.id_meli}</span>
                                </li>
                                <li>
                                    <span>Order Payment status: </span>
                                    <span>{orderDetail?.payment_status}</span>
                                    
                                </li>
                                <li>
                                    <span>Mercado Pago status: </span>
                                    <span>{paymentDetail?.status}</span>
                                    
                                </li>
                                <li>
                                    <span>Payment Method: </span>
                                    <span>{paymentDetail?.payment_type_id?.split('_').join(' ')}</span>
                                </li>
                                <li>
                                    <span>Payment Type: </span>
                                    <span>{paymentDetail?.payment_method_id}</span>
                                </li>
                                <li>
                                    <span>Expiration: </span>
                                    <span>{paymentDetail?.card_expiration_month} / {paymentDetail?.card_expiration_year}</span>
                                </li>
                                <li>
                                    <span>Payment Acredited: </span>
                                    <span>{paymentDetail?.money_release_date?.slice(0,19).split('T').reverse().join(' ')}</span>
                                </li>
                                <li>
                                    <span>Installments: </span>
                                    <span>{paymentDetail?.installments}</span>
                                </li>
                                <li>
                                    <span>Installments Amount: </span>
                                    <span>{paymentDetail?.installment_amount}</span>
                                </li>
                                <li>
                                    <span>Order Total: </span>
                                    <span>{orderDetail.total} USD</span>
                                </li>
                                <li>
                                    <span>Total Paid: </span>
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





