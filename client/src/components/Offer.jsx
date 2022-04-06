import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import useCurrency from "../context/useCurrency";
import formatter from "../lang/NumberFormat";

export default function Offer({id, name, images, price, rating, discount, discounted_price}){
    const { currency, multiplier } = useCurrency();
    return(
        <div className="">
            <div>
            {id ? (
            <Link to={`/product/${id}`} className="visited__item">
                <figure>
                    <img src={images} alt="images" />
                </figure>
                <h3>{name?.slice(0, 30)}{name?.length > 30 && "..."}</h3>
                <span className="price"> 
                    <span className="full-price" >{currency === "USD" && "US"} {formatter(currency).format(price*multiplier)}</span>
                    <span className="discount-price">{currency === "USD" && "US"} {formatter(currency).format(discounted_price*multiplier)}</span>
                    <span className="discount">-{discount}% OFF</span>
                </span>
                <span>{!rating ? <span><FormattedMessage id="app.no-rated" defaultMessage="No rated yet"/></span> : [...Array(rating)].map(star =>{return <FaStar key={Math.random().toString(16).slice(2)} color="orange" size={16}/>})}</span>
            </Link>
            ) : (
            <h2>Loading...</h2>
            )}
            </div>
        </div>
    )
}
