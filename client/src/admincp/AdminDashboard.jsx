import React from 'react';
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux';


export default function AdminDashboard() {
    const user = useSelector(state => state.user);
    return(
        <div className='adminSubComp'>
            <div className='componentTitle'><FormattedMessage id="app.dashboard" defaultMessage="Dashboard Admin CP"/></div>
            <div className='adminTable'>
                <div className='adminSubComp__welcome'>
                    <span><FormattedMessage id="app.dashboard-hi" defaultMessage="Hi, "/> {user?.name}<FormattedMessage id="app.dashboard-welcome" defaultMessage=". Welcome!"/></span>
                    <span><FormattedMessage id="app.dashboard-manage" defaultMessage="Here you can manage all system function"/></span>
                </div>
            </div>

        </div>
    )
}
