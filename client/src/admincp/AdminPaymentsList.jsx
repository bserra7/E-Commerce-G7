import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPayments } from '../redux/actions';
import { FormattedMessage } from 'react-intl';
import useCurrency from '../context/useCurrency';
import formatter from '../lang/NumberFormat';

export default function AdminPaymentsList({getId, showComponent}) {
    const dispatch = useDispatch();
    const payments = useSelector(state => state?.payments);
    const { currency, multiplier } = useCurrency();

    useEffect(()=>{
        dispatch(getAllPayments());
    },[])

    const seeOrderDetails = (id, orderId) => {
        const detail = {
            meli_id: id,
            orderId
        };
        getId(detail);
        showComponent('paymentDetail')
    }

    return(
        <div className='adminSubComp'>
            <div className='componentTitle'><FormattedMessage id="app.payment-manage" defaultMessage="Payments Management"/></div>
            <div className='tableHeader'><div><FormattedMessage id="app.pay-mercado" defaultMessage="Payment ID Mercado Pago"/></div>|<div><FormattedMessage id="app.total-pay" defaultMessage="Total Paid"/></div>|<div><FormattedMessage id="app.method" defaultMessage="Method"/></div>|<div><FormattedMessage id="app.type" defaultMessage="Type"/></div>|<div><FormattedMessage id="app.status" defaultMessage="Status"/></div></div>
            <div className='adminTable'>
                <ul>
                    {Array.isArray(payments) ? (payments?.map(payment => 
                    <li className='itemList' key={payment.id}>
                        <div>{payment.id_meli}</div>
                        <div>{currency === "USD" && "US"} {formatter(currency).format(payment.total_paid_amount*multiplier)}</div>
                        <div>{payment.payment_type_id?.split('_').join(' ')}</div>
                        <div>{payment.payment_method_id}</div>
                        <div>{payment.status} <button className='adminCP__button' onClick={e => seeOrderDetails(payment.id_meli, payment.orderId)}><FormattedMessage id="app.details" defaultMessage="Details"/></button></div>    
                    </li>)): <div className='noDataFound'><FormattedMessage id="message-no-found-payment" defaultMessage="No payments found"/></div>}
                </ul>
            </div>
        </div>
    )
}
