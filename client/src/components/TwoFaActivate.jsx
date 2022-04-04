import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import { getUserDetail, userLogin, verifyTwoFA } from "../redux/actions";

export default function TwoFaActivate(){
    const dispatch = useDispatch();
    const userLogged = useSelector(state => state.user);
    const userDetail = useSelector(state => state.userDetail)

    useEffect(()=> {
        dispatch(getUserDetail(userLogged?.id))
    },[])

    useEffect(()=> {
        dispatch(userLogin(userDetail))
    },[userDetail])

    const handle2FA = async (boolean) => {
        try {
            const response = await axios.put('/twofa', {action: 'set', userId: userLogged?.id, two_fa: boolean})
            if(response.status === 200 && boolean === true) {
                swal({
                  title: '2FA Activated!',
                  text: 'You have been set 2FA successfully!',
                  icon: 'success',
                  timer: 3000,
                  button: null
                })
            } else if(response.status === 200 && boolean === false) {
                swal({
                    title: '2FA Deactivated!',
                    text: 'You have been deactivated 2FA!',
                    icon: 'warning',
                    timer: 3000,
                    button: null
                  })
            }
            dispatch(verifyTwoFA());
            dispatch(getUserDetail(userLogged?.id));
        } catch (error) {
            swal({
                title: 'Something went wrong',
                text: 'Check console to know more about error',
                icon: 'error',
                timer: 3000,
                button: null
              })
        }

    }
    
    return(
        <>
        {!userDetail?.is_two_fa ? 
            <button className="userAccount__button" onClick={e => handle2FA(true)}>Activate 2FA</button>
        :
            <button className="userAccount__button" onClick={e => handle2FA(false)}>Deactivate 2FA</button>}
        </>
    )
}
