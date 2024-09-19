import React, { useState } from "react";
import "../../App.css";
import Header from "../Components/Header";
import axios from "axios";

function Login() {
  const [registroAcademico, setRegistroAcademico] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/lUser", {
        Registro_academico: registroAcademico,
        Contrasenia: contrasenia,
      });

      const userData = response.data.user; // Asegúrate de que el nombre coincide con lo enviado por el backend

      if (userData) {
        sessionStorage.setItem("userData", JSON.stringify(userData));
        window.location.href = "/Home";
      } else {
        console.error("No se encontró el usuario en la respuesta");
        alert("Datos incorrectos");
      }
    } catch (error) {
      console.error(
        "Error al iniciar sesión:",
        error.response ? error.response.data : error.message
      );
      alert(
        error.response ? error.response.data.error : "Error al iniciar sesión"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen -mt-5">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Inicia Sesión</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="registroAcademico"
            >
              Registro Académico
            </label>
            <input
              type="text"
              id="registroAcademico"
              value={registroAcademico}
              onChange={(e) => setRegistroAcademico(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Introduce tu Registro Académico"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="contrasenia"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="contrasenia"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
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
