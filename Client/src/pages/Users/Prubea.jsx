import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PublicacionCard = ({ publicacion }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4">
      {publicacion.Imagen && (
        <img
          src={publicacion.Imagen}
          alt="Imagen de publicación"
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{publicacion.Curso}</h2>
        <p className="text-gray-700 mb-2">{publicacion.Texto}</p>
        <p className="text-gray-600 mb-2">
          Auxiliar: <span className="font-semibold">{publicacion.Auxiliar}</span>
        </p>
        <p className="text-gray-600 mb-2">
          Fecha de Publicación: <span className="font-semibold">{new Date(publicacion.FechaPublicacion).toLocaleDateString()}</span>
        </p>
        {publicacion.Tutor && (
          <p className="text-gray-600 mb-2">
            Tutor: <span className="font-semibold">{publicacion.Tutor}</span>
          </p>
        )}
        {publicacion.EsAnonimo && (
          <p className="text-gray-600 mb-2 text-red-500">
            Publicación Anónima
          </p>
        )}
      </div>
    </div>
  );
};

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get('http://localhost:3000/vPublis');
        setPublicaciones(response.data);
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      }
    };

    fetchPublicaciones();
  }, []);

  return (
    <div className="p-4">
      {publicaciones.map(publicacion => (
        <PublicacionCard key={publicacion.ID} publicacion={publicacion} />
      ))}
    </div>
  );
};

export default Publicaciones;
