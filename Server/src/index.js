import express from "express";
import cors from "cors";
import { createPool } from "mysql2/promise";

const app = express();
const port = 3000;

// Crear el pool de conexiones
const pool = createPool({
  host: "marydb", // Nombre del servicio en docker-compose.yml
  user: "root",
  password: "123",
  database: "InformeDB",
  port: 3306, // Puerto interno del contenedor de MariaDB
});

// Función para intentar conectar a la base de datos
async function connectWithRetry() {
  let retries = 0; // Contador de intentos, ahora no hay límite
  while (true) {
    // Bucle infinito hasta que se conecte correctamente
    try {
      // Intentar realizar una consulta simple para verificar la conexión
      await pool.query("SELECT 1");
      console.log("Conexión a la base de datos exitosa");
      return; // Salir de la función una vez que la conexión sea exitosa
    } catch (err) {
      retries += 1;
      console.error("Error al conectar a la base de datos:", err.message);
      console.log(`Reintentando (${retries})...`);
      await new Promise((res) => setTimeout(res, 10000)); // Esperar 10 segundos antes de reintentar
    }
  }
}

// Llamar a la función de conexión
connectWithRetry();

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hola");
});

app.get("/ping", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW()");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
