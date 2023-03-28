import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getUsers = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query(`CALL spGetAllUsers()`); // GET = SELECT
        console.log(result);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getUser = async (req, res) => { // Get for DNI
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spGetUser(${id})`); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* POST
const addUser = async (req, res) => { // POST
    try {
        const { DNI_USUARIO, NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASEÑA, CORREO, SEXO, ESTADO, COD_ROL } = req.body;

        if (DNI_USUARIO === undefined || NOM_USUARIO === undefined || APELL_USUARIO === undefined || FECHA_NAC === undefined || CONTRASEÑA === undefined || CORREO === undefined || SEXO === undefined || ESTADO === undefined || COD_ROL === undefined) {
            return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const user = { DNI_USUARIO, NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASEÑA, CORREO, SEXO, ESTADO, COD_ROL };
        const connection = await getConnection();

        const result = await connection.query(`CALL spAddUser('${user.DNI_USUARIO}','${user.NOM_USUARIO}','${user.APELL_USUARIO}','${user.FECHA_NAC}','${user.CONTRASEÑA}','${user.CORREO}','${user.SEXO}','${user.ESTADO}','${user.COD_ROL}');`);
        // res.json(user)
        // res.json(result); 
        res.json({ message: "User Added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

//* DELETE
const deleteUser = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("CALL `spDeleteUser`(?)", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* Put
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {  NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASEÑA, CORREO, SEXO, ESTADO, COD_ROL } = req.body;
        const user = {  NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASEÑA, CORREO, SEXO, ESTADO, COD_ROL };

        if (NOM_USUARIO === undefined || APELL_USUARIO === undefined || FECHA_NAC === undefined || CONTRASEÑA === undefined || CORREO === undefined || SEXO === undefined || ESTADO === undefined || COD_ROL === undefined) {
            return res.status(400).json({ message: "Bad request. Please fill all field." })
        };

        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdateUser('${id}','${user.NOM_USUARIO}','${user.APELL_USUARIO}','${user.FECHA_NAC}','${user.CONTRASEÑA}','${user.CORREO}','${user.SEXO}','${user.ESTADO}','${user.COD_ROL}');`);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
};

export const methods = {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
};