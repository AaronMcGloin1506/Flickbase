import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SideDrawer from './sideNavigation';
import { showToast } from '../../utils/tools';
import { clearNotifications } from '../../store/actions/index';
import { signOut } from '../../store/actions/users_actions';
import { appLayout } from '../../store/actions/site_actions'
import Dashboard from '../dashboard';


const Header = (props) => {

    const [layout,setLayout] = useState('');
    const notifications = useSelector(state=>state.notifications);
    const users = useSelector(state=>state.users);
    const dispatch = useDispatch();

    const signOutUser = () => {
        dispatch(signOut())
        props.history.push('/')
    }

    useEffect(()=>{
        let pathArray = props.location.pathname.split('/');
        if(pathArray[1]==="dashboard"){
            setLayout('dash_layout')
            dispatch(appLayout("dash_layout"))
        } else {
            setLayout('')
            dispatch(appLayout(''))
        }
        
    },[props.location.pathname,dispatch])

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
            <nav className={`navbar fixed-top ${layout}`}>
                <Link style={{fontFamily:'Fredoka One'}} to="/"
                    className="navbar-brand d-flex align-items-center"
                >
                    Flickbase
                </Link>
                <SideDrawer users={users} signOutUser={signOutUser}/>
            </nav>
        </>
    );
}

// withRouter helps when component is outside of Switch/Route
export default withRouter(Header);