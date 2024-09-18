import { useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Users/login.jsx";
import Registro from "./pages/Users/registro.jsx";
import Olvido from "./pages/Users/olvido.jsx";
import Cursos from "./pages/Admin/cursos.jsx";
import Home from "./pages/Users/home.jsx";
import Ventanapublic from "./pages/Users/Ventanapubli.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/OlvidoContrasenia" element={<Olvido />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Ventanapubli" element={<Ventanapublic />} />
          <Route path="/Admin/Cursos" element={<Cursos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
