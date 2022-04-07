import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { clearStore, getProductDetail, addProduct, productAmountSum, getReviews } from '../redux/actions';
import useUser from './Login/hooks/useUser';
import ReviewAndRating from './ReviewAndRating';
import Reviews from './Reviews';
import axios from 'axios';
import AddToWishList from './AddToWishList';
import WhatsApp from './WhatsApp';
import { FormattedMessage } from 'react-intl'
import useCurrency from '../context/useCurrency';
import formatter from '../lang/NumberFormat';
import { FaStar } from 'react-icons/fa';

export function ProductDetail(props) {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const { details, cart, user, reviews } = useSelector((state) => state);
    const alreadyCommented = reviews?.find(review => user?.id === review?.userId);
    const { currency, multiplier } = useCurrency();
    const history = useHistory()

    const { isLogged } = useUser();

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getProductDetail(id));
        return () => {
            dispatch(clearStore("details"))
        }
    }, []); //eslint-disable-line

    useEffect(() => {
        dispatch(getReviews(id));
    }, []); //eslint-disable-line

    async function saveVisitedProducts() {
        await axios.post(`/visited`, { userId: user?.id, productId: id });
    }

    useEffect(() => {
        if (isLogged) {
            saveVisitedProducts();
        }
    }, [])

    const handleAddCart = (product) => {
        const cartProduct = cart?.filter(Product => Product.id === product.id)
        if (cartProduct.length && cartProduct[0].stock > cartProduct[0].amount)
            return dispatch(productAmountSum(product.id))
        if (!cartProduct.length) {
            product.amount = 1
            dispatch(addProduct(product))
        }
    }
    const buttonDisabled = details.stock <= 0 ? true : false

    return (
        <>
            <div className='container'>
                <Link to="#" style={{ color: "gray" }} onClick={() => history.goBack()} ><FormattedMessage id="app.back" defaultMessage="Back" /></Link>
                {Object.keys(details).length ?
                    <div>
                        <div className='productDetail'>
                            <figure className='productDetail__image'>
                                <img src={details.images} alt="product" width='350px' height='250px' />
                            </figure>
                            <div className='productDetail__description'>
                                <h2 className='name'>{details.name}</h2>
                                <ul className='categories'>{details.categories?.map(el => <li key={el.id}>{el.name}</li>)}</ul>
                                {isLogged && <AddToWishList userId={user?.id} productId={id} />}
                                {details.discount > 0 ?
                                    <>
                                        <span className='price-discount'>{currency === "USD" && "US"} {formatter(currency).format(details?.price * multiplier)}</span>
                                        <span className='price'>{currency === "USD" && "US"} {formatter(currency).format(details?.discounted_price * multiplier)}</span> <span className='discount'>-{details.discount}% OFF</span>
                                    </> : <span className='price'>{currency === "USD" && "US"} {formatter(currency).format(details?.price * multiplier)}</span>
                                }
                                <p className='description'>{details.description}</p>
                                {details.stock ? <p className='stock'><span><FormattedMessage id="app.stock" defaultMessage="In stock" /></span> ({details.stock} <FormattedMessage id="app.available" defaultMessage="available" />)</p> : <p className='stock'><span>⚠️<FormattedMessage id="app.not-available" defaultMessage="This product isn't available for shopping" /></span></p>}
                                <p className='rating'><span><FormattedMessage id="app.rating" defaultMessage="Rating:" /></span> {[...Array(details?.rating)].map(star =>{return <FaStar key={Math.random().toString(16).slice(2)} color="orange" size={15}/>})}</p>
                                <button className='addBtn' disabled={buttonDisabled} onClick={() => handleAddCart(details)}><FormattedMessage id="app.add" defaultMessage="Add product" /></button>
                                {user?.roleId < 3 && <Link className='updateBtn' to={`/product/update/${id}`}><button><FormattedMessage id="app.edit-prod" defaultMessage="Edit product" /></button></Link>}
                            </div>
                        </div>
                        <div className='wrapper-reviews'>
                            <Reviews id={id} className='reviews' />
                            {isLogged && !alreadyCommented ?
                                <ReviewAndRating productId={details.id} /> :
                                isLogged ? <p style={{ fontStyle: "italic", fontFamily: "roboto", fontSize: ".95rem" }}><FormattedMessage id="app.review" defaultMessage="You've already reviewed this product. Thanks for your feedback" /></p>
                                    : <p style={{ fontStyle: "italic", fontFamily: "roboto", fontSize: ".95rem" }}><FormattedMessage id="app.logged-review" defaultMessage="You must be logged to add a review. " /></p>}
                        </div>
                    </div>
                    : (<div style={{ height: "100vh" }} >Loading...</div>)}
            </div>
            <WhatsApp />
        </>
    )
}

export default ProductDetail;
