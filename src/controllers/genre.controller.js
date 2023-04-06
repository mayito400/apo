import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getGenres = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query('CALL `spGetAllGenre`()'); // GET = SELECT
        console.log(result);

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getGenre = async (req, res) => { // Get for ID
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spGetGenre`(?)', id); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* POST
const addGenre = async (req, res) => {
    try {
        const { NOMBRE } = req.body;

        if (NOMBRE === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const Genre = { NOMBRE };
        const connection = await getConnection();

        const result = await connection.query(`CALL spAddGenre('${Genre.NOMBRE}');`);

        // res.json(result); //* Ver informacion completa de la consulta
        res.json({ message: "Genre Added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

//* DELETE
const deleteGenre = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spDeleteGenre`(?)', id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* PUT
const updateGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const { NOMBRE } = req.body;
        const Genre = { NOMBRE }

        if (NOMBRE === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdateGenre('${id}', '${Genre.NOMBRE}');`);


        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getGenres,
    getGenre,
    addGenre,
    deleteGenre,
    updateGenre
};