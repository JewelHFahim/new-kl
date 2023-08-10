import  { createContext, useState } from "react";

export const ThemeContext = createContext();

const AppContext = ({ children }) => {

    const [isDarkmode, setIsDarkmode] = useState(true);


    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
  


    const authInfo = {  isDarkmode, setIsDarkmode, isOpen, toggleDrawer };

    return (
        <ThemeContext.Provider value={authInfo}>{children}</ThemeContext.Provider>
    );
};

export default AppContext;