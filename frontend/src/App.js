import { Routes, Route } from 'react-router-dom';
import './App.css';
import SearchPage from "./pages/SearchPage";

function App() {
  return (
      <div className="main">
          <h1>Find your movie</h1>
          <Routes>
              <Route path="/" element={<SearchPage />} />
          </Routes>
      </div>
  );
}

export default App;
