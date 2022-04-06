import { useContext, useCallback, useState } from 'react';
import axios from 'axios';
import currContext from './currencyContext';

async function getDivisa(){
    const response = await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json');
    const divisaAR = await response.data.usd.ars;
    return divisaAR
}

export default function useCurrency(){
    const { curr, setCurr, setMultiplier, multiplier } = useContext(currContext);

    const setCurrency = useCallback((currency) => {
        setCurr(currency)
        if(currency === "ARS") {
            localStorage.setItem('currency', 'ARS');
            getDivisa()
            .then(data => setMultiplier(data))
            .catch(err => console.log(err))
        }
        else {
            localStorage.setItem('currency', 'USD');
            setMultiplier(1);
        }
    }, [setCurr]) //eslint-disable-line


    return {
        currency: curr,
        multiplier,
        setCurrency
    }
}
