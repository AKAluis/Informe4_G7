import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({}); // Para manejar comentarios específicos para cada publicación
  const [commentText, setCommentText] = useState({}); // Manejar texto de comentarios para cada publicación
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({
    curso: "",
    catedratico: "",
    nombreCurso: "",
    nombreCatedratico: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");
    if (storedData) {
      setUser(JSON.parse(storedData)); // Cargar datos de usuario desde sessionStorage
    } else {
      navigate("/login"); // Redirigir si no hay datos
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/vPublis");
        setPosts(response.data);
      } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsPromises = posts.map(async (post) => {
          const response = await axios.get(
            `http://localhost:3000/vComments/${post.ID}`
          );
          return { id: post.ID, comments: response.data };
        });

        const commentsArray = await Promise.all(commentsPromises);
        const commentsObject = commentsArray.reduce((acc, { id, comments }) => {
          acc[id] = comments;
          return acc;
        }, {});

        setComments(commentsObject);
      } catch (error) {
        console.error("Error al obtener los comentarios:", error);
      }
    };

    if (posts.length > 0) {
      fetchComments();
    }
  }, [posts]);

  const handleCommentChange = (postId, e) => {
    setCommentText((prev) => ({
      ...prev,
      [postId]: e.target.value,
    }));
  };

  const handlePublishComment = async (postId) => {
    if (!commentText[postId]) {
      alert("El comentario no puede estar vacío");
      return;
    }

    try {
      console.log("Enviando comentario:", {
        idPublicacion: postId,
        nombrePersona: user.Nombres,
        texto: commentText[postId],
      });

      await axios.post("http://localhost:3000/cComentar", {
        idPublicacion: postId,
        nombrePersona: user.Nombres,
        texto: commentText[postId],
      });

      // Actualizar comentarios
      const response = await axios.get(
        `http://localhost:3000/vComments/${postId}`
      );
      setComments((prev) => ({
        ...prev,
        [postId]: response.data,
      }));

      setCommentText((prev) => ({
        ...prev,
        [postId]: "",
      }));
    } catch (error) {
      console.error("Error al publicar el comentario:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredPosts = posts.filter((post) => {
    return (
      (filters.curso === "" ||
        post.Curso.toLowerCase().includes(filters.curso.toLowerCase())) &&
      (filters.catedratico === "" ||
        (post.Tutor || "")
          .toLowerCase()
          .includes(filters.catedratico.toLowerCase()) ||
        (post.Auxiliar || "")
          .toLowerCase()
          .includes(filters.catedratico.toLowerCase())) &&
      (filters.nombreCurso === "" ||
        post.Curso.toLowerCase().includes(filters.nombreCurso.toLowerCase())) &&
      (filters.nombreCatedratico === "" ||
        (post.Tutor || "")
          .toLowerCase()
          .includes(filters.nombreCatedratico.toLowerCase()) ||
        (post.Auxiliar || "")
          .toLowerCase()
          .includes(filters.nombreCatedratico.toLowerCase()))
    );
  });

  if (!user) return <div>Cargando...</div>; // Mostrar mientras se carga el usuario

  return (
    <div>
      <Navbar />
      <div className="home-background">
        <div className="container mx-auto p-4">
          {/* Mensaje de bienvenida */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold">
              Bienvenido, {user.Nombres} {user.Apellidos}
            </h1>
          </div>

          {/* Filtros */}
          <div className="mb-4">
            <input
              type="text"
              name="curso"
              placeholder="Filtrar por curso"
              value={filters.curso}
              onChange={handleFilterChange}
              className="border p-2 mr-2"
            />
            <input
              type="text"
              name="catedratico"
              placeholder="Filtrar por catedrático"
              value={filters.catedratico}
              onChange={handleFilterChange}
              className="border p-2 mr-2"
            />
            <input
              type="text"
              name="nombreCurso"
              placeholder="Filtrar por nombre de curso"
              value={filters.nombreCurso}
              onChange={handleFilterChange}
              className="border p-2 mr-2"
            />
            <input
              type="text"
              name="nombreCatedratico"
              placeholder="Filtrar por nombre de catedrático"
              value={filters.nombreCatedratico}
              onChange={handleFilterChange}
              className="border p-2"
            />
          </div>

          {/* Mostrar publicaciones */}
          <div className="grid grid-cols-1 gap-4">
            {filteredPosts.map((post) => (
              <div key={post.ID} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">{post.Curso}</h2>
                {post.Texto && (
                  <p className="text-gray-700 mb-2">{post.Texto}</p>
                )}
                {post.Tutor && post.Auxiliar && (
                  <p className="text-gray-500 mb-2">
                    <strong>Ingeniero/Tutor:</strong> {post.Tutor}
                    <br />
                    <strong>Auxiliar:</strong> {post.Auxiliar}
                    <br />
                    <strong>Autor: </strong> {post.Autor}
                  </p>
                )}
                {post.FechaPublicacion && (
                  <p className="text-gray-500 mb-2">
                    <strong>Fecha de Publicación:</strong>{" "}
                    {new Date(post.FechaPublicacion).toLocaleDateString()}
                  </p>
                )}

                {/* Mostrar comentarios */}
                <div className="mt-4">
                  {comments[post.ID] && comments[post.ID].length > 0 ? (
                    <div>
                      <h3 className="font-bold">Comentarios:</h3>
                      <ul>
                        {comments[post.ID].map((comment) => (
                          <li
                            key={comment.id}
                            className="border-b border-gray-200 py-2"
                          >
                            <p>
                              <strong>{comment.Nombre}:</strong> {comment.Texto}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {new Date(
                                comment.FechaCreacion
                              ).toLocaleDateString()}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>No hay comentarios para esta publicación.</p>
                  )}
                </div>

                {/* Agregar comentario */}
                <div className="mt-4">
                  <textarea
                    value={commentText[post.ID] || ""}
                    onChange={(e) => handleCommentChange(post.ID, e)}
                    placeholder="Escribe un comentario..."
                    className="border p-2 w-full"
                  ></textarea>
                  <button
                    onClick={() => handlePublishComment(post.ID)}
                    className="bg-blue-500 text-white px-4 py-2 mt-2"
                  >
                    Publicar Comentario
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
