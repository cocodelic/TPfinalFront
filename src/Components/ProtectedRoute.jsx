import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {

    const { isAuthenticated } = useContext(AuthContext)

    return (
        <>
            {isAuthenticated ? 
            <Outlet/> :
            <Navigate to={'/'}/>    
        }
        </>
    )
}

export default ProtectedRoute