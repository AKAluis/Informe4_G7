import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";

const CursosAprobados = () => {
  const [cursos, setCursos] = useState([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [totalCreditos, setTotalCreditos] = useState(0);
  const [registroAcademico, setRegistroAcademico] = useState(""); // Estado para el Registro Academico

  useEffect(() => {
    // Obtener los cursos de la API
    const fetchCursos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/vCursos"); // Cambia la URL según tu API
        setCursos(response.data);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };

    fetchCursos();
  }, []);

  const handleAddCurso = () => {
    if (cursoSeleccionado && !cursosSeleccionados.includes(cursoSeleccionado)) {
      setCursosSeleccionados([...cursosSeleccionados, cursoSeleccionado]);
      calcularCreditosTotales([...cursosSeleccionados, cursoSeleccionado]);
    }
    setCursoSeleccionado(""); // Limpiar el campo después de añadir
  };

  const handleRemoveCurso = (curso) => {
    const nuevosCursosSeleccionados = cursosSeleccionados.filter(
      (c) => c !== curso
    );
    setCursosSeleccionados(nuevosCursosSeleccionados);
    calcularCreditosTotales(nuevosCursosSeleccionados);
  };

  const calcularCreditosTotales = async (cursosSeleccionados) => {
    try {
      let total = 0;
      for (const curso of cursosSeleccionados) {
        const response = await axios.get(
          `http://localhost:3000/vCurso/${encodeURIComponent(curso)}`
        );
        total += response.data.Creditos;
      }
      setTotalCreditos(total);
    } catch (error) {
      console.error("Error al calcular los créditos:", error);
    }
  };

  const handleGuardar = async () => {
    console.log("Datos a enviar:", {
      Registro_academico: registroAcademico,
      cursos: cursosSeleccionados.map(async (curso) => {
        const response = await axios.get(
          `http://localhost:3000/vCurso/${encodeURIComponent(curso)}`
        );
        return {
          cursoNombre: curso,
          creditos: response.data.Creditos,
        };
      }),
    });

    try {
      // Obtener créditos totales por curso
      const cursosConCreditos = await Promise.all(
        cursosSeleccionados.map(async (curso) => {
          const response = await axios.get(
            `http://localhost:3000/vCurso/${encodeURIComponent(curso)}`
          );
          return {
            cursoNombre: curso,
            creditos: response.data.Creditos,
          };
        })
      );

      const response = await axios.post("http://localhost:3000/aCursos", {
        Registro_academico: registroAcademico, // Usar el estado para el Registro Academico
        cursos: cursosConCreditos,
      });

      console.log("Respuesta del servidor:", response.data);
      // Aquí puedes agregar lógica para manejar la respuesta después de guardar
    } catch (error) {
      console.error("Error al guardar los cursos y créditos:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Cursos Aprobados</h1>

        {/* Campo para ingresar el Registro Académico */}
        <div className="mb-4">
          <input
            type="text"
            value={registroAcademico}
            onChange={(e) => setRegistroAcademico(e.target.value)}
            placeholder="Ingrese su Registro Académico"
            className="border border-gray-300 rounded p-2"
          />
        </div>

        {/* Select para elegir un curso */}
        <div className="mb-4">
          <select
            value={cursoSeleccionado}
            onChange={(e) => setCursoSeleccionado(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="">Selecciona un curso</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.Nombre}>
                {curso.Nombre} ({curso.Creditos} créditos)
              </option>
            ))}
          </select>
          <button
            onClick={handleAddCurso}
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          >
            Añadir
          </button>
        </div>

        {/* Lista de cursos seleccionados */}
        <ul>
          {cursosSeleccionados.map((curso, index) => (
            <li key={index} className="mb-2 flex items-center">
              <span className="flex-grow">{curso}</span>
              <button
                onClick={() => handleRemoveCurso(curso)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>

        {/* Mostrar créditos totales */}
        <div className="mt-4">
          <h2 className="text-xl font-bold">
            Créditos Totales: {totalCreditos}
          </h2>
        </div>

        {/* Botón para guardar */}
        <div className="mt-4">
          <button
            onClick={handleGuardar}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </>
  );
};

export default CursosAprobados;
