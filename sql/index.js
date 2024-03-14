import mysql from 'mysql2';

function mostrarTabla() {

  const conxx = mysql.createConnection({
    host: "localhost",
    database: "practica4",
    user: "root",
    password: "1234" 
  });


  const sqlQuery = "SELECT * FROM usuarios_tb";

 
  conxx.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta:", error);
      return;
    }

    console.log("Tabla de la base de datos:");
    console.table(results); 

    conxx.end();
  });
}

mostrarTabla();