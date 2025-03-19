import {createContext, useContext, useState} from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const login = (user) => {
        setUser(user)
    }
    const logout = () =>{
        setUser(null)
    }

    const updateLogin = (newLogin) => {
        setUser(prevUser => ({ ...prevUser, login: newLogin }));
        localStorage.setItem("user", JSON.stringify({ ...user, login: newLogin }));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext)
}