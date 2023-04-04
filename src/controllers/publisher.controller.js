import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getPublishers = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query('CALL `spGetAllPublisher`()'); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getPublisher = async (req, res) => { // Get for ID
    try {
        // console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("CALL `spGetPublisher`(?)", id); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* POST
const addPublisher = async (req, res) => {
    try {
        const { NOM_EDITORIAL, PAIS, CIUDAD, TELEFONO, DIRECCION } = req.body;

        if (NOM_EDITORIAL === undefined || PAIS === undefined || CIUDAD === undefined || TELEFONO === undefined || DIRECCION === undefined) {
            return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        // const Publisher = { NOM_EDITORIAL, PAIS, CIUDAD, TELEFONO, DIRECCION };
        const connection = await getConnection();

        const result = await connection.query(`CALL spAddPublisher('${NOM_EDITORIAL}','${PAIS}','${CIUDAD}','${TELEFONO}','${DIRECCION}');`);

        // res.json(result); //* Ver informacion completa de la consulta
        res.json({ message: "Publisher Added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

//* DELETE
const deletePublisher = async (req, res) => {
    try {
        // console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spDeletePublisher(${id})`);
        console.log(result);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* PUT
const updatePublisher = async (req, res) => {
    try {
        const { id } = req.params;
        const { NOM_EDITORIAL, PAIS, CIUDAD, TELEFONO, DIRECCION } = req.body;
        const Publisher = { NOM_EDITORIAL, PAIS, CIUDAD, TELEFONO, DIRECCION }

        if (NOM_EDITORIAL === undefined || PAIS === undefined || CIUDAD === undefined || TELEFONO === undefined || DIRECCION === undefined) {
            return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdatePublisher('${id}','${Publisher.NOM_EDITORIAL}','${Publisher.PAIS}','${Publisher.CIUDAD}','${Publisher.TELEFONO}','${Publisher.DIRECCION}');`);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getPublishers,
    getPublisher,
    addPublisher,
    deletePublisher,
    updatePublisher
};