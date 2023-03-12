import mysql from "promise-mysql";
import config from "../config/config";

//* se crea la conexion a la base de datos
const connection = mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
});

//* funcion que retorna la conexion
const getConnection=()=>{
    return connection;
};

module.exports = {
    getConnection
}