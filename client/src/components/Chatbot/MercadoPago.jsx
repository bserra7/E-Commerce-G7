import React from "react";
import { Link } from "react-router-dom";
import MP from '../../assets/images/MercadoPago.svg';
import CC from '../../assets/images/credit_cards.svg';

const MergadoPago = () => {

    return (
        <span className="chatbot-payments">
            <img src={MP} alt="mercado pago" />
            <img src={CC} alt="credit cards" />
            </span>
        );
    }
    
export default MergadoPago;