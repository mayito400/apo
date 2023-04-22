import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getPublishings = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query('CALL `spGetAllPublishings`()'); // GET = SELECT
        console.log(result);

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getPublishing = async (req, res) => { // Get for ID
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spGetPublishing`(?)', id); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* POST
const addPublishing = async (req, res) => {
    try {
        const { COD_LIBRO, COD_EDITORIAL } = req.body;
        const Publishing = { COD_LIBRO, COD_EDITORIAL };

        if (COD_LIBRO === undefined || COD_EDITORIAL === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." });
        }

        const connection = await getConnection();

        const result = await connection.query(`CALL spAddPublishing('${Publishing.COD_LIBRO}','${Publishing.COD_EDITORIAL}');`);

        // res.json(result); //* Ver informacion completa de la consulta
        res.json({ message: "Publishing Added"});
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

//* DELETE
const deletePublishing = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spDeletePublishing`(?)', id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* PUT
const updatePublishing = async (req, res) => {
    try {
        const { id } = req.params;
        const { COD_LIBRO, COD_EDITORIAL } = req.body;
        const Publishing = { COD_LIBRO, COD_EDITORIAL };

        if (COD_LIBRO === undefined || COD_EDITORIAL === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const connection = await getConnection();

        const result = await connection.query(`CALL spUpdatePublishing('${id}','${Publishing.COD_LIBRO}','${Publishing.COD_EDITORIAL}');`);


        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getPublishings,
    getPublishing,
    addPublishing,
    deletePublishing,
    updatePublishing
};