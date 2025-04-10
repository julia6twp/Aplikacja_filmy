import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";  // Importowanie axios do wykonywania zapytań HTTP


const AuthContext = createContext(null) // Tworzenie kontekstu autentykacji

export const AuthProvider = ({children}) => {
    const [error, setError] = useState("");

    const [user, setUser] = useState(() => {
        // Pobieranie użytkownika z sessionStorage podczas inicjalizacji
        const savedUser = sessionStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {  // Efekt, który będzie wywoływany, gdy użytkownik się zmieni (aktualizacja stanu)
    }, [user]);
    // Funkcja logowania - zapisuje użytkownika do stanu i sessionStorage
    const login = (userData) => {
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
    };
    // Funkcja wylogowywania - usuwa użytkownika ze stanu i sessionStorage
    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("user");
    };
    // Funkcja rejestracji użytkownika - wysyła dane na backend, zapisuje w sessionStorage, wysyła e-mail z kodem weryfikacyjnym
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

            // Wysyłanie kodu weryfikacyjnego na e-mail
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

            return userData; // Zwrócenie danych użytkownika po rejestracji
        } catch (error) {
            console.error("Error during registration:", error);
            return null;
        }
    };
    // Funkcja do zmiany loginu - wysyła zapytanie na backend i aktualizuje dane użytkownika
    const updateLogin = async (newLogin) => {
        if (!user) return Promise.reject(new Error("User not logged in")); // Sprawdzenie, czy użytkownik jest zalogowany

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

            // Aktualizacja stanu i zapisanie danych w sessionStorage
            setUser(updatedUser);
            sessionStorage.setItem("user", JSON.stringify(updatedUser));

            return updatedUser;
        } catch (error) {
            console.error("Error updating username:", error);
            return Promise.reject(error);
        }
    };
// Funkcja do zmiany hasła - wysyła zapytanie na backend z danymi starego i nowego hasła
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
        // Dostarcza kontekst AuthContext, aby inne komponenty mogły go używać
        <AuthContext.Provider value={{ user, login, logout, register ,updateLogin, changePassword }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext) // Hook do dostępu do kontekstu
}