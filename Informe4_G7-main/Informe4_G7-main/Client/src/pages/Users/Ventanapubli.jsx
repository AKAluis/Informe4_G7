import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

// Para wachar la imagen
const ImagePreview = ({ image }) => {
  return (
    <div className="mt-4">
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="Vista Previa"
          className="max-w-xs max-h-52 object-cover border-2 border-gray-300 rounded"
        />
      ) : (
        <p className="text-gray-500">No hay imagen adjunta</p>
      )}
    </div>
  );
};

// Las funciones principales de la pagina
const Ventanapubli = () => {
  const [postText, setPostText] = useState('');
  const [category, setCategory] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(false);

  const navigate = useNavigate(); // Para redirección

  // Para errores de la publicacion 
  const handlePost = () => {
    if (postText.trim() === '') {
      alert('El texto del post no puede estar vacío');
      return;
    }

    // Para el servidor 
    console.log({
      postText,
      category,
      isAnonymous,
      image
    });

    // Pra borrrar los campos huecos 
    setPostText('');
    setCategory('Divertido');
    setIsAnonymous(false);
    setImage(null);
    setPreview(false);
  };

  // Para cargar la imagen ojala funcione
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      {/* Botones de navegación */}
      <div className="flex justify-between mb-6">
        <button
          onClick={() => navigate('/home')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Home
        </button>
        <button
          onClick={() => navigate('/logout')}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Nuevo Post</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Describe lo que quieras escribir en tu post:</label>
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Escribe aquí..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Categoría:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Divertido">Divertido</option>
          <option value="Informativo">Informativo</option>
          <option value="Curioso">Curioso</option>
          {/* Si queres agregar mas emociones agregalas aqui yo solo 3 puse */}
        </select>
      </div>

      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4">¿Publicar de forma anónima?</label>
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={() => setIsAnonymous(!isAnonymous)}
          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Adjuntar imagen:</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
      </div>

      {preview && <ImagePreview image={image} />}

      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4">Vista Previa</label>
        <input
          type="checkbox"
          checked={preview}
          onChange={() => setPreview(!preview)}
          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
            setPostText('');
            setCategory('Divertido');
            setIsAnonymous(false);
            setImage(null);
            setPreview(false);
          }}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 focus:outline-none"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default Ventanapubli;
