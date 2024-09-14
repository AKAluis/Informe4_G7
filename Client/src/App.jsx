import { useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Users/login.jsx";
import Registro from "./pages/Users/registro.jsx";
import Olvido from "./pages/Users/olvido.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/OlvidoContrasenia" element={<Olvido />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
