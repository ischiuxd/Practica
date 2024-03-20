import express from "express";
import cors from "cors";
import mysql from 'mysql2';

const app = express();
app.use(express.static('dist'));
app.use(cors());
app.use(express.json());


const conxx = mysql.createConnection({
  host: "localhost",
  database: "practica4",
  user: "root",
  password: "1234"
});


app.get("/api/usuarios", (req, res) => {
    const sqlQuery = "SELECT * FROM usuarios_tb";

    conxx.query(sqlQuery, (error, results) => {
        if (error) {
            console.error("Error al ejecutar la consulta:", error);
            res.status(500).json({ error: "Error al obtener los datos de la base de datos" });
            return;
        }
        res.json(results);
    });
});


app.post("/api/agregarU", (req, res) => {
    const { id_us, registro_us, nombre_us, apellido_us, contra_us, admin_us, correo_us } = req.body;

    const sqlInsert = "INSERT INTO usuarios_tb (id_us, registro_us, nombre_us, apellido_us, contra_us, admin_us, correo_us) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [id_us, registro_us, nombre_us, apellido_us, contra_us, admin_us, correo_us];

    conxx.query(sqlInsert, values, (error, results) => {
        if (error) {
            console.error("Error al insertar datos en la base de datos:", error);
            res.status(500).json({ error: "Error al insertar datos en la base de datos" });
            return;
        }
        console.log(req.body);
        res.json({ message: "Datos agregados correctamente" });
    });
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(5000, () => {
    console.log("El servidor ha iniciado en el puerto 5000");
});
