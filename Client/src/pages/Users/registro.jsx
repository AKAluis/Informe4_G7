import React from "react";

function Registro() {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen overflow-hidden -mt-10">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">¡Regístrate!</h1>
          <form>
            {/* Registro Académico */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="registro"
              >
                Registro Académico
              </label>
              <input
                type="text"
                id="registro"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Introduce tu Registro Académico"
                required
              />
            </div>

            {/* Nombres */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombres"
              >
                Nombres
              </label>
              <input
                type="text"
                id="nombres"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Introduce tus nombres"
                required
              />
            </div>

            {/* Apellidos */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="apellidos"
              >
                Apellidos
              </label>
              <input
                type="text"
                id="apellidos"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Introduce tus apellidos"
                required
              />
            </div>

            {/* Correo Electrónico */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Introduce tu correo electrónico"
                required
              />
            </div>

            {/* Contraseña */}
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
