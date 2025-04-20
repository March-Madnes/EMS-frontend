import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Landing } from "./pages/Landing";
import EvReport from "./pages/EvReport";
import Login from "./pages/Login";
import { Dash } from "./pages/Dash";
import { AuthProvider } from "./services/AuthContext";
import ProtectedRoute from "./services/ProtectedRoute";
import Tools from "./pages/Tools";
import TemplateReact from "./pages/Visual";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/evidences"
          element={
            <ProtectedRoute>
              <Dash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tools"
          element={
            <ProtectedRoute>
              <Tools />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report/:id"
          element={
            <ProtectedRoute>
              <EvReport />
            </ProtectedRoute>
          }
        />
        <Route path="/visual/:id" element={<TemplateReact/>}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
