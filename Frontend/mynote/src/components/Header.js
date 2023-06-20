import { useState } from "react";
import { ReactComponent as DarkMode } from '../assets/DarkMode.svg'

const Header = (props) => {

    const [theme, setTheme] = useState(false)

    const handleTheme = () => {
        setTheme((currentTheme) => !currentTheme);
        props.onChangeTheme(!theme);
    }

    return (
        <div className="app-header">
            <h1>{props.title}</h1>
            <DarkMode className="theme-button" onClick={handleTheme}></DarkMode>
            {/* <button >test</button> */}
       
        </div>
    )
}

export default Header
