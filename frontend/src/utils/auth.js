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

    const updateEmail = (newEmail) => {
        setUser((prevUser) => ({ ...prevUser, email: newEmail }));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateEmail }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext)
}