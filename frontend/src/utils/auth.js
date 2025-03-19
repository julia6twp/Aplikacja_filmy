import {createContext, useContext, useState} from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState(null);

    const login = (userData) => {
        setUser(userData)
        // setEmail(userData.email);
    }
    const logout = () =>{
        setUser(null)
    }

    const register = async (login, email, password) => {
        try {
            const response = await fetch("http://localhost:8080/account/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login, email, password }),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            const userData = await response.json();

            // Wyślij kod weryfikacyjny na e-mail
            const mailResponse = await fetch(`http://localhost:8080/mail/send/${email}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });

            if (!mailResponse.ok) {
                throw new Error("Failed to send verification email");
            }

            return userData;
        } catch (error) {
            console.error("Error during registration:", error);
            return null;
        }
    };

    const updateLogin = (newLogin) => {
        setUser(prevUser => ({ ...prevUser, login: newLogin }));
        localStorage.setItem("user", JSON.stringify({ ...user, login: newLogin }));
    };

    return (
        <AuthContext.Provider value={{ user, email, login, logout, register ,updateLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext)
}