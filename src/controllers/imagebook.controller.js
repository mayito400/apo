// interacciones con la base de datos
import getConnection from "../db/database";

//! GET
const getimagebooks = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query(`CALL spGetAllImageBooks()`); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
// const result = await connection.query('CALL `spGetAllImageBooks`()'); // GET = SELECT

const getimagebook = async (req, res) => { // Get for ID
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spGetImageBook`(?)', id); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error);
    }
};

//! POST
const addimagebook = async (req, res) => {
    try {
        const { NOMBRE } = req.body;

        if (NOMBRE === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const  image= { NOMBRE };
        const connection = await getConnection();

        const result = await connection.query(`CALL spAddImageBook('${NOMBRE}');`);

        // res.json(result); //* Ver informacion completa de la consulta
        res.json({ message: " Added" });
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
};

//! DELETE
const deleteimagebook = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spDeleteImageBook`(?)', id);

        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

//! PUT
const updateimagebook = async (req, res) => {
    try {
        const { id } = req.params;
        const { NOMBRE } = req.body;
        const  image= { NOMBRE }

        if (NOMBRE === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdateImageBook('${id}', '${NOMBRE}');`);


        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const methods = {
    getimagebooks,
    getimagebook,
    addimagebook,
    deleteimagebook,
    updateimagebook
};