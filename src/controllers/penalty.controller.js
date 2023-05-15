import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getPenaltys = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query(`CALL spGetAllPenaltys()`); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getPenalty = async (req, res) => { // Get for ID
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spGetPenalty(${id})`); // GET = SELECT

        // Valida si el recurso devuelto está vacio
        if (result[0][0] === undefined) {
            return res.status(404).json({ message: "La multa consultada no existe" })
        }

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//* POST
const addPenalty = async (req, res) => { // POST
    try {
        const { FECHA_INICIO, FECHA_FIN, VALOR } = req.body;
        const Penalty = { FECHA_INICIO, FECHA_FIN, VALOR }

        // Valida si los campos de la peticion están llenos o no
        if (FECHA_INICIO === undefined) {
            return res.status(400).json({ message: "Ingrese la FECHA DE INICIO" })
        };

        if (FECHA_FIN === undefined) {
            return res.status(400).json({ message: "Ingrese la FECHA DE FIN" })
        };

        if (VALOR === undefined) {
            return res.status(400).json({ message: "Ingrese el VALOR de la multa" })
        };

        const connection = await getConnection();

        await connection.query(`CALL spAddPenalty('${Penalty.FECHA_INICIO}', '${Penalty.FECHA_FIN}', ${Penalty.VALOR})`);

        res.json({ message: "Multa añadida" });
    } catch (error) {

        // Manejo de errores sql
        switch (error.errno) {
            case 1062: // En caso de que se intente crear un recurso ya existente
                return res.status(400).json({ message: "La multa ingresada ya existe" })

            default:
                return res.status(500).send(error.message)
        }

    }
};

//* DELETE
const deletePenalty = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spDeletePenalty(${id})`);

        // Valida si el recuros a sido eliminado
        switch (result.affectedRows) {
            case 0:
                return res.status(400).json({ message: "Multa no existente" })

            case 1:
                return res.status(202).json({ message: "Multa eliminada" })

            default:
                return res.status(404).json({ message: "Error, intentelo nuevamente mas tarde" })
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
};

//* PUT
const updatePenalty = async (req, res) => {
    try {
        const { id } = req.params;
        const { FECHA_INICIO, FECHA_FIN, VALOR } = req.body;
        const Penalty = { FECHA_INICIO, FECHA_FIN, VALOR }

        // Valida si los campos de la peticion están llenos o no
        if (FECHA_INICIO === undefined) {
            return res.status(400).json({ message: "Ingrese la FECHA DE INICIO" })
        };

        if (FECHA_FIN === undefined) {
            return res.status(400).json({ message: "Ingrese la FECHA DE FIN" })
        };

        if (VALOR === undefined) {
            return res.status(400).json({ message: "Ingrese el VALOR de la multa" })
        };

        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdatePenalty(${id},'${Penalty.FECHA_INICIO}','${Penalty.FECHA_FIN}',${Penalty.VALOR})`);

        // Valida si el recuros a sido actualizado
        switch (result.affectedRows) {
            case 0:
                return res.status(400).json({ message: "Multa no existente" });

            case 1:
                return res.status(202).json({ message: "Datos de la multa actualizados" });

            default:
                return res.status(404).json({ message: "Error, intentelo nuevamente mas tarde" });
        }
    } catch (error) {
        // Manejo de errores sql
        switch (error.errno) {
            case 1062: // En caso de que se intente crear un recurso ya existente
                return res.status(400).json({ message: "La multa ingresada ya existe" })

            default:
                return res.status(500).send(error.message)
        }
    }
};

export const methods = {
    getPenaltys,
    getPenalty,
    addPenalty,
    deletePenalty,
    updatePenalty
};