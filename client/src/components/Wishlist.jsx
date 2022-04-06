import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../redux/actions";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl'
import { FaStar } from "react-icons/fa";

export function Wishlist() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { user, wishlist } = useSelector((state) => state);


  useEffect(() => {
    dispatch(getUserWishlist(user?.id))
  }, [user]);

  const deleteProduct = async (productId) => {
      let userId = user?.id
    try {
        swal({
          title: intl.formatMessage({ id: "message-removed" }),
            text: " ",
            icon: 'warning',
            buttons: ['No', intl.formatMessage({ id: "message-yes" })]
        }).then(async (result) => {
            if (result) {
                await axios.delete('/wishlist', {data: {userId, productId}});
                dispatch(getUserWishlist(userId));
                swal({
                  title: intl.formatMessage({ id: "message-removed" }),
                    text: ' ',
                    icon: 'success',
                    timer: 2000,
                    button: null
                })
                
            }
        })
    } catch (error) {
        swal({
            title: intl.formatMessage({ id: "message-error" }),
            text: intl.formatMessage({ id: "message-error-check" }),
            icon: 'error',
            timer: 2000,
            button: null
        })
        console.log(error);
    }
}

  return (
    <div className="wishlist">
      <div className="container">
        {wishlist.length === 0
          ? <h2 style={{"textAlign": "center", marginTop: "6rem", marginBottom: "4rem"}}>No hay Productos</h2>
          : <h2 className="orders__title"><FormattedMessage id="app.wish" defaultMessage="MY WISHLIST"/></h2>
          }
        <div className="visited-wrapper">
          <div className="visited">
            {
              wishlist?.map((prod) => {
              return (
                  <div key={prod.id}>
                      <Link to={`/product/${prod.id}`} className="wishlist__item">
                        <h2>{prod.name?.length > 30 ? prod.name?.slice(0,30) + " ..." : prod.name}</h2>
                        {prod?.rating ? <span>{[...Array(prod?.rating)].map(star =>{return <FaStar key={Math.random().toString(16).slice(2)} color="orange" size={15}/>})}</span> :<span>No rated</span>}
                        <figure>
                          <img src={prod.images} width='250px' height='250px' alt="productpic"/>
                        </figure>
                      </Link>
                      <div className="wishlist__price">
                        <div>
                          {prod.discount ? 
                            <> 
                                <span className="full-price" >$ {Number(prod.price?.toFixed(2))}</span>
                                <span>$ {Number(prod.discounted_price?.toFixed(2))}</span>
                            </>
                            : <span>$ {Number(prod.price?.toFixed(2))}</span> }
                        </div>
                        <button onClick={()=>{deleteProduct(prod.id)}}>X</button>
                      </div>
                  </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Wishlist;
