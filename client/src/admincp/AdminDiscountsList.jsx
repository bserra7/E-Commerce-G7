import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiscounts } from '../redux/actions';
import swal from 'sweetalert';

export default function AdminDiscountsList({showComponent, getId}) {
    const dispatch = useDispatch();
    const discounts = useSelector(state => state.discounts);

    useEffect(()=>{
        dispatch(getAllDiscounts());
    },[])

    const setDiscount = () => {
        showComponent('setDiscounts')
    }

    const deleteDiscount = async (categoryId) => {
        let token;
        if(localStorage.getItem('jwt')) token = localStorage.getItem('jwt');
        else if(sessionStorage.getItem('jwt')) token = sessionStorage.getItem('jwt');
        try {
            swal({
                title: 'Do you want delete that discount?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                buttons: ['No','Yes']
            }).then(async (result) => {
                if (result) {
                    await axios.delete('/discount', {data: {categoryId, token}});
                    swal({
                        title: 'You deleted the selected Discount',
                        text: ' ',
                        icon: 'success',
                        timer: 2000,
                        button: null
                    })
                    dispatch(getAllDiscounts());
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

    return(
        <div className='adminSubComp'>
            <div className='componentTitle'>Discount Management<button onClick={setDiscount} className='componentTitle__button'>Set new Discount</button></div>
            <div className='tableHeader'><div>Category</div>|<div>Discount</div>|<div>Weekday</div>|<div>End Date</div>|<div>Action</div></div>
            <div className='adminTable'>
                <ul>
                    {Array.isArray(discounts) ? discounts?.map(discount => <li className='itemList' key={discount?.categoryId}>
                        <div>{discount?.category?.name}</div>
                        <div>{discount?.discount} %</div>
                        <div>{discount?.weekday}</div>
                        <div>N/A</div>
                        <div>
                            <button onClick={e => deleteDiscount(discount.categoryId)}className='adminCP__button'>Delete</button>
                        </div>
                        
                        </li>) : <div className='noDataFound'>{discounts}</div>}
                </ul>
            </div>
        </div>
    )
}
