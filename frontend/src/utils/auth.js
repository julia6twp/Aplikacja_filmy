import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [error, setError] = useState("");

    const [user, setUser] = useState(() => {
        // Pobieranie użytkownika z sessionStorage podczas inicjalizacji
        const savedUser = sessionStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
    }, [user]);

    const login = (userData) => {
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("user");
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch("http://localhost:8080/account/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                return;
            }

            const userData = await response.json();

            // Wyślij kod weryfikacyjny na e-mail
            const mailResponse = await fetch(`http://localhost:8080/mail/send/${email}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });

            if (!mailResponse.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                return;
            }

            return userData;
        } catch (error) {
            console.error("Error during registration:", error);
            return null;
        }
    };

    const updateLogin = async (newLogin) => {
        if (!user) return Promise.reject(new Error("User not logged in"));

        try {
            const response = await fetch("http://localhost:8080/account/newUsername", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    oldUsername: user.name,
                    newUsername: newLogin
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                return;
            }

            const updatedUser = await response.json();

            // Aktualizacja stanu i sessionStorage
            setUser(updatedUser);
            sessionStorage.setItem("user", JSON.stringify(updatedUser));

            return updatedUser;
        } catch (error) {
            console.error("Error updating username:", error);
            return Promise.reject(error);
        }
    };

    const changePassword = async (oldPassword, newPassword) => {
        if (!user) return Promise.reject(new Error("User not logged in"));

        try {
            const response = await axios.post("http://localhost:8080/account/newPassword", {
                username: user.email,
                oldPassword,
                newPassword
            });

            return response.data; // Zwraca dane użytkownika po zmianie
        } catch (error) {
            console.error("Error changing password:", error.response?.data || error.message);
            return Promise.reject(error.response?.data || "Failed to change password");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register ,updateLogin, changePassword }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext)
}