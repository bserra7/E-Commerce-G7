import React from "react";
import Box from '../assets/images/404.png';
import { FormattedMessage } from "react-intl";

export default function NotFound404(){

    return(
        <div className="not-found__container">
            <div>
                <img src={Box} alt="not found" />
            </div>
            <div className="not-found__text"><FormattedMessage id="app.not-found" defaultMessage="404 - Page not found"/></div>
        </div>
    )
}
