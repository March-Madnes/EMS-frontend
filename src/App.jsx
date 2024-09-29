import { Route, Routes } from "react-router-dom";
import './App.css'
import { Landing } from "./pages/Landing";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* <Route path="/build" element={<Builder />} /> */}
    </Routes>
  );
}

export default App