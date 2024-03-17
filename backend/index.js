import express from "express";
import { estudiantes } from "./studiantes.js";
import { mostrarTabla } from './sql.js';
mostrarTabla();
const app = express();
app.listen(5000,
    ()=> {

        console.log("el servidor ha iniciado");
    }
    
    );


    app.get("/",(req,res)=>{

res.send("<h1> hola mundo </h1>");
res.end();
    }
    );


    app.get("/inicio",(req,res)=>{

        res.send("<h1> hola mundo </h1>");
        res.end();
            }
            );

            app.get("/estudiantes",(req,res)=>{

                res.json(estudiantes);
                res.end();
                    }
                    );