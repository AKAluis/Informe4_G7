import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    // Eliminar los datos del sessionStorage
    sessionStorage.removeItem("userData");
    // Redirigir a la página de inicio de sesión
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo o nombre del sitio */}
        <div className="text-white font-bold text-xl">
          <a href="/Home">Ingenieria USAC</a>
        </div>

        {/* Links del menú */}
        <div className="hidden md:flex space-x-4">
          <a href="/cAprobados" className="text-gray-300 hover:text-white">
            Cursos Aprobados
          </a>
          <a href="/cPublis" className="text-gray-300 hover:text-white">
            Crear Publicación
          </a>
          <a href="/vPerfil" className="text-gray-300 hover:text-white">
            Ver Perfil
          </a>
          <a href="/vUsers" className="text-gray-300 hover:text-white">
            Ver Usuarios
          </a>
        </div>

        {/* Botón del menú móvil (hamburguesa) */}
        <div className="md:hidden">
          <button className="text-gray-300 hover:text-white focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Botón de cerrar sesión */}
        <button
          onClick={handleLogout}
          className="text-gray-300 hover:text-white md:ml-4"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
