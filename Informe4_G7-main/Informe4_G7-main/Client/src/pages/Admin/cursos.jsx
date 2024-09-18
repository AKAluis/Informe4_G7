import React, { useState, useEffect } from "react";
import axios from "axios";

const Cursos = () => {
  const [data, setData] = useState([]);

  const cargarCursos = () => {
    axios
      .get("http://localhost:3000/vCursos") // Asegúrate de que esta ruta sea correcta
      .then((response) => {
        setData(response.data); // Suponiendo que el API devuelve un arreglo de cursos
      })
      .catch((error) => {
        console.error("Hubo un error al cargar los cursos:", error);
      });
  };

  // Cargar los cursos al montar el componente
  useEffect(() => {
    cargarCursos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cursos</h1>

      {/* Tabla de resultados */}
      {data.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Tutor</th>
              <th className="border border-gray-300 px-4 py-2">Auxiliar</th>
              <th className="border border-gray-300 px-4 py-2">Horario</th>
              <th className="border border-gray-300 px-4 py-2">Creditos</th>
            </tr>
          </thead>
          <tbody>
            {data.map((curso, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{curso.ID}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {curso.Nombre}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {curso.Tutor}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {curso.Auxiliar}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {curso.Horario}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {curso.Creditos}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron cursos.</p>
      )}
    </div>
  );
};

export default Cursos;
