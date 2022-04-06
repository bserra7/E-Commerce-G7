import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions";
import Offer from "./Offer";
import { FormattedMessage } from "react-intl";

export default function OffersDisplay(){
    const dispatch = useDispatch();
    const { products } = useSelector(state => state);
    const withDiscount = products?.filter(product => product?.discount > 0);
    withDiscount.sort(() => {return Math.random() - 0.5});

    useEffect(()=>{
        dispatch(getAllProducts())
    },[])

    return(
        <>
        <div className="container">
            <h2 className="visited__title"><FormattedMessage id="app.offers" defaultMessage="Offers"/></h2>
        </div>
        <div className="container">
        <div className="visited-wrapper">
        {withDiscount?.length ? <div className="visited">
                    {withDiscount?.map(product => <Offer key={Math.random().toString(16).slice(2)} {...product} />)}
                </div>: <div className="no-offers"><FormattedMessage id="app.no-offers" defaultMessage="We don't have Offers yet. Come back soon and check for new deals"/></div>}
            </div>
        </div> 
        </>
    )
}
