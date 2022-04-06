import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../redux/actions';
import AdminSearchBar from './AdminSearchBar';
import swal from 'sweetalert';
import { FormattedMessage, useIntl } from 'react-intl'

export default function AdminOrdersList({getId, showComponent}) {
    const dispatch = useDispatch();
    const intl = useIntl();
    let orders = useSelector(state => state.orders);
    useEffect(()=>{
        dispatch(getAllOrders());
    },[])

    const seeOrderDetails = (id) => {
        getId(id);
        showComponent('details')
    }

    const changeStatus = async (event, orderId) => {
        let token;
        if(localStorage.getItem('jwt')) token = localStorage.getItem('jwt');
        if(sessionStorage.getItem('jwt')) token = sessionStorage.getItem('jwt');
        try {
            await axios.put('/order/status', { orderId, status: event.target.value, token });
            swal({
                title: intl.formatMessage({ id: "message-order-change" }),
                text: intl.formatMessage({ id: "message-id-order-status" }) + orderId + intl.formatMessage({ id: "message-change-to" }) + event.target.value,
                icon: 'success',
                timer: 3000,
                button: null
            })
            dispatch(getAllOrders());
        } catch (error) {
            swal({
                title: intl.formatMessage({ id: "message-error" }),
                text: intl.formatMessage({ id: "message-error-check" }),
                icon: 'error',
                timer: 2000,
                button: null
            })
            console.log(error);
        }
        
        dispatch(getAllOrders());
    }

    return(
        <div className='adminSubComp'>
            <div className='componentTitle'><FormattedMessage id="app.order-manage" defaultMessage="Orders Management"/></div>
            <AdminSearchBar search='orders' />
            <div className='tableHeader'><div><FormattedMessage id="app.order-id" defaultMessage="Order ID"/></div>|<div>Total</div>|<div><FormattedMessage id="app.date-order" defaultMessage="Date"/></div>|<div><FormattedMessage id="app.status" defaultMessage="Status"/></div>|<div><FormattedMessage id="app.action" defaultMessage="Action"/></div></div>
            <div className='adminTable'>
                <ul>
                    {Array.isArray(orders) ? (orders?.map(order => <li className='itemList' key={order.id}>
                        <div>{order.id}</div>
                        <div>US$ {order.total}</div>
                        <div>{order.date}</div>
                        <div>{order.status} <button className='adminCP__button' onClick={e => seeOrderDetails(order.id)}><FormattedMessage id="app.btn-details" defaultMessage="Details"/></button></div>
                        <div>
                            <button value='processing' onClick={e => changeStatus(e, order.id)} disabled={order.status === 'canceled' || order.status === 'complete' || order.status === 'processing'}className='adminCP__button'><FormattedMessage id="app.btn-processing" defaultMessage="Processing"/></button>
                            <button value='canceled' onClick={e => changeStatus(e, order.id)} disabled={order.status === 'complete' || order.status === 'canceled'} className='adminCP__button'><FormattedMessage id="app.btn-cancelled" defaultMessage="Cancelled"/></button>
                            <button value='complete' onClick={e => changeStatus(e, order.id)} disabled={order.status === 'canceled' || order.status === 'complete'} className='adminCP__button'><FormattedMessage id="app.btn-complete" defaultMessage="Complete"/></button>
                        </div>
                        
                        </li>)): <div className='noDataFound'>{orders}</div>}
                </ul>
            </div>
        </div>
    )
}
