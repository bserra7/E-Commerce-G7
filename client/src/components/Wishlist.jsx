import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../redux/actions";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

export function Wishlist() {
  const dispatch = useDispatch();
  const { user, wishlist } = useSelector((state) => state);


  useEffect(() => {
    dispatch(getUserWishlist(user?.id))
  }, [user]);

  const deleteProduct = async (productId) => {
      let userId = user?.id
    try {
        swal({
            title: 'Do you want to remove this product?',
            text: " ",
            icon: 'warning',
            buttons: ['No','Yes']
        }).then(async (result) => {
            if (result) {
                await axios.delete('/wishlist', {data: {userId, productId}});
                dispatch(getUserWishlist(userId));
                swal({
                    title: 'Removed from wishlist!',
                    text: ' ',
                    icon: 'success',
                    timer: 2000,
                    button: null
                })
                
            }
        })
    } catch (error) {
        swal({
            title: 'Something went wrong',
            text: 'Check console to see more about error',
            icon: 'error',
            timer: 2000,
            button: null
        })
        console.log(error);
    }
}

  return (
    <div>
      <div className="container">
        <h2 className="orders__title">MY WISHLIST</h2>
        {
            wishlist?.map((prod) => {
            return (
                <div key={prod.id}>
                    <Link to={`/product/${prod.id}`} ><h2>{prod.name}</h2>
                    <img src={prod.images} width='250px' height='250px' alt="productpic"/></Link>
                    <span>{prod.rating}</span>
                    <br/>
                    <span>{prod.price} USD</span>
                    <button onClick={()=>{deleteProduct(prod.id)}}>X</button>
                </div>
            );
        })}
      </div>
    </div>
  );
}

export default Wishlist;
