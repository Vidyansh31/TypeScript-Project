import "./App.css";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./Components/ProtectedRoute.tsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home/*" element={<PrivateRoutes/>}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
