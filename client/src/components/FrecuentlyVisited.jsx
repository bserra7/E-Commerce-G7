import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVisitedProducts } from "../redux/actions";
import Visited from "./Visited";
import { FormattedMessage } from 'react-intl'

export default function FrecuentlyVisited(){
    const dispatch = useDispatch();
    const { user, visitedProducts } = useSelector(state => state);
    visitedProducts?.sort(() => {return Math.random() - 0.5});

    useEffect(()=>{
        dispatch(getVisitedProducts(user?.id))
    },[])

    return(
        <>
        <div className="container">
            <h2 className="visited__title"><FormattedMessage id="app.frequently" defaultMessage="Based on your last visit"/></h2>
        </div>
        <div className="container">
            <div className="visited-wrapper">
                <div className="visited">
                    {visitedProducts?.map(product => <Visited key={Math.random().toString(16).slice(2)} {...product} />)}
                </div>
            </div>
        </div>
        </>
    )
}
