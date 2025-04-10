import { Routes, Route } from 'react-router-dom';
import './App.css';
import SearchPage from "./pages/SearchPage";
import AccountPage from "./pages/AccountPage";
import SignUpPage from "./pages/SignUpPage";
import LoginInPage from "./pages/LogInPage";
import VerifyPage from "./pages/VerifyPage";
import VerifyResetPage from "./pages/VerifyResetPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import {AuthProvider} from "./utils/auth";
import {RequireAuth} from "./components/RequireAuth";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import NewPasswordPage from "./pages/NewPasswordPage";

function App() {
  return (
      <AuthProvider>  {/* udostępnia kontekst uwierzytelnienia (auth) wszystkim komponentom potomnym */}
          <div className="main">
              <Routes>
                  <Route path="/" element={<SearchPage />} />
                  <Route path="/account" element={<RequireAuth><AccountPage /></RequireAuth>} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/login" element={<LoginInPage/>} />
                  <Route path="/verify" element={<VerifyPage/>} />
                  <Route path="/resetPassword" element={<PasswordResetPage/>} />
                  <Route path="/verifyReset" element={<VerifyResetPage/>} />
                  <Route path="/newPassword" element={<NewPasswordPage/>} />
                  <Route path="/movie/:id" element={<MovieDetailsPage />} />

              </Routes>
          </div>
      </AuthProvider>
  );
}

export default App;
