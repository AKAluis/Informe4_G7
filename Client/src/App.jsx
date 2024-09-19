import { useState } from "react";
import "./App.css";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Users/login.jsx";
import Registro from "./pages/Users/registro.jsx";
import Olvido from "./pages/Users/olvido.jsx";
import Cursos from "./pages/Admin/cursos.jsx";
import Home from "./pages/Users/home.jsx";
import VentanaPubli from "./pages/Users/VentanaPubli.jsx";
import VerUsers from "./pages/Users/verUsers.jsx";
import VerProfile from "./pages/Users/verProfile.jsx";
import CursosAprobados from "./pages/Users/CursosAprobados.jsx";
import Publicaciones from "./pages/Users/Prubea.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/OlvidoContrasenia" element={<Olvido />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/cPublis" element={<VentanaPubli />} />
          <Route path="/vUsers" element={<VerUsers />} />
          <Route path="/vPerfil" element={<VerProfile />} />
          <Route path="/cAprobados" element={<CursosAprobados />} />
          <Route path="/vPublis" element={<Publicaciones />} />
   
          

          <Route path="/Admin/Cursos" element={<Cursos />} />
        </Routes>
      </BrowserRouter>
    </>
  );

  const root = ReactDOM.createRoot(document.getElementById('root'));
}

export default App;
