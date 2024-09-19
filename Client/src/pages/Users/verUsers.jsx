import React, { useEffect, useState } from "react";
import Modal from "react-modal"; 
import Navbar from "../Components/Navbar";

const VerUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch("http://localhost:3000/vUsers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data); 
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  
  if (loading) {
    return <div className="text-center mt-10">Cargando usuarios...</div>;
  }

  
  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  
  const handleViewMore = (user) => {
    setSelectedUser({
      ...user,
    
      Cursos_aprobados: Array.isArray(user.Cursos_aprobados)
        ? user.Cursos_aprobados
        : user.Cursos_aprobados.split(","),
    });
    setIsModalOpen(true);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Usuarios</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="flex items-center p-4">
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src={`https://i.pravatar.cc/150?img=${user.id}`} 
                  alt={user.Nombres}
                />
                <div className="ml-4">
                  <h2 className="text-xl font-bold">{user.Nombres}</h2>
                  <p className="text-gray-600">{user.Registro_academico}</p>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => handleViewMore(user)}
                >
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal para mostrar los detalles del usuario */}
        {selectedUser && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Detalles del usuario"
            className="bg-white p-4 max-w-lg mx-auto mt-20 rounded shadow-lg"
            ariaHideApp={false} 
          >
            <h2 className="text-2xl font-bold mb-4">
              {selectedUser.Nombres} {selectedUser.Apellidos}
            </h2>
            <p className="mb-2">Registro académico: {selectedUser.Registro_academico}</p>
            <p className="mb-2">Correo electrónico: {selectedUser.Correo_electronico}</p>
            <p className="mb-2">Créditos: {selectedUser.Creditos}</p>
            <h3 className="text-xl font-semibold mt-4">Cursos Aprobados</h3>
            <ul className="list-disc pl-5">
              {selectedUser.Cursos_aprobados.map((curso, index) => (
                <li key={index}>{curso}</li>
              ))}
            </ul>
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-red-600"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </Modal>
        )}
      </div>
    </>
  );
};

export default VerUsers;
