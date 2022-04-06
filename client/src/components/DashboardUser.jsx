import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import useUser from './Login/hooks/useUser';
import UserAccount from './UserAccount';
import { FormattedMessage } from 'react-intl';


export function DashboardUser(){

    const history = useHistory()

    const { isLogged } = useUser();

    useEffect(() => {
        if(!isLogged) history.push('/')
    },[])

    return (
        <>
        <nav className='dashboardUser'>
            <div className='container'>
                <li className='dashboardUser__item'>
                    <NavLink to="/user/account/profile"
                        activeClassName='active'
                        className="dashboardUser__link"><FormattedMessage id="app.profile" defaultMessage="Profile"/></NavLink>
                </li>
                <li className='dashboardUser__item'>
                    <NavLink to="/user/account/orders"
                        activeClassName='active' className="dashboardUser__link"> <FormattedMessage id="app.view-order" defaultMessage="View Orders"/></NavLink>
                </li>
                <li className='dashboardUser__item'>
                    <NavLink to='/user/account/reset-password'
                        activeClassName='active' className="dashboardUser__link"><FormattedMessage id="app.change-password" defaultMessage="Change Password"/></NavLink>
                </li>
                <li className='dashboardUser__item'>
                    <NavLink to='/user/account/wishlist'
                        activeClassName='active' className="dashboardUser__link"><FormattedMessage id="app.wishlist" defaultMessage="My Wishlist"/></NavLink>
                </li>
            </div>
        </nav>
        {history.location.pathname === "/user/account" && <UserAccount />}
        </>
    )
}
export default DashboardUser;