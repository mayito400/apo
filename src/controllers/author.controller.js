import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getAuthors = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query('CALL spGetAllAuthors()'); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message)
    }
};

const getAuthor = async (req, res) => { // Get for ID
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spGetAuthor(${id})`); // GET = SELECT

        // Valida si el recurso devuelto está vacio
        if (result[0][0] === undefined) {
            return res.status(404).json({ message: "El autor ingresado no existe" })
        }

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//* POST
const addAuthor = async (req, res) => {
    try {
        const { NOM_AUTOR, FECHA_NACIMIENTO, LUGAR_NACIMIENTO, FECHA_MUERTE, OCUPACIONES, MOVIMIENTO_LITERARIO } = req.body;
        const Author = { NOM_AUTOR, FECHA_NACIMIENTO, LUGAR_NACIMIENTO, FECHA_MUERTE, OCUPACIONES, MOVIMIENTO_LITERARIO };

        // Valida si los campos de la peticion están llenos o no
        if (NOM_AUTOR === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el NOMBRE del autor" })
        }

        if (FECHA_NACIMIENTO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese la FECHA DE NACIMIENTO del autor" })
        }

        if ( LUGAR_NACIMIENTO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el LUGAR DE NACIMIENTO del autor" })
        }

        if (FECHA_MUERTE === undefined) {
            return res.status(400).json({ message: "Por favor ingrese la FECHA DE MUERTE del autor" })
        }

        if (OCUPACIONES === undefined) {
            return res.status(400).json({ message: "Por favor ingrese las OCUPACIONES del autor" })
        }

        if (MOVIMIENTO_LITERARIO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el MOVIMIENTO LITERARIO del autor" })
        }

        const connection = await getConnection();

        await connection.query(`CALL spAddAuthor('${Author.NOM_AUTOR}', '${Author.FECHA_NACIMIENTO}', '${Author.LUGAR_NACIMIENTO}', '${Author.FECHA_MUERTE}', '${Author.OCUPACIONES}', '${Author.MOVIMIENTO_LITERARIO}')`);

        res.status(201).json({ message: "Autor añadido" });
    } catch (error) {

        // Manejo de errores sql
        switch (error.errno) {
            case 1062: // En caso de que se intente crear un recurso ya existente
                return res.status(400).json({ message: "El autor ingresado ya existe" })

            default:
                return res.status(500).send(error.message)
        }

    }
};

//* DELETE
const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spDeleteAuthor(${id})`);

        // Valida si el recuros a sido eliminado
        switch (result.affectedRows) {
            case 0:
                return res.status(400).json({ message: "El autor ingresado no existe" })

            case 1:
                return res.status(202).json({ message: "Autor eliminado" })

            default:
                return res.status(404).json({ message: "Error, intentelo nuevamente mas tarde" })
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
};

//* PUT
const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const { NOM_AUTOR, FECHA_NACIMIENTO, LUGAR_NACIMIENTO, FECHA_MUERTE, OCUPACIONES, MOVIMIENTO_LITERARIO } = req.body;
        const Author = { NOM_AUTOR, FECHA_NACIMIENTO, LUGAR_NACIMIENTO, FECHA_MUERTE, OCUPACIONES, MOVIMIENTO_LITERARIO };

        // Valida si los campos de la peticion están llenos o no
        if (NOM_AUTOR === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el NOMBRE del autor" })
        }

        if (FECHA_NACIMIENTO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese la FECHA DE NACIMIENTO del autor" })
        }

        if ( LUGAR_NACIMIENTO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el LUGAR DE NACIMIENTO del autor" })
        }

        if (FECHA_MUERTE === undefined) {
            return res.status(400).json({ message: "Por favor ingrese la FECHA DE MUERTE del autor" })
        }

        if (OCUPACIONES === undefined) {
            return res.status(400).json({ message: "Por favor ingrese las OCUPACIONES del autor" })
        }

        if (MOVIMIENTO_LITERARIO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el MOVIMIENTO LITERARIO del autor" })
        }

        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdateAuthor(${id}, '${Author.NOM_AUTOR}', '${Author.FECHA_NACIMIENTO}', '${Author.LUGAR_NACIMIENTO}', '${Author.FECHA_MUERTE}', '${Author.OCUPACIONES}', '${Author.MOVIMIENTO_LITERARIO}')`);

        // Valida si el recuros a sido eliminado
        switch (result.affectedRows) {
            case 0:
                return res.status(400).json({ message: "El autor ingresado no existe" })

            case 1:
                return res.status(202).json({ message: "Datos del autor actualizados" })

            default:
                return res.status(404).json({ message: "Error, intentelo nuevamente mas tarde" })
        }
    } catch (error) {

        // Manejo de errores sql
        switch (error.errno) {
            case 1062: // En caso de que se intente crear un recurso ya existente
                return res.status(400).json({ message: "El autor ingresado ya existe" })

            default:
                return res.status(500).send(error.message)
        }

    }
};

export const methods = {
    getAuthors,
    getAuthor,
    addAuthor,
    deleteAuthor,
    updateAuthor
};