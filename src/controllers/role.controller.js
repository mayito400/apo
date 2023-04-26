import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getRoles = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query(`CALL spGetRoles()`); // GET = SELECT
        // console.log(result);

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getRole = async (req, res) => { // Get for ID
    try {
        // console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spGetRole(${id})`); // GET = SELECT

        res.json(result[0]);
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

        const result = await connection.query(`CALL spAddRoles('${Role.rol}')`);

        // res.json(result); //Ver informacion completa de la consulta
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
        const result = await connection.query(`CALL spDeleteRole(${id})`);

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
        const result = await connection.query(`CALL spUpdateRol(${id},'${Role.rol}')`);

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