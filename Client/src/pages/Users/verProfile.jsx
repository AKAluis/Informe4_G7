import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";

const VerProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div>Cargando...</div>;
  }

 
  const cursosAprobadosArray = user.Cursos ? user.Cursos.split(",") : [];

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-4">
        {/* Contenedor del perfil */}
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
          <div className="flex items-center mb-4">
            {/* Foto de perfil */}
            <img
              src={`https://ui-avatars.com/api/?name=${user.Nombres}+${user.Apellidos}&background=random`}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-200"
            />
            <div className="ml-4">
              {/* Nombre del usuario */}
              <h1 className="text-2xl font-bold">
                {user.Nombres} {user.Apellidos}
              </h1>
              {/* Correo electrónico */}
              <p className="text-gray-600">Email: {user.Correo_electronico}</p>
              <p className="text-gray-600">Créditos: {user.Creditos}</p>
            </div>
          </div>
          {/* Información adicional */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Cursos Aprobados</h2>
            <ul className="mt-2 list-disc pl-5">
              {cursosAprobadosArray.length > 0 ? (
                cursosAprobadosArray.map((curso, index) => (
                  <li key={index} className="text-gray-600">
                    {curso}
                  </li>
                ))
              ) : (
                <p className="text-gray-600">No hay cursos aprobados.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerProfile;
