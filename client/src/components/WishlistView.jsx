import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../redux/actions";
import ProductFav from "./ProductFav";

export default function WishlistView(){
    const dispatch = useDispatch();
    const { user, wishlist } = useSelector(state => state);

    useEffect(()=>{
        dispatch(getUserWishlist(user?.id))
    },[])

    return(
        <div className="container">
            <h2 className="visited__title">Inspired by you</h2>
            <div className="visited">
                {wishlist?.slice(0,6).map(product => <ProductFav key={'Fav'+product.id} {...product} />)}
            </div>
        </div>
    )
}
