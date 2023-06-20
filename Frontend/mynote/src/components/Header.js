import { useState } from "react";


const Header = (props) => {

    const [theme, setTheme] = useState(false)

    const handleTheme = () => {
        setTheme((currentTheme) => !currentTheme);
        props.onChangeTheme(!theme);
    }

    return (
        <div className="app-header">
            <h1>{props.title}</h1>
            <button onClick={handleTheme}>test</button>
        </div>
    )
}

export default Header
