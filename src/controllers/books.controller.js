// interacciones con la base de datos
import { getConnection } from "../db/database"

//* GET
const getBooks = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query('CALL `spGetAllbooks`()'); // GET = SELECT
        console.log(result);

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getBook = async (req, res) => { // Get for ID
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spGetBooks`(?)', id); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//! POST
const addBook = async (req, res) => {
    try {
        const { SINOPSIS, TITULO, FECHA_PUBLICACION, NUM_SERIE, _COD_GENERO, COD_AUTOR } = req.body;
        const books = { SINOPSIS, TITULO, FECHA_PUBLICACION, NUM_SERIE, _COD_GENERO, COD_AUTOR };

        if (SINOPSIS === undefined || TITULO === undefined || FECHA_PUBLICACION === undefined || NUM_SERIE === undefined || _COD_GENERO === undefined || COD_AUTOR === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const connection = await getConnection();

        const result = await connection.query(`CALL spAddBooks('${books.SINOPSIS}','${books.TITULO}','${books.FECHA_PUBLICACION}','${books.NUM_SERIE}','${books._COD_GENERO}','${books.COD_AUTOR}');`);

        // res.json(result); //* Ver informacion completa de la consulta
        res.json({ message: "Genre Added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

//! DELETE
const deleteBook = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spDeleteBooks`(?)', id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//! PUT
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { SINOPSIS, TITULO, FECHA_PUBLICACION, NUM_SERIE, _COD_GENERO, COD_AUTOR } = req.body;
        const Genre = { SINOPSIS, TITULO, FECHA_PUBLICACION, NUM_SERIE, _COD_GENERO, COD_AUTOR }

        if (SINOPSIS === undefined || TITULO === undefined || FECHA_PUBLICACION === undefined || NUM_SERIE === undefined || _COD_GENERO === undefined || COD_AUTOR === undefined) {

           return res.status(400).json({ message: "Bad request. Please fill all field." })

        }
            const connection = await getConnection();

        const result = await connection.query(`CALL spUpdateBooks('${id}', '${books.SINOPSIS}','${books.TITULO}','${books.FECHA_PUBLICACION}','${books.NUM_SERIE}','${books._COD_GENERO}','${books.COD_AUTOR}');`);


        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getBooks,
    getBook,
    addBook,
    deleteBook,
    updateBook
};