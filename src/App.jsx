import { Route, Routes } from "react-router-dom";
import './App.css'
import { Landing } from "./pages/Landing";
import Login from "./pages/Login";
import { Dash } from "./pages/Dash";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dash />} />
    </Routes>
  );
};

export default App;