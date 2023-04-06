import { getConnection } from "../db/database"
// interacciones con la base de datos

//TODO: Solucionar error, el get por id funciona pero el general no
const getAuthors = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query(`CALL spGetAllAuthor();`); // GET = SELECT
        console.log(result);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
};
const getAuthor = async (req, res) => { // Get for ID
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spGetAuthorForId(${id})`); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* POST
const addAuthor = async (req, res) => {
    try {
        const { NOM_AUTOR, FECHA_NACIMIENTO, LUGAR_NACIMIENTO, FECHA_MUERTE, OCUPACIONES, MOVIMIENTO_LITERARIO } = req.body;

        if (NOM_AUTOR === undefined || FECHA_NACIMIENTO === undefined || LUGAR_NACIMIENTO === undefined || FECHA_MUERTE === undefined || OCUPACIONES === undefined || MOVIMIENTO_LITERARIO === undefined) {
            return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const Author = { NOM_AUTOR, FECHA_NACIMIENTO, LUGAR_NACIMIENTO, FECHA_MUERTE, OCUPACIONES, MOVIMIENTO_LITERARIO };
        const connection = await getConnection();

        const result = await connection.query(`CALL spInsertAuthor('${Author.NOM_AUTOR}', '${Author.FECHA_NACIMIENTO}', '${Author.LUGAR_NACIMIENTO}', '${Author.FECHA_MUERTE}', '${Author.OCUPACIONES}', '${Author.MOVIMIENTO_LITERARIO}')`);

        // res.json(result); //* Ver informacion completa de la consulta
        res.json({ message: "Author Added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

//* DELETE
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

//* PUT
const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const { NOM_AUTOR, FECHA_NACIMIENTO, LUGAR_NACIMIENTO, FECHA_MUERTE, OCUPACIONES, MOVIMIENTO_LITERARIO } = req.body;
        
        if (id === undefined || NOM_AUTOR === undefined || FECHA_NACIMIENTO === undefined || LUGAR_NACIMIENTO === undefined || FECHA_MUERTE === undefined || OCUPACIONES === undefined || MOVIMIENTO_LITERARIO === undefined) {
            return res.status(400).json({ message: "Bad request. Please fill all field." })
        }
        
        const Author = { NOM_AUTOR, FECHA_NACIMIENTO, LUGAR_NACIMIENTO, FECHA_MUERTE, OCUPACIONES, MOVIMIENTO_LITERARIO };

        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdateAuthor(${id}, '${Author.NOM_AUTOR}', '${Author.FECHA_NACIMIENTO}', '${Author.LUGAR_NACIMIENTO}', '${Author.FECHA_MUERTE}', '${Author.OCUPACIONES}', '${Author.MOVIMIENTO_LITERARIO}')`);

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