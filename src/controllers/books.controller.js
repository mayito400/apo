// interacciones con la base de datos
import { getConnection } from "../db/database"

//* GET
const getBooks = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query('CALL `spGetAllbooks`()');

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getBook = async (req, res) => { // Get for ID
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spGetBook`(?)', id); // GET = SELECT

        if (result[0][0] === undefined) {
            return res.status(404).json({ message: "El libro ingresado no existe" })
        }

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

        const book = { SIPNOPSIS, TITULO, FECHA_PUBLICACION, NUM_SERIE, COD_GENERO, COD_AUTOR };

        if (SIPNOPSIS === undefined) {
            return res.status(400).json({ message: "Por favor ingrese la SINOPSIS del libro" })
        }

        if (TITULO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el TITULO del libro" })
        }

        if (FECHA_PUBLICACION === undefined) {
            return res.status(400).json({ message: "Por favor ingrese la FECHA DE PUBLICACION del libro" })
        }

        if (NUM_SERIE === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el NUMERO DE SERIE del libro" })
        }

        if (COD_GENERO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el GENERO del libro" })
        }

        if (COD_AUTOR === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el AUTOR del libro" })
        }

        const connection = await getConnection();

        await connection.query(`CALL spAddBook('${book.SIPNOPSIS}','${book.TITULO}','${book.FECHA_PUBLICACION}','${book.NUM_SERIE}','${book.COD_GENERO}','${book.COD_AUTOR}');`);

        res.status(201).json({ message: "Libro añadido" });
    } catch (error) {

        switch (error.errno) {
            case 1062:
                return res.status(400).json({ message: "El libro ingresado ya existe" })
            case 1452:
                return res.status(400).json({ message: "Revise que el genero y autor estén registrados" })

            default:
                return res.status(500).send(error.message)
        }

    }
};

//* DELETE
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spDeleteBook`(?)', id);

        switch (result.affectedRows) {
            case 0:
                return res.status(400).json({ message: "Libro no existente" })

            case 1:
                return res.status(202).json({ message: "Libro eliminado" })

            default:
                return res.status(404).json({ message: "Error, intentelo nuevamente mas tarde" })
        }

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

        if (SIPNOPSIS === undefined) {
            return res.status(400).json({ message: "Por favor ingrese la SINOPSIS del libro" })
        }

        if (TITULO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el TITULO del libro" })
        }

        if (FECHA_PUBLICACION === undefined) {
            return res.status(400).json({ message: "Por favor ingrese la FECHA DE PUBLICACION del libro" })
        }

        if (NUM_SERIE === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el NUMERO DE SERIE del libro" })
        }

        if (COD_GENERO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el GENERO del libro" })
        }

        if (COD_AUTOR === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el AUTOR del libro" })
        }
        const connection = await getConnection();

        const result = await connection.query(`CALL spUpdateBook('${id}', '${books.SIPNOPSIS}','${books.TITULO}','${books.FECHA_PUBLICACION}','${books.NUM_SERIE}','${books.COD_GENERO}','${books.COD_AUTOR}');`);

        switch (result.affectedRows) {
            case 0:
                return res.status(400).json({ message: "Libro no existente" })

            case 1:
                return res.status(202).json({ message: "Datos del libro actualizados" });

            default:
                return res.status(404).json({ message: "Error, intentelo nuevamente mas tarde" })
        }
    } catch (error) {
        switch (error.errno) {
            case 1062:
                return res.status(400).json({ message: "El libro ingresado ya existe" })

            case 1452:
                return res.status(400).json({ message: "Revise que el genero y autor estén registrados" })

            default:
                return res.status(500).send(error.message)
        }
    }
};

export const methods = {
    getBooks,
    getBook,
    addBook,
    deleteBook,
    updateBook
};