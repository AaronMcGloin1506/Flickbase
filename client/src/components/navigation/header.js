import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SideDrawer from './sideNavigation';
import { showToast } from '../../utils/tools';


const Header = (props) => {

    const notifications = useSelector(state=>state.notifications)
    // useEffect is listening to notification which is listening to state.notification for a change of state
    useEffect(()=>{
        if(notifications && notifications.error){
            const msg = notifications.msg ? notifications.msg : 'Error'
            showToast('ERROR',msg)
        }
        if(notifications && notifications.success){
            const msg = notifications.msg ? notifications.msg : 'Success'
            showToast('SUCCESS',msg)
        }
    },[notifications])

    return(
        <>
            <nav className="navbar fixed-top">
                <Link style={{fontFamily:'Fredoka One'}} to="/"
                    className="navbar-brand d-flex align-items-center"
                >
                    Flickbase
                </Link>
                <SideDrawer />
            </nav>
        </>
    );
}

// withRouter helps when component is outside of Switch/Route
export default withRouter(Header);