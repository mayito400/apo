
import { getConnection } from "../db/database"
// interacciones con la base de datos

//* funcion de peticion GET
const getLoanHeaders = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query(`CALL spGetAllHeaderLoan()`); // GET = SELECT
        

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getLoanHeader = async (req, res) => { // Get for ID
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spGetHeaderLoan(?)`,id); // GET = SELECT

        //Valida el campo devuelto si esta vacio.
        if (result[0][0] === undefined) { 
            return res.status(404).json({ message: "El Prestamo No se encontró"});
        }

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//* funcion de peticion POST
const addLoanHeader = async (req, res) => { // POST
    try {
        const { FECHA_PRESTAMO, CANT_LIBRO, DNI_USUARIO } = req.body;
        const LoanHeader = { FECHA_PRESTAMO, CANT_LIBRO, DNI_USUARIO };
        
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
        await connection.query(`CALL spAddHeaderLoan('${LoanHeader.FECHA_PRESTAMO}','${LoanHeader.CANT_LIBRO}','${LoanHeader.DNI_USUARIO}');`);

        res.status(201).json({ message: "Prestamo  Realizado" });
    } catch (error) {
        //Manejo de errores sql
        switch (error.errno) {
            case 1062: //En caso de que se intente crear un recurso ya existente
                return res.status(400).json({ message:  "El Prestamo ya ha sido realizado."});

             case 1060: 
                return res.status(400).json({ message:  "El Prestamo ya ha sido realizado."});
        
            default:
                return res.status(500).send(error.message); 
        }
    }
};

//* funcion de peticion DELETE
const deleteLoanHeader = async (req, res) => {
    try {
        
        
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("CALL `spDeleteHeaderLoan`(?)", id);
        
        switch (result.affectedRows) {
            case 0:
                
            return res.status(400).json({ message: "Prestamo no ELIMINADO"});
        
            case 1:

            return res.status(202).json({ message: "Prestamo ELIMINADO"});

            default:
            
            return res.status(500).send(error.message);

        } 
    
    }catch (error) {
            res.status(500).send(error.message);
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

        switch (result.affectedRows) {
            case 0:
            return res.status(404).json({ message: "Prestamo no ENCONTRADO."});

            case 1: 
            return res.status(202).json({ message: "Prestamo ACTUALIZADO."});

            default:
            return res.status(400).send(error.message);
        }
        
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const methods = {
    getLoanHeaders,
    getLoanHeader,
    addLoanHeader,
    deleteLoanHeader,
    updateLoanHeader
};