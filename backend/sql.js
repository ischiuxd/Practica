import mysql from 'mysql2';

const conxx = mysql.createConnection({
  host: "localhost",
  database: "practica4",
  user: "root",
  password: "1234"
});

export function mostrarTabla() {
  const sqlQuery = "SELECT * FROM usuarios_tb";

  conxx.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta:", error);
      return;
    }

    console.log("Tabla de la base de datos:");
    console.table(results);
  });

  closeConnection();
}

export function addUser(nombre_us, contra_us, admin_us) {
  const sqlQuery = "INSERT INTO usuarios_tb (nombre_us, contra_us, admin_us) VALUES (?, ?, ?)";

  conxx.query(sqlQuery, [nombre_us, contra_us, admin_us], (error, results) => {
    if (error) {
      console.error("Error al insertar el usuario:", error);
      return;
    }

    console.log(`Usuario '${nombre_us}' agregado exitosamente.`);
  });

  closeConnection();
}

export function closeConnection() {
  conxx.end();
}
