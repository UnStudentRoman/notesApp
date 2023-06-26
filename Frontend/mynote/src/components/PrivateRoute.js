import { Route, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoutes = () => {
    let {user} = useContext(AuthContext)
    let auth = {'token': true};

    return(
        user ? <Outlet /> : <Navigate to='/login'/>
    )
}

export default PrivateRoutes