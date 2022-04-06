import React from "react";
import { FormattedMessage } from 'react-intl'

export default function Payments({ url, clearCart }){

    return(
        <div className="payments">
            <a className="payments__btn" href={url}>
                <button className="payments__button" onClick={clearCart} disabled={!url?.length}><FormattedMessage id="app.button-pay" defaultMessage="Pay order"/></button>
            </a>
        </div>
    )
}
