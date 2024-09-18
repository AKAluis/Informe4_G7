import React from "react";
import Navbar from "./Navbar"; // Ajusta la ruta si el archivo Navbar está en otro lugar
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de tener Bootstrap

import "../../App.css"; // Se asume que los estilos estarán en un archivo CSS separado
function Home() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showAnonInfoModal, setShowAnonInfoModal] = useState(false);
  const [anonInfoModalContent, setAnonInfoModalContent] = useState("");
  const [comment, setComment] = useState("");

  const listaobjetos = [
    {
     
    },
    {
     
    },
    // Añade más objetos según sea necesario
  ];

  const comments = {
    1: [{ id: 1, comment: "Comentario 1" }],
    2: [{ id: 2, comment: "Comentario 2" }],
  };

  const viewIdPost = (id) => {
    setSelectedPostId(id);
  };

  const handleLikeToggle = (id) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter((postId) => postId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  const showAnonInfo = (info, isAnonimo) => {
    if (isAnonimo) {
      setAnonInfoModalContent("Información de usuario anónimo");
    } else {
      setAnonInfoModalContent(info);
    }
    setShowAnonInfoModal(true);
  };

  const closeModal = () => {
    setSelectedPostId(null);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handlePublishComment = () => {
    // Lógica para publicar comentario
    closeModal();
  };

  return (
    <div>
      <Navbar />
      <div className="home-background">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              {listaobjetos.map((objeto) => (
                <div className="card" key={objeto.id}>
                  <div className="card-header">
                    {objeto.anonimo ? (
                      <p>Anónimo</p>
                    ) : (
                      <p>Usuario: {objeto.user}</p>
                    )}
                    <p>Fecha: {new Date(objeto.fechahora).toLocaleString()}</p>
                  </div>
                  <div className="card-center-img">
                    {objeto.imagen && (
                      <img src={objeto.imagen} className="card-img" alt="..." />
                    )}
                  </div>
                  <p className="card-description">{objeto.descripcion}</p>
                  <button onClick={() => viewIdPost(objeto.id)}>
                    Comentarios
                  </button>
                  <button
                    className="btn btn-info"
                    style={{ padding: "5px 10px", fontSize: "14px" }}
                    onClick={() => handleLikeToggle(objeto.id)}
                  >
                    {likedPosts.includes(objeto.id)
                      ? "No me gusta"
                      : "Me gusta"}
                  </button>

                  <button
                    className="btn btn-secondary"
                    style={{ padding: "5px 10px", fontSize: "14px" }}
                    onClick={() =>
                      showAnonInfo(objeto.anonimoInfo, objeto.anonimo)
                    }
                  >
                    Info
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Modal show={selectedPostId !== null} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Comentarios</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {(comments[selectedPostId] || []).map((comment) => (
              <div key={comment.id}>
                <p>{comment.comment}</p>
              </div>
            ))}
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Escribe tu comentario aquí..."
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handlePublishComment}>
              Publicar Comentario
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showAnonInfoModal}
          onHide={() => setShowAnonInfoModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Informacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{anonInfoModalContent}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowAnonInfoModal(false)}
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
