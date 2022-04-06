import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoles, getAllUsers} from '../redux/actions';
import AdminSearchBar from './AdminSearchBar';
import swal from 'sweetalert';
import { FormattedMessage, useIntl} from 'react-intl'

export default function AdminEditRole({showComponent}) {
    const dispatch = useDispatch();
    const intl = useIntl();
    const loggedUser = useSelector(state => state.user)
    const users = useSelector(state => state.allUsers);

    const roles = useSelector(state => state.allRoles);
    useEffect(()=>{
        dispatch(getAllUsers());
        dispatch(getAllRoles());
    },[])

    const [role, setRole] = useState({});

    const editRole = async (userId) => {
        let token;
        if(localStorage.getItem('jwt')) token = localStorage.getItem('jwt');
        else if(sessionStorage.getItem('jwt')) token = sessionStorage.getItem('jwt');
        try {
            await axios.put('/user/role', {userId, role: role[Object.keys(role)[0]], token});
            swal({
                title: intl.formatMessage({ id: "message-change-role" }),
                text: ' ',
                icon: 'success',
                timer: 3000,
                button: null
            })
            showComponent('editRole');
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

    const handleSelect = (e) => {
        setRole({
            [e.target.name]:e.target.value
        });
    }

    return(
        <div className='adminSubComp'>
            <div className='componentTitle'><FormattedMessage id="app.edit-permissions" defaultMessage="Edit Users Permissions"/></div>
            <AdminSearchBar search='users' />
            <div className='tableHeader'><div><FormattedMessage id="app.name-prod" defaultMessage="Name"/></div>|<div><FormattedMessage id="app.user-name" defaultMessage="Username"/></div>|<div><FormattedMessage id="app.email-user" defaultMessage="Email"/></div>|<div><FormattedMessage id="app.role" defaultMessage="Role"/></div>|<div><FormattedMessage id="app.action" defaultMessage="Action"/></div></div>
            <div className='adminTable'>
                <ul>
                    {Array.isArray(users) ? users?.map(user => <li className='itemList' key={user.id}>
                        <div>{user.name} {user.last_name}</div>
                        <div>{user.username}</div>
                        <div>{user.email}</div>
                        <div>
                            <select disabled={loggedUser?.roleId !== 1} name={user.id} onChange={handleSelect} value={role[user.id]}>
                                <option value={user.role?.name} hidden>{user.role?.name}</option>
                                {roles?.map(role => <option disabled={role.id === 1} key={role.id} value={role.id}>{role.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <button onClick={e => editRole(user.id)} disabled={loggedUser?.roleId !== 1} className='adminCP__button'><FormattedMessage id="app.set-role" defaultMessage="Set Role"/></button>
                        </div>
                        </li>) : <div className='noDataFound'>{users}</div>}
                </ul>
            </div>
        </div>
    )
}
