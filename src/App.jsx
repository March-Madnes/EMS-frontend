import { Route, Routes } from "react-router-dom";
import './App.css'
import { Landing } from "./pages/Landing";
import Login from "./pages/Login";
import { Dash } from "./pages/Dash";
import { AuthProvider } from "./services/AuthContext";
import ProtectedRoute from "./services/ProtectedRoute";

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dash />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
};

export default App;