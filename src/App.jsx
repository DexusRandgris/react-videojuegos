import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      {/* Ruta dinámica para el detalle del juego */}
      <Route path="/game/:id" element={<Detail />} />
    </Routes>
  );
}

export default App;