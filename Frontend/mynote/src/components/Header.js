import { useState } from "react";
import { ReactComponent as DarkMode } from '../assets/DarkMode.svg'
import { Link } from "react-router-dom";
import PrivateRoute from '../components/PrivateRoute'

const Header = (props) => {

    const [theme, setTheme] = useState(false)

    const handleTheme = () => {
        setTheme((currentTheme) => !currentTheme);
        props.onChangeTheme(!theme);
    }

    return (
        <div className="app-header">
            <h1>{props.title}</h1>
            <div>
                <Link to='/login'>test</Link>
                <DarkMode   Mode className="theme-button" onClick={handleTheme}></DarkMode>
            </div>
       
        </div>
    )
}

export default Header
