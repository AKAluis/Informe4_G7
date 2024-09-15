import { pool } from "../index.js";

export const ping2 = (req, res) => {
  res.json({ mensaje: "Ping desde el controlador" });
};

export const getCursos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Cursos");
    res.json(rows); 
  } catch (error) {
    console.error("Error al obtener los cursos:", error.message);
    res.status(500).json({ error: "Error al obtener los cursos" });
  }
};

export const registrarUsuario = async (req, res) => {
  const {
    Registro_academico,
    Nombres,
    Apellidos,
    Contrasenia,
    Correo_electronico,
  } = req.body;

  if (
    !Registro_academico ||
    !Nombres ||
    !Apellidos ||
    !Contrasenia ||
    !Correo_electronico
  ) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO Usuarios (Registro_academico, Nombres, Apellidos, Contrasenia, Correo_electronico) 
           VALUES (?, ?, ?, ?, ?)`,
      [Registro_academico, Nombres, Apellidos, Contrasenia, Correo_electronico]
    );

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const iniciarSesion = async (req, res) => {
  const { Registro_academico, Contrasenia } = req.body;

  // Validar datos
  if (!Registro_academico || !Contrasenia) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    
    const [rows] = await pool.query(
      `SELECT * FROM Usuarios WHERE Registro_academico = ?`,
      [Registro_academico]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const usuario = rows[0];

    
    if (usuario.Contrasenia !== Contrasenia) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    
    res.json({
      message: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.ID_PERSONA,
        nombre: usuario.Nombres,
        correo: usuario.Correo_electronico,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const resetPass = async (req, res) => {
  const { registroAcademico, correoElectronico, nuevaContrasenia } = req.body;

  if (!registroAcademico || !correoElectronico || !nuevaContrasenia) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  try {
    
    const [rows] = await pool.query(
      "SELECT * FROM Usuarios WHERE Registro_academico = ? AND Correo_electronico = ?",
      [registroAcademico, correoElectronico]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: "Datos incorrectos" });
    }

    
    await pool.query(
      "UPDATE Usuarios SET Contrasenia = ? WHERE Registro_academico = ?",
      [nuevaContrasenia, registroAcademico]
    );

    res.json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
