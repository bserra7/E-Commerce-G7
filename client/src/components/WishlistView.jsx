import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../redux/actions";
import ProductFav from "./ProductFav";
import { FormattedMessage } from 'react-intl';

export default function WishlistView(){
    const dispatch = useDispatch();
    const { user, wishlist } = useSelector(state => state);

    useEffect(()=>{
        dispatch(getUserWishlist(user?.id))
    },[])

    return(
        <>
            <div className="container">
                <h2 className="visited__title"><FormattedMessage id="app.inspired" defaultMessage="Inspired by you"/></h2>
            </div>
            <div className="container">
                <div className="visited-wrapper">
                    <div className="visited">
                        {wishlist?.map(product => <ProductFav key={Math.random().toString(16).slice(2)} {...product} />)}
                    </div>
                </div>
            </div>
        </>
    )
}
