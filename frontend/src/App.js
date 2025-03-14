import { Routes, Route } from 'react-router-dom';
import './App.css';
import SearchPage from "./pages/SearchPage";
import AccountPage from "./pages/AccountPage";
import SignUpPage from "./pages/SignUpPage";
import LoginInPage from "./pages/LogInPage";
import VerifyPage from "./pages/VerifyPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import {AuthProvider} from "./utils/auth";
import {RequireAuth} from "./components/RequireAuth";

function App() {
  return (
      <AuthProvider>
          <div className="main">
              <Routes>
                  <Route path="/" element={<SearchPage />} />
                  <Route path="/account" element={<RequireAuth><AccountPage /></RequireAuth>} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/login" element={<LoginInPage/>} />
                  <Route path="/verify" element={<VerifyPage/>} />
                  <Route path="/resetPassword" element={<PasswordResetPage/>} />
              </Routes>
          </div>
      </AuthProvider>
  );
}

export default App;
