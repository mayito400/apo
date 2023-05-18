import { getConnection } from "../db/database"
// interacciones con la base de datos

// GET
const getDetailLoans = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query('CALL `spGetAllDetailLoans`()'); // GET = SELECT
        console.log(result);

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const getDetailLoan = async (req, res) => { // Get for ID
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spGetDetailLoan`(?)', id); // GET = SELECT

        //Valida el campo devuelto si esta vacio
        if(result[0][0] === undefined){

            return res.status(404).json({message : "Detalle de prestamo no encontrado."})
        }

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//* POST
const addDetailLoan = async (req, res) => {
    try {

        const { DESCRIPCION, COD_LIBRO, COD_ENC_PRESTAMO, COD_MULTA } = req.body;
        const detail = { DESCRIPCION, COD_LIBRO,  COD_ENC_PRESTAMO, COD_MULTA };

        //Valida si los campos estan vacios o no 
        if ( DESCRIPCION === undefined) {
           return res.status(400).json({ message: "Por favor ingrese la descripcion." });
        };

        if ( COD_LIBRO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el codigo del libro." });
         };

         if (COD_ENC_PRESTAMO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el codigo del encabezado de prestamo." });
         };

         if (COD_MULTA === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el codigo de multa." });
         };

        const connection = await getConnection();

        await connection.query(`CALL spAddDetailLoan('${detail.DESCRIPCION}','${detail.COD_LIBRO}','${detail.COD_ENC_PRESTAMO}','${detail.COD_MULTA}');`);

        
        res.json({ message: "Detalle de prestamo agregado" });
    } catch (error) {

        //Manejo de errores sql
        switch (error.errno) {

            //En caso que ya  exista
            case 1062:
                return res.status(404).json({message: "Detalle ya agregado"});

            case 1060:
                return res.status(404).json({message: "Detalle ya agregado"});
                
            default:
                return res.status(500).send(error);
        }
    }
};

//* DELETE
const deleteDetailLoan = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spDeleteDetailLoan`(?)', id);

        /* Valida si ha sido elimiando */
        switch (result.affectedRows) {
            case 0:
                return res.status(404).json({message: "Detalle ya  eliminado"});
                
            case 1:    
                return res.status(202).json({message: "Eliminado correctamente"});

            default:
            return res.status(500).json({message: "Error inteta de nuevo mas tarde"});
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
};

//* PUT
const updateDetailLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const {  DESCRIPCION,COD_LIBRO, COD_ENC_PRESTAMO, COD_MULTA } = req.body;
        const detail = {  DESCRIPCION,COD_LIBRO,  COD_ENC_PRESTAMO, COD_MULTA };

        //Valida si los campos estan vacios o no 
        if ( DESCRIPCION === undefined) {
            return res.status(400).json({ message: "Por favor ingrese la descripcion." });
         };
 
         if ( COD_LIBRO === undefined) {
             return res.status(400).json({ message: "Por favor ingrese el codigo del libro." });
          };
 
          if (COD_ENC_PRESTAMO === undefined) {
             return res.status(400).json({ message: "Por favor ingrese el codigo del encabezado de prestamo." });
          };
 
          if (COD_MULTA === undefined) {
             return res.status(400).json({ message: "Por favor ingrese el codigo de multa." });
          };
 

        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdateDetailLoan('${id}','${detail.DESCRIPCION}','${detail.COD_LIBRO}','${detail.COD_ENC_PRESTAMO}','${detail.COD_MULTA}');`);
 
         //Valida si ya a sido actualizado
         switch (result.affectedRows) {
            case 0:
                return res.status(404).json({message: "Sin ningun registro"});
                
            case 1:    
                return res.status(202).json({message: "Actulizado"});

            default:
                return res.status(400).json({message: "Error , intenta de nuevo mas tarde"});
         }
        
    } catch (error) {
        
        //Manejo de errores sql
        switch (error.errno) {

            //En caso que ya  exista
            case 1062:
                return res.status(404).json({message: "Detalle ya agregado"});
                
            default:
                return res.status(500).send(error.message);
        }

    }
};

export const methods = {
    getDetailLoans,
    getDetailLoan,
    addDetailLoan,
    deleteDetailLoan,
    updateDetailLoan
};