import React from "react";

export default function Payments({ url, clearCart }){

    return(
        <div className="payments">
            <a className="payments__btn" href={url}>
                <button className="payments__button" onClick={clearCart} disabled={!url?.length}>Pay order</button>
            </a>
        </div>
    )
}
