import express from "express";
import cors from "cors";
import mysql from 'mysql2';

const app = express();
app.use(cors());
app.use(express.json());

const conxx = mysql.createConnection({
  host: "localhost",
  database: "practica4",
  user: "root",
  password: "1234"
});


app.get("/api/personas/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const info = await obtenerInfoPersona(id);
        res.json({ info });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener información de la persona" });
    }
});


async function obtenerInfoPersona(id) {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT info_ps FROM personas_tb WHERE id_ps = ?";
        const values = [id];

        conxx.query(sqlQuery, values, (error, results) => {
            if (error) {
                console.error("Error al ejecutar la consulta:", error);
                reject("Error al obtener la información de la persona");
                return;
            }

            if (results.length > 0) {
                resolve(results[0].info_ps);
            } else {
                reject("No se encontró información para el ID proporcionado");
            }
        });
    });
}


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

app.get("/api/cursos", (req, res) => {
    const sqlQuery = "SELECT * FROM practica4.cursos_tb";
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

    const sqlInsertUsuarios = "INSERT INTO usuarios_tb (id_us, registro_us, nombre_us, apellido_us, contra_us, admin_us, correo_us) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const valuesUsuarios = [id_us, registro_us, nombre_us, apellido_us, contra_us, admin_us, correo_us];
    conxx.query(sqlInsertUsuarios, valuesUsuarios, (error1, results1) => {
        if (error1) {
            console.error("Error al insertar datos en la tabla usuarios_tb:", error1);
            res.status(500).json({ error: "Error al insertar datos en la tabla usuarios_tb" });
            return;
        }

        const jsonCursos = '{"courses": []}';
        const sqlInsertPersonas = "INSERT INTO personas_tb (id_ps, info_ps) VALUES (?, ?)";
        const valuesPersonas = [id_us, JSON.stringify(jsonCursos)];
        conxx.query(sqlInsertPersonas, valuesPersonas, (error2, results2) => {
            if (error2) {
                console.error("Error al insertar datos en la tabla personas_tb:", error2);
                res.status(500).json({ error: "Error al insertar datos en la tabla personas_tb" });
                return;
            }
            console.log("***Se agregó el usuario con sus cursos****");
            console.log(req.body);
            res.json({ message: "Datos agregados correctamente en ambas tablas" });
        });
    });
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});


app.listen(5000, () => {
    console.log("El servidor ha iniciado en el puerto 5000");
});
