import { getConnection } from "../db/database"
// interacciones con la base de datos

//! GET
const getDetailLoans = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query('CALL `spGetAllDetailLoans`()'); // GET = SELECT
        console.log(result);

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getDetailLoan = async (req, res) => { // Get for ID
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spGetDetailLoan`(?)', id); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//! POST
const addDetailLoan = async (req, res) => {
    try {
        const { DESCRIPCION, COD_LIBRO, COD_ENC_PRESTAMO, COD_MULTA } = req.body;


        const detail = { DESCRIPCION, COD_LIBRO, COD_ENC_PRESTAMO, COD_MULTA };

        if (NOMBRE === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const connection = await getConnection();

        const result = await connection.query(`CALL spAddDetailLoan('${detail.DESCRIPCION}','${detail.DESCRIPCION}','${detail.DESCRIPCION}','${detail.DESCRIPCION}','${detail.DESCRIPCION}','${detail.DESCRIPCION}',);`);

        // res.json(result); //* Ver informacion completa de la consulta
        res.json({ message: "Genre Added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

//! DELETE
const deleteDetailLoan = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spDeleteDetailLoan`(?)', id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//! PUT
const updateDetailLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const { NOMBRE } = req.body;
        const detail = { NOMBRE }

        if (NOMBRE === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdateDetailLoan('${id}', '${detail.NOMBRE}');`);


        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getDetailLoans,
    getDetailLoan,
    addDetailLoan,
    deleteDetailLoan,
    updateDetailLoan
};