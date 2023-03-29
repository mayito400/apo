import { getConnection } from "../db/database"
// interacciones con la base de datos

//! GET
const getAuthors = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query(`CALL spGetAuthor()`); // GET = SELECT
        console.log(result);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getAuthor = async (req, res) => { // Get for ID
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spGetAuthor(${id})`); // GET = SELECT

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//! POST
const addAuthor = async (req, res) => {
    try {
        const { row1,row2 } = req.body;

        if (row1 === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const Author = { row1,row2 };
        const connection = await getConnection();

        const result = await connection.query(`CALL spAddAuthor(${Author})`);

        // res.json(result); //* Ver informacion completa de la consulta
        res.json({ message: "Author Added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

//! DELETE
const deleteAuthor = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spDeleteAuthor(${id})`);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//! PUT
const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const { row1,row2 } = req.body;
        const Author = { row1,row2 }

        if (id === undefined || row1 === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdateAuthor(${id},'${Author}')`);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getAuthors,
    getAuthor,
    addAuthor,
    deleteAuthor,
    updateAuthor
};