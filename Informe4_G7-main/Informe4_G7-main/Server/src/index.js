import express from "express";
import cors from "cors";
import { createPool } from "mysql2/promise";
import indexRouter from "./routes/routes.js"; 

const app = express();
const port = 3000;


app.use(cors());


app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));


app.use("/", indexRouter);


const pool = createPool({
  host: "marydb", // Nombre del servicio en docker-compose.yml
  user: "root",
  password: "123",
  database: "InformeDB",
  port: 3306, // Puerto interno del contenedor de MariaDB
});


async function connectWithRetry() {
  let retries = 0; 
  while (true) {
    try {
      
      await pool.query("SELECT 1");
      console.log("Conexión a la base de datos exitosa");
      return; 
    } catch (err) {
      retries += 1;
      console.error("Error al conectar a la base de datos:", err.message);
      console.log(`Reintentando (${retries})...`);
      await new Promise((res) => setTimeout(res, 10000)); // Esperar 10 segundos antes de reintentar
    }
  }
}


connectWithRetry();


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


app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});


export { pool };
