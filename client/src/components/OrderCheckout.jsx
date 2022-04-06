import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import Payments from "./Payments";
import { useHistory } from "react-router-dom";
import useUser from "./Login/hooks/useUser";
import swal from 'sweetalert';
import { clearCart } from "../redux/actions";
import OrderShipping from "./OrderShipping";
import WhatsApp from "./WhatsApp";
import { FormattedMessage, useIntl } from 'react-intl'


export function OrderCheckout() {
    const history = useHistory();
    const intl = useIntl();
    const dispatch = useDispatch();
    const { isLogged } = useUser();
    const { cart, user } = useSelector(state => state);
    const [url, setUrl] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    let orderId;

    const [order, setOrder] = useState({
        total: null,
        products: null,
        userId: null
    })

    const [notification, setNotification] = useState({});

    const setShipping = (data) => {
        setNotification(data);
    }

    useEffect(() => {
        if (!isLogged) {
            swal({
                title: intl.formatMessage( { id: "message-logged" }),
                text: intl.formatMessage( { id: "message-logged-finish" }),
                icon: 'error',
                buttons: [intl.formatMessage( { id: "message-cancel" }), 'Ok']
            }).then(proceed => {
                if (proceed) history.push('/login');
                else history.push('/');
            })
        }
    }, [])

    useEffect(() => {
        setOrder({
            total: setTotal(),
            products: setProducts(),
            userId: user?.id
        })
    }, [cart, user]) //eslint-disable-line

    const setTotal = _ => {
        if (cart?.length) {
            const subtotal = cart?.map(el => el.amount * (el.discount ? Number(el.discounted_price?.toFixed(2)) : Number(el.price?.toFixed(2))))
            const total = subtotal?.reduce((acumulator, current) => acumulator + current);
            return Number(total.toFixed(2));
        }
    }

    const setProducts = _ => {
        const productData = cart?.map(prod => {
            return {
                id: prod.id,
                amount: prod.amount
            }
        })
        return productData;
    }

    const clearShopCart = () => {
        localStorage.removeItem('cart')
        dispatch(clearCart());
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setConfirmed(!confirmed);
        // PARA LA ORDEN DE PAGO (NO BORRAR)
        const products = cart?.map(product => ({
            name: product.name,
            price: product.discount ? Number(product.discounted_price?.toFixed(2)) : Number(product.price?.toFixed(2)),
            amount: product.amount
        }));

        try {
            const response = await axios.post("/order", { ...order, ...notification });
            if (response.status === 200) {
                orderId = response.data.id;
                swal({
                    title: intl.formatMessage({ id: "message-confirm" }),
                    text: intl.formatMessage({ id: "message-thanks" }),
                    icon: 'success',
                    timer: 3000,
                    button: null
                })

                // PARA LA ORDEN DE PAGO(NO BORRAR)
                const res = await axios.post("/createPayment", { products, orderId });
                if (res.status === 200) setUrl(res.data.response.sandbox_init_point);

            }
            localStorage.removeItem('cart')
        } catch (error) {
            swal({
                title: intl.formatMessage({ id: "message-error" }),
                text:  intl.formatMessage({ id: "message-error-check" }),
                icon: 'error',
                timer: 3000,
                button: null
            })
        }
    }

    return (
        <>
            <div className="orderCheckout">
                {isLogged ?
                    cart?.length ?
                        <div className="container">
                            <h2 className="orderCheckout__title"><FormattedMessage id="app.summary" defaultMessage="Order summary"/></h2>
                            {cart?.map(product =>
                                <div key={product.id} className="orderCheckout__content">
                                    <table className="order-table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img src={product.images} alt="product ph" />
                                                </td>
                                                <td>
                                                    <br /> <span className='thin'>{product.name}</span>
                                                    <br /> <FormattedMessage id="app.amount" defaultMessage="Amount: "/>{product.amount}<br />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className='price'>$ {product.discount ? Number(product.discounted_price?.toFixed(2)) : Number(product.price?.toFixed(2))}</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="line"></div>
                                </div>)}

                            <div className="total">
                                <span style={{ float: "left" }}>
                                    TOTAL:
                                </span>
                                <span style={{ float: "right", textAlign: "right", fontWeight: "bold" }}>
                                    $ {setTotal()}
                                </span>
                            </div>
                            <OrderShipping confirmed={confirmed} setShipping={setShipping} />
                            <button className="confirmOrder" onClick={(e) => handleSubmit(e)} disabled={!Object.keys(notification).length || confirmed}><FormattedMessage id="app.confirm-order" defaultMessage="CONFIRM ORDER"/></button>
                            <Payments clearCart={clearShopCart} url={url} />
                        </div> : <><div className="message"><FormattedMessage id="app.cart-empty" defaultMessage="Your cart is empty"/></div>
                        </>
                    : <div className="message"><FormattedMessage id="app.finish-purchase" defaultMessage="Please Login to finish your purchase"/></div>}
            </div>
            <WhatsApp />
        </>
    )
}

export default OrderCheckout;