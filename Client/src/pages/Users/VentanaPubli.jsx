import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";

const VentanaPubli = () => {
  const [postText, setPostText] = useState("");
  const [category, setCategory] = useState("");
  const [tutor, setTutor] = useState("");
  const [auxiliar, setAuxiliar] = useState("");
  const [Autor, setAuthor] = useState(""); 
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [courses, setCourses] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/vCursos");
        setCourses(response.data);
      } catch (error) {
        console.error("Error al cargar los cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  const handlePost = async () => {
    if (postText.trim() === "" || Autor.trim() === "") {
      alert("El texto del post y el autor no pueden estar vacíos");
      return;
    }

    const data = {
      postText,
      category,
      tutor,
      auxiliar,
      Autor, 
      isAnonymous,
      usuarioId,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/cPublicacion",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message);
      setPostText("");
      setCategory("");
      setTutor("");
      setAuxiliar("");
      setAuthor(""); 
      setIsAnonymous(false);
      setUsuarioId("");
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      alert("Error al crear la publicación");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Nuevo Post</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Describe lo que quieras escribir en tu post:
          </label>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Escribe aquí..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Curso:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona un curso</option>
            {courses.map((course) => (
              <option key={course.id} value={course.Nombre}>
                {course.Nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tutor:</label>
          <select
            value={tutor}
            onChange={(e) => setTutor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona un Tutor</option>
            {courses.map((course) => (
              <option key={course.id} value={course.Tutor}>
                {course.Tutor}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Auxiliar:</label>
          <select
            value={auxiliar}
            onChange={(e) => setAuxiliar(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona un Auxiliar</option>
            {courses.map((course) => (
              <option key={course.id} value={course.Auxiliar}>
                {course.Auxiliar}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Autor:</label>
          <input
            type="text"
            value={Autor}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Ingresa el nombre del autor"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 mr-4">
            ¿Publicar de forma anónima?
          </label>
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">ID de Usuario:</label>
          <input
            type="text"
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            placeholder="Ingresa tu ID de usuario"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handlePost}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Publicar
          </button>
          <button
            onClick={() => {
              setPostText("");
              setCategory("");
              setTutor("");
              setAuxiliar("");
              setAuthor("");
              setIsAnonymous(false);
              setUsuarioId("");
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 focus:outline-none"
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default VentanaPubli;
