import { Routes, Route } from 'react-router-dom';
import './App.css';
import SearchPage from "./pages/SearchPage";
import AccountPage from "./pages/AccountPage";
import SignUpPage from "./pages/SignUpPage";
import LoginInPage from "./pages/LogInPage";
import VerifyPage from "./pages/VerifyPage";
import PasswordResetPage from "./pages/PasswordResetPage";

function App() {
  return (
      <div className="main">
          <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginInPage/>} />
              <Route path="/verify" element={<VerifyPage/>} />
              <Route path="/resetPassword" element={<PasswordResetPage/>} />
          </Routes>
      </div>
  );
}

export default App;
