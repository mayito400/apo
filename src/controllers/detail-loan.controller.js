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
        const { COD_DETALLE, DESCRIPCION,COD_LIBRO, COD_ENC_PRESTAMO, COD_MULTA } = req.body;


        const detail = { COD_DETALLE, DESCRIPCION,COD_LIBRO,  COD_ENC_PRESTAMO, COD_MULTA };

        if (COD_DETALLE === undefined || DESCRIPCION === undefined || COD_LIBRO === undefined || COD_ENC_PRESTAMO === undefined || COD_MULTA === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const connection = await getConnection();

        const result = await connection.query(`CALL spAddDetailLoan('${detail.COD_DETALLE}','${detail.DESCRIPCION}','${detail.COD_LIBRO}','${detail.COD_ENC_PRESTAMO}','${detail.COD_MULTA}',);`);

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
        const { COD_DETALLE, DESCRIPCION,COD_LIBRO, COD_ENC_PRESTAMO, COD_MULTA } = req.body;
        const detail = { COD_DETALLE, DESCRIPCION,COD_LIBRO,  COD_ENC_PRESTAMO, COD_MULTA };

        if (COD_DETALLE === undefined || DESCRIPCION === undefined || COD_LIBRO === undefined || COD_ENC_PRESTAMO === undefined || COD_MULTA === undefined) {
            return res.status(400).json({ message: "Bad request. Please fill all field." })
         }
 

        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdateDetailLoan('${id}', '${detail.COD_DETALLE}','${detail.DESCRIPCION}','${detail.COD_LIBRO}','${detail.COD_ENC_PRESTAMO}','${detail.COD_MULTA}',);`);


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