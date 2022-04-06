import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiscounts, getAllProducts } from '../redux/actions';
import swal from 'sweetalert';
import { FormattedMessage, useIntl } from 'react-intl'

export default function AdminDiscountsList({showComponent, getId}) {
    const dispatch = useDispatch();
    const discounts = useSelector(state => state.discounts);
    const intl = useIntl();

    useEffect(()=>{
        dispatch(getAllDiscounts());
    },[])

    const setDiscount = () => {
        showComponent('setDiscounts')
    }

    const UpdateProductDiscount = async (discount) => {
        let token;
        if(localStorage.getItem('jwt')) token = localStorage.getItem('jwt');
        else if(sessionStorage.getItem('jwt')) token = sessionStorage.getItem('jwt');
        try {
            swal({
                title: 'Do you want update all product discounts with this category?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                buttons: ['No','Yes']
            }).then(async (result) => {
                if (result) {
                    await axios.post('/discount/update', {...discount, token});
                    swal({
                        title: 'You updated the products with selected discount',
                        text: ' ',
                        icon: 'success',
                        timer: 2000,
                        button: null
                    })
                    dispatch(getAllProducts());
                }
            })
        } catch (error) {
            swal({
                title: 'Something went wrong',
                text: 'Check console to see more about error',
                icon: 'error',
                timer: 2000,
                button: null
            })
            console.log(error);
        }
    }

    const deleteDiscount = async (categoryId) => {
        let token;
        if(localStorage.getItem('jwt')) token = localStorage.getItem('jwt');
        else if(sessionStorage.getItem('jwt')) token = sessionStorage.getItem('jwt');
        try {
            swal({
                title: intl.formatMessage({ id: "message-delete-disc" }),
                text: intl.formatMessage({ id: "message-text-disc" }),
                icon: 'warning',
                buttons: ['No', intl.formatMessage({ id: "message-yes" })]
            }).then(async (result) => {
                if (result) {
                    await axios.delete('/discount', {data: {categoryId, token}});
                    swal({
                        title: intl.formatMessage({ id: "message-delete-success" }),
                        text: ' ',
                        icon: 'success',
                        timer: 2000,
                        button: null
                    })
                    dispatch(getAllDiscounts());
                }
            })
        } catch (error) {
            swal({
                title: intl.formatMessage({ id: "message-error" }),
                text:  intl.formatMessage({ id: "message-error-check" }),
                icon: 'error',
                timer: 2000,
                button: null
            })
            console.log(error);
        }
    }

    return(
        <div className='adminSubComp'>
            <div className='componentTitle'><FormattedMessage id="app.manage-disc" defaultMessage="Discount Management"/><button onClick={setDiscount} className='componentTitle__button'><FormattedMessage id="app.btn-set-disc" defaultMessage="Set new Discount"/></button></div>
            <div className='tableHeader'><div><FormattedMessage id="app.category" defaultMessage="Category"/></div>|<div><FormattedMessage id="app.discount" defaultMessage="Discount"/></div>|<div><FormattedMessage id="app.weekday" defaultMessage="Weekday"/></div>|<div><FormattedMessage id="app.end" defaultMessage="End Date"/></div>|<div><FormattedMessage id="app.action" defaultMessage="Action"/></div></div>
            <div className='adminTable'>
                <ul>
                    {Array.isArray(discounts) ? discounts?.map(discount => <li className='itemList' key={discount?.categoryId}>
                        <div>{discount?.category?.name}</div>
                        <div>{discount?.discount} %</div>
                        <div>{discount?.weekday}</div>
                        <div>N/A</div>
                        <div>
                            <button onClick={e => UpdateProductDiscount(discount)}className='adminCP__button'>Update Products</button>
                            <button onClick={e => deleteDiscount(discount.categoryId)}className='adminCP__button'><FormattedMessage id="app.btn-delete" defaultMessage="Delete"/></button>
                        </div>
                        
                        </li>) : <div className='noDataFound'>{discounts}</div>}
                </ul>
            </div>
        </div>
    )
}
