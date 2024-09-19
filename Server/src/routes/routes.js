import express from "express";
import * as usuarioControllers from "../controllers/Usuario.Controllers.js"; 

const router = express.Router();

// Usuarios
router.get("/1", usuarioControllers.ping2);
router.get("/vCursos", usuarioControllers.getCursos);
router.get("/vCurso/:nombre", usuarioControllers.getCursoByName);
router.post("/rUser", usuarioControllers.registrarUsuario);
router.post("/lUser", usuarioControllers.iniciarSesion);
router.put("/rPass", usuarioControllers.resetPass);
router.get("/vUsers", usuarioControllers.getUsers);
router.post("/aCursos", usuarioControllers.actualizarCursosYCreditos);
router.post("/cPublicacion", usuarioControllers.crearPublicacion);
router.get("/vPublis",usuarioControllers.obtenerPublicaciones);
router.post("/cComentar", usuarioControllers.agregarComentario);
router.get("/vComments/:idPublicacion",usuarioControllers.obtenerComentarios);



export default router;
