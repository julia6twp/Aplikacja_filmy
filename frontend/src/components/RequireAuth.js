import {useAuth} from "../utils/auth";
import {Navigate} from "react-router-dom";

export const RequireAuth =({children})=>{
    const auth = useAuth()// Uzyskanie dostępu do kontekstu autentykacji
    // Jeśli użytkownik nie jest zalogowany (auth.user jest null), przekierowanie do strony logowania
    if(!auth.user){
        return <Navigate to='/login'/>
    }
    // Jeśli użytkownik jest zalogowany, renderowanie przekazanych dzieci (content)
    return children
}