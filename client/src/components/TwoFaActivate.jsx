import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import { getUserDetail, userLogin, verifyTwoFA } from "../redux/actions";
import { FormattedMessage, useIntl } from 'react-intl'

export default function TwoFaActivate(){
    const dispatch = useDispatch();
    const intl = useIntl();
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
                  title: intl.formatMessage({ id: "message-active" }),
                  text: intl.formatMessage({ id: "message-active-success" }),
                  icon: 'success',
                  timer: 3000,
                  button: null
                })
            } else if(response.status === 200 && boolean === false) {
                swal({
                    title: intl.formatMessage({ id: "message-deactive" }),
                    text: intl.formatMessage({ id: "message-deactive-success" }),
                    icon: 'warning',
                    timer: 3000,
                    button: null
                  })
            }
            dispatch(verifyTwoFA());
            dispatch(getUserDetail(userLogged?.id));
        } catch (error) {
            swal({
                title: intl.formatMessage({ id: "message-error" }),
                text:  intl.formatMessage({ id: "message-error-check" }),
                icon: 'error',
                timer: 3000,
                button: null
              })
        }

    }
    
    return(
        <>
        {!userDetail?.is_two_fa ? 
            <button className="userAccount__button" onClick={e => handle2FA(true)}><FormattedMessage id="app.active" defaultMessage="Activate 2FA"/></button>
        :
            <button className="userAccount__button" onClick={e => handle2FA(false)}><FormattedMessage id="app.deactive" defaultMessage="Deactivate 2FA"/></button>}
        </>
    )
}
