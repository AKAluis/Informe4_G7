import React, { useState } from "react";

function olvido() {
  const [registro, setRegistro] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [showNuevaContrasena, setShowNuevaContrasena] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de validación en el servidor
    if (registro === "123456" && email === "usuario@ejemplo.com") {
      // Datos coinciden, permitir al usuario registrar nueva contraseña
      setShowNuevaContrasena(true);
      setError(null);
    } else {
      // Datos incorrectos
      setError("Los datos no coinciden, por favor verifícalos.");
      setShowNuevaContrasena(false);
    }
  };

  const handleNuevaContrasena = (e) => {
    e.preventDefault();
    // Lógica para guardar la nueva contraseña
    setSuccess("Tu contraseña ha sido restablecida con éxito.");
    setError(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          ¿Olvidó su Contraseña?
        </h1>
        {!showNuevaContrasena ? (
          <form onSubmit={handleSubmit}>
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
                value={registro}
                onChange={(e) => setRegistro(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Introduce tu Registro Académico"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Introduce tu correo electrónico"
                required
              />
            </div>
            {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
            <div className="flex justify-center items-center mb-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Restablecer Contraseña
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleNuevaContrasena}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="newPassword"
              >
                Nueva Contraseña
              </label>
              <input
                type="password"
                id="newPassword"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Introduce tu nueva contraseña"
                required
              />
            </div>
            {success && (
              <p className="text-green-500 text-xs mb-4">{success}</p>
            )}
            <div className="flex justify-center items-center mb-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Guardar Contraseña
              </button>
            </div>
          </form>
        )}
        <div className="text-center">
          <p className="text-gray-700 font-bold text-sm">
            ¿Ya te acordaste cual era?{" "}
            <a className="text-blue-400 ml-1" href="/Login">
              ¡Vuelve aqui!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default olvido;
