import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext()

const UserContextProvider = ({children}) => {

    const [count, setCount] = useState(0) //preguntar a mati q es mejor, si setear el access_token por sessionstorage o por contexto



    return (
        <UserContext.Provider value={{
            count: count,
            setCount: setCount
        }}>
            {children}
        </UserContext.Provider>
    )
    
}

export const useUserContext = () => useContext(UserContext)


export default UserContextProvider