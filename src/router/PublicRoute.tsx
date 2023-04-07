import React, { } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { TOKEN_KEY } from '../constants/appconstants';

const PublicRoute = () => {
    const accessToken = localStorage.getItem(TOKEN_KEY);

    return !accessToken ? <Outlet /> : <Navigate to="/home" />;
}
export default PublicRoute