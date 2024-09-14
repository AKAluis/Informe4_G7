import React, { useState } from "react";
import "../../App.css";
import Header from "../Components/Header";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen -mt-5">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Inicia Sesión</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Registro Académico
            </label>
            <input
              type="text"
              id="CUI"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Introduce tu Registro Académico/CUI"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Introduce tu contraseña"
              required
            />
          </div>
          <div className="flex justify-center items-center mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Inicia Sesión
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-700 font-bold">
              ¿No tienes cuenta?
              <a className="text-blue-400 ml-1" href="/Registro">
                ¡Regístrate aquí!
              </a>
            </p>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-700 font-bold text-sm">
              ¿Olvidaste tu contraseña?
              <a className="text-blue-400 ml-1" href="/OlvidoContrasenia">
                ¡Restablecela Aquí!
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
