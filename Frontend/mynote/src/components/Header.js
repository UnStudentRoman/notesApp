import { useState } from "react";


const Header = () => {

    const [theme, setTheme] = useState(false)

    const handleTheme = () => {
        if (theme) {
          setTheme(!theme);
          console.log(theme)
          return theme;
      } else {
          setTheme(!theme);
          console.log(theme)
          return theme;
      }
    }

    return (
        <div className="app-header">
            <h1>Note List</h1>
            <p onClick={handleTheme}>test{theme}</p>
        </div>
    )
}

export default Header