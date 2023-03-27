import { getConnection } from "../db/database"
// interacciones con la base de datos

//! GET
const getTemplates = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM Table"); // GET = SELECT
        console.log(result);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getTemplate = async (req, res) => { // Get for ID
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM Table WHERE id = ?", id); // GET = SELECT

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//! POST
const addTemplate = async (req, res) => {
    try {
        const { row1,row2 } = req.body;

        if (row1 === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const Template = { row1,row2 };
        const connection = await getConnection();

        const result = await connection.query('INSERT INTO Table SET ?', Template);

        // res.json(result); //* Ver informacion completa de la consulta
        res.json({ message: "Template Added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

//! DELETE
const deleteTemplate = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("DELETE FROM Table WHERE id = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//! PUT
const updateTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const { row1,row2 } = req.body;
        const Template = { row1,row2 }

        if (id === undefined || row1 === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const connection = await getConnection();
        const result = await connection.query("UPDATE Table SET ? WHERE id = ?", [Template, id]);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getTemplates,
    getTemplate,
    addTemplate,
    deleteTemplate,
    updateTemplate
};