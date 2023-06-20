import { useState } from "react";


export default function Theme() {

    const [theme, setTheme] = useState(false)
  
    const handleTheme = () => {
        if (theme) {
          setTheme((currentTheme) => !currentTheme);
          console.log(theme);
          return <div className='container'></div>
      } else {
          setTheme((currentTheme) => !currentTheme);
          console.log(theme);
          return <div className='container dark'></div>;
      }
    }

}