import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const RoleBasedRoutes = ({children, requiredRole}) => {
    const {user, loading} = useAuth()

    if(loading) {
        return <div>Loading ....</div>
    }

    // if(!user) {
    //     return <Navigate to="/login" />
    // }

    // Checks if the user role is authorized
    if(!requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized"/>
    }

    // Checks if the user exists
    return user ? children: <Navigate to="/login" />
    // return children
}

export default RoleBasedRoutes
