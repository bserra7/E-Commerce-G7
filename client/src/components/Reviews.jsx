import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {FaStar} from 'react-icons/fa'
import { clearReviews, getAllUsers, getReviews } from "../redux/actions";

export default function Reviews({id}) {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews);
   
    const users = useSelector((state) => state.allUsers);
 
   
   useEffect(() => {
       dispatch(getAllUsers());
       return () => {
           dispatch(clearReviews());
        }
    },[])

    useEffect(()=> {
        dispatch(getReviews(id));
    },[dispatch])
 
    return (
        <div className='reviews'>
            <p className="reviews__title">Reviews :</p> 
            {reviews?.length > 0 ? reviews?.map((review) => {
                const user = users.find(user => user?.id === review?.userId);
                return <div key={review.id}>
                            <p className="reviews__name"><span>User: </span> {user?.name} {user?.last_name} ({user?.username})</p>
                            <span>Rating: </span> {[...Array(review?.rate)].map(star =>{return <FaStar color="orange" size={15}/>}) }
                            <p className="reviews__comment"><span>Comment: </span><div>{review?.comment}</div></p>
                        </div>}) : <p>No reviews yet</p>}
        </div>
    )
}
