import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getRoles = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query(`CALL spGetAllRoles()`); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message)
    }
};

const getRole = async (req, res) => { // Get for ID
    try {
        const { id } = req.params;

        // Valida si los campos de la peticion están llenos o no
        if (rol === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el ROL para el usuario" })
        }

        const connection = await getConnection();
        const result = await connection.query(`CALL spGetRole(${id})`); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//* POST
const addRole = async (req, res) => {
    try {
        const { rol } = req.body;
        const Role = { rol };

        if (rol === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el ROL para el usuario" })
        }

        const connection = await getConnection();

        const result = await connection.query(`CALL spAddRole('${Role.rol}')`);

        res.json({ message: "Rol agregado" });
    } catch (error) {

        // Manejo de errores sql
        switch (error.errno) {
            case 1062: // En caso de que se intente crear un recurso ya existente
                return res.status(400).json({ message: "El rol ingresado ya existe" })

            default:
                return res.status(500).send(error.message)
        }

    }
};

//* DELETE
const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spDeleteRole(${id})`);

        // Valida si el recuros a sido eliminado
        switch (result.affectedRows) {
            case 0:
                return res.status(400).json({ message: "Rol no existente" })

            case 1:
                return res.status(202).json({ message: "Rol eliminado" })

            default:
                return res.status(404).json({ message: "Error, intentelo nuevamente mas tarde" })
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
};

//* PUT
const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { rol } = req.body;
        const Role = { rol }

        // Valida si los campos de la peticion están llenos o no
        if (rol === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el ROL para el usuario" })
        }

        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdateRole(${id},'${Role.rol}')`);

        // Valida si el recuros a sido actualizados
        switch (result.affectedRows) {
            case 0:
                return res.status(400).json({ message: "Rol no existente" })

            case 1:
                return res.status(202).json({ message: "Rol actualizado" })

            default:
                return res.status(404).json({ message: "Error, intentelo nuevamente mas tarde" })
        }
    } catch (error) {
        // Manejo de errores sql
        switch (error.errno) {
            case 1062: // En caso de que se intente crear un recurso ya existente
                return res.status(400).json({ message: "El rol ingresado ya existe" })

            default:
                return res.status(500).send(error.message)
        }
    }
};

export const methods = {
    getRoles,
    getRole,
    addRole,
    deleteRole,
    updateRole
};