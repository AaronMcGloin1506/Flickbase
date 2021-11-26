import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SideDrawer from './sideNavigation';
import { showToast } from '../../utils/tools';
import { clearNotifications } from '../../store/actions/index';
import { signOut } from '../../store/actions/users_actions';


const Header = (props) => {

    const notifications = useSelector(state=>state.notifications)
    const dispatch = useDispatch();

    const signOutUser = () => {
        dispatch(signOut())
        props.history.push('/')
    }

    // useEffect is listening to notification which is listening to state.notification for a change of state
    useEffect(()=>{
        if(notifications && notifications.error){
            const msg = notifications.msg ? notifications.msg : 'Error'
            showToast('ERROR',msg);
            dispatch(clearNotifications())
        }
        if(notifications && notifications.success){
            const msg = notifications.msg ? notifications.msg : 'Success'
            showToast('SUCCESS',msg)
            dispatch(clearNotifications())
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
                <SideDrawer signOutUser={signOutUser}/>
            </nav>
        </>
    );
}

// withRouter helps when component is outside of Switch/Route
export default withRouter(Header);