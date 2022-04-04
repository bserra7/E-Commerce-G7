import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVisitedProducts } from "../redux/actions";
import Visited from "./Visited";

export default function FrecuentlyVisited(){
    const dispatch = useDispatch();
    const { user, visitedProducts } = useSelector(state => state);

    useEffect(()=>{
        dispatch(getVisitedProducts(user?.id))
    },[])

    return(
        <>
        <div className="container">
            <h2 className="visited__title">Based on your last visit</h2>
        </div>
        <div className="container">
            <div className="visited-wrapper">
                <div className="visited">
                    {visitedProducts?.slice(0,8).map(product => <Visited key={product.id} {...product} />)}
                </div>
            </div>
        </div>
        </>
    )
}
