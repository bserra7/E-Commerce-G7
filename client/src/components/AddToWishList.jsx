import React, { useEffect, useState } from "react";
import HeartOne from "../assets/images/png-corazon-.png";
import HeartTwo from "../assets/images/corazon_con_fondo.png";
import axios from "axios";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../redux/actions";
import { useIntl } from "react-intl";

export function AddToWishList({ userId, productId }) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const id = useSelector((state) => state?.user?.id);
  const stateWishlist = useSelector((state) => state.wishlist);
  const stateDetail = useSelector((state) => state.details);

  const [adding, setAdding] = useState(false);

  const [wishlist, setWishlist] = useState();

  useEffect(() => {
    dispatch(getUserWishlist(id));
  }, []) // eslint-disable-line

  useEffect(() => {
    const resultSearch = stateWishlist?.find((el) => el.id === stateDetail?.id);
    if (resultSearch) setAdding(true);
    else return setAdding(false);
  }, [stateWishlist, stateDetail]); // eslint-disable-line

  useEffect(() => {
    setWishlist({
      userId: userId,
      productId: productId,
    });
  }, [stateWishlist]); // eslint-disable-line

  const handleSubmit = async () => {
    const response = await axios.post("/wishlist", wishlist);
    if (response.status === 200) {
      dispatch(getUserWishlist(id));
      setAdding(true);
      swal({
        title: intl.formatMessage({ id: "message-added" }),
        text: " ",
        icon: "success",
        timer: 3000,
        button: null,
      });
    } else {
      swal({
        title: intl.formatMessage({ id: "message-error" }),
        text: " ",
        icon: "error",
        timer: 3000,
        button: null,
      });
    }
  };

  const handleRemove = async () => {
    const response = await axios.delete("/wishlist", { data: wishlist });
    if (response.status === 200) {
      dispatch(getUserWishlist(id));
      setAdding(false);
      swal({
        title: intl.formatMessage({ id: "message-removed" }),
        text: " ",
        icon: "success",
        timer: 3000,
        button: null,
      });
    } else {
      swal({
        title: intl.formatMessage({ id: "message-error" }),
        text: " ",
        icon: "error",
        timer: 3000,
        button: null,
      });
    }
  };

  return (
    <div>
      {adding ? (
        <img
          src={HeartTwo}
          alt="added"
          width="40px"
          heigth="40px"
          onClick={handleRemove}
        />
      ) : (
        <img
          src={HeartOne}
          alt="added"
          width="36px"
          heigth="36px"
          onClick={handleSubmit}
        />
      )}
    </div>
  );
}

export default AddToWishList;
