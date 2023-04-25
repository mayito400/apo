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
        const result = await connection.query('CALL `spGetBook`(?)', id); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* POST
const addBook = async (req, res) => {
    try {
        const { SIPNOPSIS, TITULO, FECHA_PUBLICACION, NUM_SERIE, COD_GENERO, COD_AUTOR } = req.body;


        const book = { SIPNOPSIS,TITULO, FECHA_PUBLICACION, NUM_SERIE, COD_GENERO, COD_AUTOR };

        if (SIPNOPSIS === undefined || TITULO === undefined || FECHA_PUBLICACION === undefined || NUM_SERIE === undefined || COD_GENERO === undefined || COD_AUTOR === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }
 
        const connection = await getConnection();

        const result = await connection.query(`CALL spAddBook('${book.SIPNOPSIS}','${book.TITULO}','${book.FECHA_PUBLICACION}','${book.NUM_SERIE}','${book.COD_GENERO}','${book.COD_AUTOR}');`);

         //res.json(result); //* Ver informacion completa de la consulta
        res.json({ message: "Book Added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

//* DELETE
const deleteBook = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spDeleteBook`(?)', id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* PUT
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { SIPNOPSIS, TITULO, FECHA_PUBLICACION, NUM_SERIE, COD_GENERO, COD_AUTOR } = req.body;
        const books = { SIPNOPSIS, TITULO, FECHA_PUBLICACION, NUM_SERIE, COD_GENERO, COD_AUTOR }

        if (SIPNOPSIS === undefined || TITULO === undefined || FECHA_PUBLICACION === undefined || NUM_SERIE === undefined || COD_GENERO === undefined || COD_AUTOR === undefined) {

           return res.status(400).json({ message: "Bad request. Please fill all field." })

        }
            const connection = await getConnection();

        const result = await connection.query(`CALL spUpdateBook('${id}', '${books.SIPNOPSIS}','${books.TITULO}','${books.FECHA_PUBLICACION}','${books.NUM_SERIE}','${books.COD_GENERO}','${books.COD_AUTOR}');`);


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