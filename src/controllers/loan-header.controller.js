import { getConnection } from "../db/database"
// interacciones con la base de datos

//* funcion de peticion GET
const getLoanHeaders = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query(`CALL spGetAllHeaderLoan()`); // GET = SELECT
        // console.log(result);

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getLoanHeader = async (req, res) => { // Get for ID
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spGetHeaderLoan(?)`,id); // GET = SELECT

        if (result[0][0] === undefined) {
            
            return res.status(404).json({ message: "El Prestamo No se encontró"});
        }

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* funcion de peticion POST
const addLoanHeader = async (req, res) => { // POST
    try {
        const { FECHA_PRESTAMO, CANT_LIBRO, DNI_USUARIO } = req.body;

        if (FECHA_PRESTAMO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese la FECHAS DE PRESTAMO." });
        }

        if ( CANT_LIBRO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese la CANTIDA DE LIBROS." });
        }

        if (DNI_USUARIO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el DNI." });
        }

    
        const LoanHeader = { FECHA_PRESTAMO, CANT_LIBRO, DNI_USUARIO };
        const connection = await getConnection();

                await connection.query(`CALL spAddHeader('${LoanHeader.FECHA_PRESTAMO}','${LoanHeader.CANT_LIBRO}','${LoanHeader.DNI_USUARIO}';`);

        
        res.json({ message: "LoanHeader Added" });
    } catch (error) {

        switch (error.errno) {
            case 2000:
                
            return res.status().json({ message:  "El Header ya ha sido publicado"});
        
            default:

            return res.status(500).send(error.message); 
        }
    }
};

//* funcion de peticion DELETE
const deleteLoanHeader = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("CALL `spDeleteHeaderLoan`(?)", id);
        
    } catch (error) {
        
        switch (result.affectedRows) {
            case 0:
                
            return res.status(400).json({ message: "Prestamo no ELIMINADO"});
        
            case 1:

            return res.status(202).json({ message: "Prestamo ELIMINADO"});

            default:
            
            return res.status(500).send(error.message);
        }

    }
};
//* funcion de peticion PUT
const updateLoanHeader = async (req, res) => {
    try {
        const { id } = req.params;
        const { FECHA_PRESTAMO, CANT_LIBRO, DNI_USUARIO } = req.body;
        const LoanHeader = { FECHA_PRESTAMO, CANT_LIBRO, DNI_USUARIO }

        if (FECHA_PRESTAMO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese la FECHAS DE PRESTAMO." });
        }

        if ( CANT_LIBRO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese la CANTIDA DE LIBROS." });
        }

        if (DNI_USUARIO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el DNI." });
        }


        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdateHeaderLoan('${id}','${LoanHeader.FECHA_PRESTAMO}','${LoanHeader.CANT_LIBRO}','${LoanHeader.DNI_USUARIO}');`);

        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getLoanHeaders,
    getLoanHeader,
    addLoanHeader,
    deleteLoanHeader,
    updateLoanHeader
};