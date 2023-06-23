import { createContext, useState, useEffect } from "react";


const AuthContext = createContext();


export default AuthContext;

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [authTokens, setAuthTokens] = useState(null)

    const loginUser = async (e) => {
        e.preventDefault()
        console.log("Submited")
        // let res =  fetch('http://127.0.0.1:8000/api/token/', {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         "username": e.username,
        //         "password": e.password,
        //     })
        // }
        // )
    }

    const contextData = {
        loginUser: loginUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}