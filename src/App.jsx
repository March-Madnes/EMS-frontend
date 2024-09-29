import { Route, Routes } from "react-router-dom";
import './App.css'
import { Landing } from "./pages/Landing";
import { Dash } from "./pages/Dash";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dash />} />
    </Routes>
  );
}

export default App