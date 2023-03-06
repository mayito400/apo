import { config } from "dotenv";

config();

export default{
    //* en caso de no encontrar los valores, se mandará un string vacio
    
    host: process.env.HOST || "",
    database: process.env.DB || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || ""
};