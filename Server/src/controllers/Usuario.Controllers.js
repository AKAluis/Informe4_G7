import { pool } from "../index.js";

export const agregarComentario = async (req, res) => {
  const { idPublicacion, nombrePersona, texto } = req.body;

  try {
    const query = `
      INSERT INTO Comentarios (idPublicacion, Nombre, Texto)
      VALUES (?, ?, ?)
    `;

    
    const [result] = await pool.query(query, [
      idPublicacion,
      nombrePersona,
      texto,
    ]);

    res.status(201).json({
      message: "Comentario agregado exitosamente",
      comentarioId: result.insertId,
    });
  } catch (error) {
    console.error("Error al agregar el comentario:", error.message);
    res.status(500).json({ error: "Error al agregar el comentario" });
  }
};

export const obtenerComentarios = async (req, res) => {
  const { idPublicacion } = req.params;

  try {
    const query = `
      SELECT * FROM Comentarios
      WHERE idPublicacion = ?
    `;

    
    const [result] = await pool.query(query, [idPublicacion]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener los comentarios:", error.message);
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
};

export const crearPublicacion = async (req, res) => {
  const {
    postText,
    category,
    tutor,
    auxiliar,
    isAnonymous,
    image,
    usuarioId,
    Autor,
  } = req.body;

  try {
    const query = `
      INSERT INTO Publicaciones (Texto, Curso, Tutor, Auxiliar, EsAnonimo, Imagen, UsuarioID,Autor)
      VALUES (?, ?, ?, ?, ?, ?, ?,?)
    `;

    // Ejecutamos la consulta con los datos recibidos del cuerpo de la solicitud
    const [result] = await pool.query(query, [
      postText,
      category, 
      tutor, 
      auxiliar,
      isAnonymous, 
      image, 
      usuarioId,
      Autor, 
    ]);

    res.status(201).json({
      message: "Publicación creada exitosamente",
      publicacionId: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear la publicación:", error.message);
    res.status(500).json({ error: "Error al crear la publicación" });
  }
};

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

export const getCursoByName = async (req, res) => {
  const { nombre } = req.params; 

  try {
    const [rows] = await pool.query("SELECT * FROM Cursos WHERE Nombre = ?", [
      nombre,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Curso no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el curso:", error.message);
    res.status(500).json({ error: "Error al obtener el curso" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Usuarios");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los Usuarios:", error.message);
    res.status(500).json({ error: "Error al obtener los Usuarios" });
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
      user: {
        id: usuario.ID_PERSONA,
        Registro_academico: usuario.Registro_academico,
        Nombres: usuario.Nombres,
        Apellidos: usuario.Apellidos,
        Correo_electronico: usuario.Correo_electronico,
        Creditos: usuario.Creditos,
        Cursos: usuario.Cursos_aprobados,
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

export const actualizarCursosYCreditos = async (req, res) => {
  const { Registro_academico, cursos } = req.body;

  if (!Registro_academico || !Array.isArray(cursos) || cursos.length === 0) {
    return res
      .status(400)
      .json({ error: "Faltan datos requeridos o datos incorrectos" });
  }

  try {
    
    const [rows] = await pool.query(
      "SELECT Cursos_aprobados, CAST(Creditos AS UNSIGNED) AS Creditos FROM Usuarios WHERE Registro_academico = ?",
      [Registro_academico]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    let cursosActuales = rows[0].Cursos_aprobados;
    let creditosActuales = rows[0].Creditos;

    // Actualizar los cursos aprobados y créditos
    cursos.forEach((curso) => {
      if (cursosActuales) {
        cursosActuales += `,${curso.cursoNombre}`;
      } else {
        cursosActuales = curso.cursoNombre;
      }
      creditosActuales += curso.creditos;
    });

    
    await pool.query(
      "UPDATE Usuarios SET Cursos_aprobados = ?, Creditos = ? WHERE Registro_academico = ?",
      [cursosActuales, creditosActuales, Registro_academico]
    );

    res.json({ message: "Cursos y créditos actualizados exitosamente" });
  } catch (error) {
    console.error("Error al actualizar cursos y créditos:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const obtenerPublicaciones = async (req, res) => {
  try {
    const query = "SELECT * FROM Publicaciones";

    const [rows] = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error("Error al obtener las publicaciones:", error.message);
    res.status(500).json({ error: "Error al obtener las publicaciones" });
  }
};
