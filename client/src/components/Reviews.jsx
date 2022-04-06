import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {FaStar} from 'react-icons/fa'
import { FormattedMessage, useIntl } from 'react-intl'
import { clearStore, getAllUsers, getProductDetail, getReviews } from "../redux/actions";
import axios from "axios";
import swal from 'sweetalert';

export default function Reviews({ id }) {
    const dispatch = useDispatch();
    const intl = useIntl();
    const reviews = useSelector((state) => state.reviews);

    const users = useSelector((state) => state.allUsers);
    const userLogged = useSelector((state) => state.user);


    useEffect(() => {
        dispatch(getAllUsers());
        return () => {
            dispatch(clearStore("reviews"));
        }
    }, [])

    useEffect(() => {
        dispatch(getReviews(id));
    }, [dispatch])

    const deleteReview = async (userId, productId) => {
        const response = await axios.delete('/review', { data: { userId, productId } });
        if (response.status === 200) {
            swal({
                title: intl.formatMessage( { id: "message-delete-review" }),
                text: ' ',
                icon: 'success',
                timer: 3000,
                button: null
            })
            dispatch(getReviews(id));
            dispatch(getProductDetail(id));
        }
    }

    return (
        <div className='reviews'>
            <p className="reviews__title"><FormattedMessage id="app.reviews" defaultMessage="Reviews:"/></p> 
            {reviews?.length > 0 ? reviews?.map((review) => {
                const user = users.find(user => user?.id === review?.userId);
                return <div className="review" key={review.id}>
                            <div className="reviews__name"><span><FormattedMessage id="app.user-review" defaultMessage="User: " /></span> {user?.name} {user?.last_name} ({user?.username}) {review?.userId === userLogged?.id && <button className="reviews__btn" onClick={e => deleteReview(review?.userId, review?.productId)}><FormattedMessage id="app.btn-delete" defaultMessage="Delete"/></button>}</div>
                            <div><span><FormattedMessage id="app.rating" defaultMessage="Rating:"/></span> {[...Array(review?.rate)].map(star =>{return <FaStar key={Math.random().toString(16).slice(2)} color="orange" size={15}/>})}</div>
                            <div className="reviews__comment"><span><FormattedMessage id="app.comment" defaultMessage="Comment: "/></span><span className="comment">{review?.comment}</span></div>
                        </div>}) : <p><FormattedMessage id="app.no-reviews" defaultMessage="No reviews yet"/></p>}
        </div>
    )
}
