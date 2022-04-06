import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/actions';
import AdminSearchBar from './AdminSearchBar';
import swal from 'sweetalert';
import { FormattedMessage, useIntl } from 'react-intl'

export default function AdminUsersList({getId, showComponent}) {
    const dispatch = useDispatch();
    const intl = useIntl();
    const loggedUser = useSelector(state => state.user)
    const users = useSelector(state => state.allUsers);
    useEffect(()=>{
        dispatch(getAllUsers());
    },[])

    const forceResetPassword = (userId) => {
        try {
            swal({
                title: intl.formatMessage({ id: "message-reset-pass" }),
                text: intl.formatMessage({ id: "message-text-disc" }),
                icon: 'warning',
                buttons: ['No', intl.formatMessage({ id: "message-yes" })]
            }).then(async (result) => {
                if (result) {
                await axios.put('/password/reset', {userId});
                swal({
                        title: intl.formatMessage({ id: "message-reset-forced" }),
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

    const editUser = (userId) => {
        getId(userId);
        showComponent('editUser');
    }

    const deleteUser = async (userId) => {
        let token;
        if(localStorage.getItem('jwt')) token = localStorage.getItem('jwt');
        else if(sessionStorage.getItem('jwt')) token = sessionStorage.getItem('jwt');
        try {
            swal({
                title: intl.formatMessage({ id: "message-delete-user-quest" }),
                text: intl.formatMessage({ id: "message-text-disc" }),
                icon: 'warning',
                buttons: ['No', intl.formatMessage({ id: "message-yes" })]
            }).then(async (result) => {
                if (result) {
                    await axios.delete('/user', {data: {token, userId}});
                    swal({
                        title: intl.formatMessage({ id: "message-delete-user" }) + userId,
                        text: ' ',
                        icon: 'success',
                        timer: 2000,
                        button: null
                    })
                    dispatch(getAllUsers());
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

    return(
        <div className='adminSubComp'>
            <div className='componentTitle'><FormattedMessage id="app.manage-users" defaultMessage="Users Management"/></div>
            <AdminSearchBar search='users' />
            <div className='tableHeader'><div><FormattedMessage id="app.name-prod" defaultMessage="Name"/></div>|<div><FormattedMessage id="app.user-name" defaultMessage="Username"/></div>|<div><FormattedMessage id="app.email-user" defaultMessage="Email"/></div>|<div><FormattedMessage id="app.role" defaultMessage="Role"/></div>|<div><FormattedMessage id="app.action" defaultMessage="Action"/></div></div>
            <div className='adminTable'>
                <ul>
                    {Array.isArray(users) ? users?.map(user => <li className='itemList' key={user.id}>
                        <div>{user.name} {user.last_name}</div>
                        <div>{user.username}</div>
                        <div>{user.email}</div>
                        <div>{user.role?.name}</div>
                        <div>
                            <button onClick={e => forceResetPassword(user.id)} disabled={loggedUser?.roleId === 2 && user?.roleId === 1} className='adminCP__button'><FormattedMessage id="app.reset-pass" defaultMessage="Reset Password"/></button>
                            <button onClick={e => editUser(user.id)} disabled={(loggedUser?.roleId === 2 && user?.roleId === 1) || (loggedUser?.roleId === 2 && user.roleId === 2)} className='adminCP__button'><FormattedMessage id="app.btn-edit" defaultMessage="Edit"/></button>
                            <button onClick={e => deleteUser(user.id)} disabled={(loggedUser?.roleId === 2 && user?.roleId === 1) || (loggedUser?.roleId === 2 && user.roleId === 2)} className='adminCP__button'><FormattedMessage id="app.btn-delete" defaultMessage="Delete"/></button>
                        </div>
                        </li>) : <div className='noDataFound'>{users}</div>}
                </ul>
            </div>
        </div>
    )
}
