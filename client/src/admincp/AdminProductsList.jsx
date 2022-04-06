import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/actions';
import { Link } from 'react-router-dom';
import AdminSearchBar from './AdminSearchBar';
import swal from 'sweetalert';
import { FormattedMessage, useIntl } from 'react-intl'

export default function AdminProductsList({showComponent, getId}) {
    const dispatch = useDispatch();
    const intl = useIntl();
    const products = useSelector(state => state.products);

    useEffect(()=>{
        dispatch(getAllProducts());
    },[])

    const addProduct = () => {
        showComponent('addProduct')
    }

    const editProduct = (productId) => {
        getId(productId);
        showComponent('updateProduct')
    }

    const deleteProduct = async (productId) => {
        let token;
        if(localStorage.getItem('jwt')) token = localStorage.getItem('jwt');
        else if(sessionStorage.getItem('jwt')) token = sessionStorage.getItem('jwt');
        try {
            swal({
                title: intl.formatMessage({ id: "message-delete-prod-quest" }),
                text: intl.formatMessage({ id: "message-text-disc" }),
                icon: 'warning',
                buttons: ['No', intl.formatMessage({ id: "message-yes" })]
            }).then(async (result) => {
                if (result) {
                    await axios.delete('/product', {data: {token, productId}});
                    swal({
                        title: intl.formatMessage({ id: "message-delete-prod" }) + productId,
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
                title: intl.formatMessage({ id: "message-error" }),
                text: intl.formatMessage({ id: "message-error-check" }),
                icon: 'error',
                timer: 2000,
                button: null
            })
            console.log(error);
        }
    }

    return(
        <div className='adminSubComp'>
            <div className='componentTitle'><FormattedMessage id="app.manage-prod" defaultMessage="Products Management"/> <button onClick={addProduct} className='componentTitle__button'><FormattedMessage id="app.add-new-prod" defaultMessage="Add new Product"/></button></div>
            <AdminSearchBar search='products' />
            <div className='tableHeader'><div><FormattedMessage id="app.product-name" defaultMessage="Product name"/></div>|<div><FormattedMessage id="app.price" defaultMessage="Price"/></div>|<div><FormattedMessage id="app.stok-prod" defaultMessage="Stock"/></div>|<div><FormattedMessage id="app.rate" defaultMessage="Rate"/></div>|<div><FormattedMessage id="app.action" defaultMessage="Action"/></div></div>
            <div className='adminTable'>
                <ul>
                    {Array.isArray(products) ? products?.map(prod => <li className='prodList' key={prod.id}>
                        <div><Link className='link' to={`/product/${prod.id}`}>{prod.name.slice(0, 35)}{prod.name.length > 35 && '...'}</Link></div>
                        <div>{prod.discount ? 
                        <>
                            <span className='discounted'>$ {Number(prod?.price?.toFixed(2))}</span>
                            <span className='fullprice'>$ {Number(prod?.discounted_price?.toFixed(2))}</span>
                        </> : <span className='fullprice'>$ {Number(prod?.price?.toFixed(2))}</span>}
                        </div>
                        <div>{prod.stock}</div>
                        <div>{prod.rating}</div>
                        <div>
                            <button onClick={e => editProduct(prod.id)} className='adminCP__button'><FormattedMessage id="app.btn-edit" defaultMessage="Edit"/></button>
                            <button onClick={e => deleteProduct(prod.id)}className='adminCP__button'><FormattedMessage id="app.btn-delete" defaultMessage="Delete"/></button>
                        </div>
                        
                        </li>) : <div className='noDataFound'>{products}</div>}
                </ul>
            </div>
        </div>
    )
}
