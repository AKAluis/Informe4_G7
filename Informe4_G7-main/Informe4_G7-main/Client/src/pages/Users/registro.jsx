import React, { useState } from "react";
import axios from "axios";

function Registro() {
  const [formData, setFormData] = useState({
    Registro_academico: "",
    Nombres: "",
    Apellidos: "",
    Correo_electronico: "",
    Contrasenia: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Imprime los datos para verificar
      console.log("Datos enviados:", formData);

      // Enviar solicitud al backend
      const response = await axios.post(
        "http://localhost:3000/rUser",
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Imprime la respuesta del servidor
      console.log("Respuesta del servidor:", response.data);
      alert("Usuario registrado con éxito");
    } catch (error) {
      // Imprime detalles del error
      console.error(
        "Error al registrar el usuario:",
        error.response ? error.response.data : error.message
      );
      alert("Hubo un error al registrar el usuario");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen overflow-hidden -mt-10">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">¡Regístrate!</h1>
          <form onSubmit={handleSubmit}>
            {/* Registro Académico */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Registro_academico"
              >
                Registro Académico
              </label>
              <input
                type="text"
                id="Registro_academico"
                value={formData.Registro_academico}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Introduce tu Registro Académico"
                required
              />
            </div>

            {/* Nombres */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Nombres"
              >
                Nombres
              </label>
              <input
                type="text"
                id="Nombres"
                value={formData.Nombres}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Introduce tus nombres"
                required
              />
            </div>

            {/* Apellidos */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Apellidos"
              >
                Apellidos
              </label>
              <input
                type="text"
                id="Apellidos"
                value={formData.Apellidos}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Introduce tus apellidos"
                required
              />
            </div>

            {/* Correo Electrónico */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Correo_electronico"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="Correo_electronico"
                value={formData.Correo_electronico}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Introduce tu correo electrónico"
                required
              />
            </div>

            {/* Contraseña */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Contrasenia"
              >
                Contrasenia
              </label>
              <input
                type="password"
                id="Contrasenia"
                value={formData.Contrasenia}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Introduce tu contraseña"
                required
              />
            </div>

            {/* Botón */}
            <div className="flex justify-center items-center mb-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Registrarse
              </button>
            </div>

            {/* Enlace para iniciar sesión */}
            <div className="text-center">
              <p className="text-gray-700 font-bold">
                ¿Ya tienes cuenta?{" "}
                <a className="text-blue-400 ml-1" href="/Login">
                  Inicia sesión aquí
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registro;
