import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/actions';
import AdminSearchBar from './AdminSearchBar';

export default function AdminUsersList({getId, showComponent}) {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.user)
    const users = useSelector(state => state.allUsers);
    useEffect(()=>{
        dispatch(getAllUsers());
    },[])

    const forceResetPassword = (userId) => {
        alert('Se reseteó la password del usuario');
    }

    const editUser = (userId) => {
        getId(userId);
        showComponent('editUser');
    }

    const deleteUser = async (userId) => {
        let token;
        console.log(userId);
        if(localStorage.getItem('jwt')) token = localStorage.getItem('jwt');
        else if(sessionStorage.getItem('jwt')) token = sessionStorage.getItem('jwt');
        const response = await axios.delete('http://localhost:3001/user', {data: {token, userId}});
        if(response.status === 200) alert(response.data);
        dispatch(getAllUsers());
    }

    return(
        <div className='adminSubComp'>
            <div className='componentTitle'>Users Management</div>
            <AdminSearchBar search='users' />
            <div className='tableHeader'><div>Name</div>|<div>Username</div>|<div>Email</div>|<div>Role</div>|<div>Action</div></div>
            <div className='adminTable'>
                <ul>
                    {Array.isArray(users) ? users?.map(user => <li className='itemList' key={user.id}>
                        <div>{user.name} {user.last_name}</div>
                        <div>{user.username}</div>
                        <div>{user.email}</div>
                        <div>{user.role.name}</div>
                        <div>
                            <button onClick={e => forceResetPassword(user.id)} disabled={loggedUser?.roleId === 2 && user.roleId === 1} className='adminCP__button'>Reset Password</button>
                            <button onClick={e => editUser(user.id)} disabled={(loggedUser?.roleId === 2 && user.roleId === 1) || (loggedUser?.roleId === 2 && user.roleId === 2)} className='adminCP__button'>Edit</button>
                            <button onClick={e => deleteUser(user.id)} disabled={(loggedUser?.roleId === 2 && user.roleId === 1) || (loggedUser?.roleId === 2 && user.roleId === 2)} className='adminCP__button'>Delete</button>
                        </div>
                        </li>) : <div className='noDataFound'>{users}</div>}
                </ul>
            </div>
        </div>
    )
}
