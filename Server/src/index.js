const express = require('express');
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));


app.listen(port, () => {
  console.log("Servidor ejecutándose en el puerto " + port);
});
