import { getConnection } from "./../db/database"
// interacciones con la base de datos

// funcion de peticion GET
const getLanguages = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id,name,programmers FROM language"); // GET = SELECT
        console.log(result);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getLanguage = async (req, res) => { // Get for ID
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("SELECT id,name,programmers FROM language WHERE id = ?", id); // GET = SELECT

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* funcion de peticion POST
const addLanguages = async (req, res) => { // POST
    try {
        const { name, programmers } = req.body;

        if (name === undefined || programmers === undefined) {
            res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const language = { name, programmers };
        const connection = await getConnection();

        const result = await connection.query('INSERT INTO language SET ?', language);

        // res.json(result); //* Ver informacion completa de la consulta
        res.json({ message: "Language Added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

//* funcion de peticion DELETE
const deleteLanguage = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("DELETE FROM language WHERE id = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, programmers } = req.body;
        const language = { name, programmers }

        if (id === undefined || name === undefined || programmers === undefined) {
            res.status(400).json({ message: "Bad request. Please fill all field." })
        }
        const connection = await getConnection();
        const result = await connection.query("UPDATE language SET ? WHERE id = ?", [language, id]);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateNameLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const language = { name }

        if (id === undefined || name === undefined) {
            res.status(400).json({ message: "Bad request. Please fill all field." })
        }
        const connection = await getConnection();
        const result = await connection.query("UPDATE language SET ? WHERE id = ?", [language, id]);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateProgrammersLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const { programmers } = req.body;
        const language = { programmers }

        if (id === undefined || programmers === undefined) {
            res.status(400).json({ message: "Bad request. Please fill all field." })
        }
        const connection = await getConnection();
        const result = await connection.query("UPDATE language SET ? WHERE id = ?", [language, id]);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};



export const methods = {
    getLanguages,
    getLanguage,
    addLanguages,
    deleteLanguage,
    updateLanguage,
    updateNameLanguage,
    updateProgrammersLanguage
};