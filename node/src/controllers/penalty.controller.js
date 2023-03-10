import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getPenaltys = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM `multa`"); // GET = SELECT
        console.log(result);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getPenalty = async (req, res) => { // Get for ID
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM `multa` WHERE `COD_MULTA` = ?", id); // GET = SELECT

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* POST
const addPenalty = async (req, res) => { // POST
    try {
        const { FECHA_INICIO, FECHA_FIN, VALOR } = req.body;

        if ( FECHA_INICIO === undefined || FECHA_FIN === undefined || VALOR === undefined ) {
            return res.status(400).json({ message: "Bad request. Please fill all field." })
        };

        const Penalty = { FECHA_INICIO, FECHA_FIN, VALOR }
        const connection = await getConnection();

        const result = await connection.query('INSERT INTO `multa` SET ?', Penalty);

        // res.json(result); //* Ver informacion completa de la consulta
        res.json({ message: "Penalty Added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

//* DELETE
const deletePenalty = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("DELETE FROM `multa` WHERE `COD_MULTA` = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* PUT
const updatePenalty = async (req, res) => {
    try {
        const { id } = req.params;
        const { FECHA_INICIO, FECHA_FIN, VALOR } = req.body;
        const Penalty = { FECHA_INICIO, FECHA_FIN, VALOR }

        if ( FECHA_INICIO === undefined || FECHA_FIN === undefined || VALOR === undefined ) {
            return res.status(400).json({ message: "Bad request. Please fill all field." })
        };

        const connection = await getConnection();
        const result = await connection.query("UPDATE `multa` SET ? WHERE `COD_MULTA` = ?", [Penalty, id]);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getPenaltys,
    getPenalty,
    addPenalty,
    deletePenalty,
    updatePenalty
};