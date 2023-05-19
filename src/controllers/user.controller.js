import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getUsers = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query(`CALL spGetAllUsers()`);

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message)
    }
};
const getUser = async (req, res) => { // Get for DNI
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spGetUser(${id})`); // GET = SELECT

        // Valida si el recurso devuelto está vacio
        if (result[0][0] === undefined) {
            return res.status(404).json({ message: "El usuario ingresado no existe" })
        }

        res.json(result[0])
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//* POST
const addUser = async (req, res) => { // POST
    try {
        const { DNI_USUARIO, NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASEÑA, CORREO, SEXO, ESTADO, COD_ROL } = req.body;

        const user = { DNI_USUARIO, NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASEÑA, CORREO, SEXO, ESTADO, COD_ROL };

        // Valida si los campos de la peticion están llenos o no
        if (DNI_USUARIO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese su DNI" })
        }

        if (NOM_USUARIO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese su NOMBRE" })
        }

        if (APELL_USUARIO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese sus APELLIDOS" })
        }

        if (FECHA_NAC === undefined) {
            return res.status(400).json({ message: "Por favor ingrese su FECHA DE NACIMIENTO" })
        }

        if (CONTRASEÑA === undefined) {
            return res.status(400).json({ message: "Por favor ingrese su CONTRASEÑA" })
        }

        if (CORREO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese su CORREO ELECTRONICO" })
        }

        if (SEXO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese su SEXO" })
        }

        if (ESTADO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese su ESTADO" })
        }

        if (COD_ROL === undefined) {
            return res.status(400).json({ message: "Por favor ingrese su ROL" })
        }

        const connection = await getConnection();

        await connection.query(`CALL spAddUser('${user.DNI_USUARIO}','${user.NOM_USUARIO}','${user.APELL_USUARIO}','${user.FECHA_NAC}','${user.CONTRASEÑA}','${user.CORREO}','${user.SEXO}','${user.ESTADO}','${user.COD_ROL}');`);

        res.status(201).json({ message: "Usuario añadido" });
    } catch (error) {

        // Manejo de errores sql
        switch (error.errno) {
            case 1062: // En caso de que se intente crear un recurso ya existente
                return res.status(400).json({ message: "El DNI ingresado ya existe" })

            default:
                return res.status(500).send(error.message)
        }

    }
};

//* DELETE
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("CALL `spDeleteUser`(?)", id);

        // Valida si el recuros a sido eliminado
        switch (result.affectedRows) {
            case 0:
                return res.status(400).json({ message: "Usuario no existente" })

            case 1:
                return res.status(202).json({ message: "Usuario eliminado" })

            default:
                return res.status(404).json({ message: "Error, intentelo nuevamente mas tarde" })
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
};

//* Put
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASEÑA, CORREO, SEXO, ESTADO, COD_ROL } = req.body;
        const user = { NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASEÑA, CORREO, SEXO, ESTADO, COD_ROL };

        // Valida si los campos de la peticion están llenos o no
        if (NOM_USUARIO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese su NOMBRE" })
        }

        if (APELL_USUARIO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese sus APELLIDOS" })
        }

        if (FECHA_NAC === undefined) {
            return res.status(400).json({ message: "Por favor ingrese su FECHA DE NACIMIENTO" })
        }

        if (CONTRASEÑA === undefined) {
            return res.status(400).json({ message: "Por favor ingrese su CONTRASEÑA" })
        }

        if (CORREO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese su CORREO ELECTRONICO" })
        }

        if (SEXO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese su SEXO" })
        }

        if (ESTADO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese su ESTADO" })
        }

        if (COD_ROL === undefined) {
            return res.status(400).json({ message: "Por favor ingrese su ROL" })
        }

        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdateUser('${id}','${user.NOM_USUARIO}','${user.APELL_USUARIO}','${user.FECHA_NAC}','${user.CONTRASEÑA}','${user.CORREO}','${user.SEXO}','${user.ESTADO}','${user.COD_ROL}');`);

        // Valida si el recuros a sido actualizado
        switch (result.affectedRows) {
            case 0:
                return res.status(400).json({ message: "Usuario no existente" });

            case 1:
                return res.status(202).json({ message: "Datos del usuario actualizados" });

            default:
                return res.status(404).json({ message: "Error, intentelo nuevamente mas tarde" });
        }
    } catch (error) {
        // Manejo de errores sql
        switch (error.errno) {
            case 1062: // En caso de que se intente crear un recurso ya existente
                return res.status(400).json({ message: "El DNI ingresado ya existe" })

            default:
                return res.status(500).send(error.message)
        }
    }
};

export const methods = {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
};