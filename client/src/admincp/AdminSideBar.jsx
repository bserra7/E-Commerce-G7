import React from 'react';
import { useSelector } from 'react-redux';
import useUser from '../components/Login/hooks/useUser';

export default function AdminSideBar({showComponent}){
    const user = useSelector(state => state.user);
    const { logout } = useUser();
    return(
        <div><div className="area"></div><nav className="main-menu">
        <ul>
            <li onClick={e => showComponent('dashboard')}>
                <i className="fa fa-home fa-2x"></i>
                <span className="nav-text">Dashboard</span>
            </li>
            <li onClick={e => showComponent('users')} className="has-subnav">
                <i className="fa fa-laptop fa-2x"></i>
                <span className="nav-text">Users</span>             
            </li>
            <li onClick={e => showComponent('products')} className="has-subnav">
                <i className="fa fa-list fa-2x"></i>
                <span className="nav-text">Products</span>              
            </li>
            <li onClick={e => showComponent('orders')} className="has-subnav">
                <i className="fa fa-folder-open fa-2x"></i>
                <span className="nav-text">Orders</span>               
            </li>
            {user?.roleId === 1 && 
            <li onClick={e => showComponent('editRole')}>
                <i className="fa fa-bar-chart-o fa-2x"></i>
                <span className="nav-text">Edit roles</span>
            </li>}
            {/* <li onClick={e => showComponent('viewEmails')}>
                <i className="fa fa-font fa-2x"></i>
                <span className="nav-text">Email</span>
            </li> */}
            <li onClick={e => showComponent('discounts')}>
                <i className="fa fa-table fa-2x"></i>
                <span className="nav-text">Discounts</span>
            </li>
            <li onClick={e => showComponent('stores')}>
                <i className="fa fa-map-marker fa-2x"></i>
                <span className="nav-text">Physical Stores</span>
            </li>
            {/*<li>
                <i className="fa fa-info fa-2x"></i>
                <span className="nav-text">Documentation</span>
            </li> */}
        </ul>

        <ul className="logout">
            <li onClick={logout}>
                     <i className="fa fa-power-off fa-2x"></i>
                    <span className="nav-text">
                        Logout
                    </span>
            </li>  
        </ul>
    </nav></div>
    )
}