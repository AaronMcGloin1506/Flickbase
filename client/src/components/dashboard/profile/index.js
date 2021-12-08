import React from 'react';
import AdminLayout from '../../../hoc/adminLayout';
import AuthProfile from './authProfile';
import UserProfile from './profile';

const Profile = () => {
    return (
        <AdminLayout section="Profile">
            <AuthProfile />
            <UserProfile />
        </AdminLayout>
    )
}

export default Profile