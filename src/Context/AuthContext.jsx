import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext() 

export const AuthProvider = ({children}) => {

    const navigate = useNavigate()

    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(sessionStorage.getItem('accessToken')))

    useEffect(
        () =>{
            Boolean(sessionStorage.getItem('access_token')) && setIsAuthenticated(true)
        },
        []
    )

    const login = (accessToken) => {
        sessionStorage.setItem('accessToken', accessToken)
        setIsAuthenticated(true)
        navigate('/myProducts')
    }

    const logout = () => {
        if(confirm('¿Quiere cerrar sesión?')){
        sessionStorage.removeItem('accessToken')
        setIsAuthenticated(false)
        navigate('/')
        }else{
            return
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated,
            login: login,
            logout: logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
