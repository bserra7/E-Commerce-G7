import React from "react";
import { Link } from "react-router-dom";
import useCurrency from "../context/useCurrency";
import formatter from "../lang/NumberFormat";

const Product = ({id, name, price, discount, discounted_price, images}) => {
  const { currency, multiplier } = useCurrency();
    return(
        <>
        {id ? (
          <Link to={`/product/${id}`} className="products__item">
            <figure>
              <img src={images} alt="images" />
            </figure>
            <h3>{name.slice(0, 55)}{name.length > 55 && "..."}</h3>
            <span className="price">{discount ? 
            <> 
              <span className="full-price" >{currency === "USD" && "US"} {formatter(currency).format(price*multiplier)}</span>
              <span>{currency === "USD" && "US"} {formatter(currency).format(discounted_price*multiplier)}</span>
            </>
             : <span>{currency === "USD" && "US"} {formatter(currency).format(price*multiplier)}</span> }</span>
          </Link>
        ) : (
          <h2>Loading...</h2>
        )}
      </>
    )
}

export default Product;