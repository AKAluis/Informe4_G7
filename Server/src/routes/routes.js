import express from "express";
import * as usuarioControllers from "../controllers/Usuario.Controllers.js"; // Importa con la extensión .js

const router = express.Router();

// Usuarios
router.get("/1", usuarioControllers.ping2);
router.get("/vCursos", usuarioControllers.getCursos);
router.post("/rUser", usuarioControllers.registrarUsuario);
router.post("/lUser", usuarioControllers.iniciarSesion)
router.put("/rPass", usuarioControllers.resetPass)
// Admins ??

// Publicaciones

// ...

export default router;
