import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


export default AuthContext;


export const AuthProvider = ({children}) => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)


    const navigate = useNavigate()

    const registerUser = async (e) => {
        e.preventDefault()

        try {
            let res = await fetch('http://127.0.0.1:8000/api/register/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": e.target.username.value,
                    "email": e.target.email.value,
                    "password": e.target.password.value,
                })
            })
            let data = await res.json();

            if (res.ok) {
                navigate('/login');
            } else if (res.status !== 400) {
                alert('Something went wrong or the server is down. Please report the issue.');
            } else {
                alert(data.response);
            }   
        }
        catch (err) {
            alert('Something went wrong or the server is down.');
        }
    }

    const loginUser = async (e) => {
        e.preventDefault()
        console.log(
            {
                "username": e.target.username.value,
                "password": e.target.password.value,
            }
        )

        try {

            let res = await fetch('http://127.0.0.1:8000/api/token/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": e.target.username.value,
                    "password": e.target.password.value,
                })
            })
    
            let data = await res.json();
            if (res.status === 200) {
                setAuthTokens(data)
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate('/');
            } else {
                alert('Something went wrong.');
            }
        }
        catch (err) {
            alert('Something went wrong or the server is down.');
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login')
    }

    const updateToken = async () => {
        console.log('Token Updated.')

        try {
            let res = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "refresh": authTokens.refresh,
                })
            })
            let data = await res.json();
    
            if (res.status === 200) {
                setAuthTokens(data)
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
            } else {
                logoutUser();
            }
        }
        catch (err) {
            alert('Something went wrong or the server is down.');
        }

    }

    const contextData = {
        user:user,
        registerUser: registerUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }


    useEffect(() => {

        let fourMinutes = 1000 * 60* 5
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}