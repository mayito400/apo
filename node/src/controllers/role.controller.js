import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getRoles = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM `rol`"); // GET = SELECT
        console.log(result);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getRole = async (req, res) => { // Get for ID
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM `rol` WHERE `cod_rol` = ?", id); // GET = SELECT

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* POST
const addRole = async (req, res) => {
    try {
        const { rol } = req.body;

        if (rol === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const Role = { rol };
        const connection = await getConnection();

        const result = await connection.query('INSERT INTO `rol` SET ?', Role);

        // res.json(result); //* Ver informacion completa de la consulta
        res.json({ message: "Role Added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

//* DELETE
const deleteRole = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("DELETE FROM `rol` WHERE `cod_rol` = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* PUT
const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { rol } = req.body;
        const Role = { rol }

        if (rol === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const connection = await getConnection();
        const result = await connection.query("UPDATE `rol` SET ? WHERE `cod_rol` = ?", [Role, id]);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getRoles,
    getRole,
    addRole,
    deleteRole,
    updateRole
};