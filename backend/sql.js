import mysql from 'mysql2';

const conxx = mysql.createConnection({
  host: "localhost",
  database: "practica4",
  user: "root",
  password: "1234"
});

export { conxx };

export function mostrarTabla() {
  const sqlQuery = "SELECT * FROM usuarios_tb";
  conxx.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta:", error);
      return;
    }
    console.log("Resultado de la consulta:");
    console.log(results);
  });
}

export function agregarUsuario(usuario) {
  const { id_us, registro_us, nombre_us, apellido_us, contra_us, admin_us, correo_us } = usuario;
  const sqlQuery = `INSERT INTO usuarios_tb (id_us, registro_us, nombre_us, apellido_us, contra_us, admin_us, correo_us) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [id_us, registro_us, nombre_us, apellido_us, contra_us, admin_us, correo_us];
  
  conxx.query(sqlQuery, values, (error, results) => {
    if (error) {
      console.error("Error al agregar usuario:", error);
      return;
    }
    console.log("Usuario agregado correctamente.");
  });
}

export function closeConnection() {
  conxx.end();
  console.error("Conexion terminada");
}
