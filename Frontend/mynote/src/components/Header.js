import { useState, useContext } from "react";
import { ReactComponent as DarkMode } from '../assets/DarkMode.svg'
import { Link } from "react-router-dom";
import PrivateRoute from '../components/PrivateRoute'
import AuthContext from "../context/AuthContext";

const Header = (props) => {

    const {user, logoutUser} = useContext(AuthContext)
    const [theme, setTheme] = useState(false)

    const handleTheme = () => {
        setTheme((currentTheme) => !currentTheme);
        props.onChangeTheme(!theme);
    }

    return (
        <div className="app-header">
            <h1>{user && `${(user.username.charAt(0).toUpperCase() + user.username.slice(1))}'s`} {props.title}</h1>
            <div className='header-right-side'>
                { user ? (
                    <button onClick={logoutUser}>Logout</button>

                ) : <Link to='/login'>Login</Link> }
                
                <DarkMode   Mode className="theme-button" onClick={handleTheme}></DarkMode>

            </div>
       
        </div>
    )
}

export default Header
